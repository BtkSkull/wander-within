'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MySessionsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [bookings, setBookings] = useState(null);
    const [cancellingId, setCancellingId] = useState(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
        if (status === "authenticated" && session?.user?.email) {
            fetch(`/api/booking/my-sessions?email=${encodeURIComponent(session.user.email)}`)
                .then((res) => res.json())
                .then((data) => setBookings(data.bookings || []));
        }
    }, [status, session, router]);

    const handleCancel = async (bookingId) => {
        if (!confirm("Are you sure you want to cancel this session? If paid, you'll be refunded automatically.")) return;

        setCancellingId(bookingId);
        try {
            const res = await fetch("/api/booking/cancel", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookingId }),
            });
            const data = await res.json();

            if (data.success) {
                setBookings((prev) => prev.filter((b) => b.id !== bookingId));
                alert(data.refunded
                    ? "Session cancelled. Your payment has been refunded and will reflect in 5-7 business days."
                    : "Session cancelled.");
            } else {
                alert("Failed to cancel. Please try again or contact us directly.");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to cancel. Please try again or contact us directly.");
        } finally {
            setCancellingId(null);
        }
    };

    if (status === "loading" || bookings === null) {
        return <main style={{ minHeight: "100vh", background: "#eee4ff" }} />;
    }

    return (
        <main style={{ minHeight: "100vh", background: "#eee4ff", padding: "40px 20px" }}>
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
                <h1 style={{ color: "#6B2D8B", textAlign: "center", marginBottom: "24px" }}>
                    My Sessions
                </h1>

                {bookings.length === 0 && (
                    <p style={{ textAlign: "center", color: "#5f4370" }}>
                        You don't have any sessions yet.
                    </p>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {bookings.map((booking) => (
                        <div key={booking.id} style={{ background: "white", borderRadius: "16px", padding: "20px" }}>
                            <h3 style={{ color: "#6B2D8B", margin: "0 0 8px" }}>{booking.service}</h3>
                            <p style={{ margin: "0 0 4px", color: "#5f4370" }}>
                                {new Date(booking.date).toLocaleString()}
                            </p>
                            <p style={{ margin: "0 0 12px", fontSize: "14px", color: "#999" }}>
                                Status: {booking.status} · Payment: {booking.payment?.status || "N/A"}
                            </p>
                            <button
                                onClick={() => handleCancel(booking.id)}
                                disabled={cancellingId === booking.id}
                                style={{
                                    background: "transparent", border: "1px solid #d33",
                                    color: "#d33", padding: "8px 18px", borderRadius: "20px", cursor: "pointer",
                                }}
                            >
                                {cancellingId === booking.id ? "Cancelling..." : "Cancel Session"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}