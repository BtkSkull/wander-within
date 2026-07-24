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
        const reason = prompt("Please let us know why you'd like to cancel (optional):");
        if (reason === null) return;

        setCancellingId(bookingId);
        try {
            const res = await fetch("/api/booking/cancel", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookingId, reason }),
            });
            const data = await res.json();

            if (data.success) {
                setBookings((prev) =>
                    prev.map((b) => (b.id === bookingId ? { ...b, status: "CANCELLATION_REQUESTED" } : b))
                );
                alert(
                    data.eligibleForRefund
                        ? "Your cancellation request has been submitted. Once reviewed and approved, your refund will be processed within a few business days. If you have any questions, feel free to reach out on WhatsApp."
                        : "Your cancellation request has been submitted for review. Since this session is within 24 hours, refunds aren't guaranteed, but our team will review it personally. If you have any questions, feel free to reach out on WhatsApp."
                );
            } else {
                alert(data.error || "Failed to submit cancellation request.");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to submit cancellation request.");
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
                <h1 style={{ color: "#6B2D8B", textAlign: "center", marginBottom: "10px" }}>
    My Sessions
</h1>

<a
    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        background: "white",
        borderRadius: "12px",
        padding: "12px 20px",
        marginBottom: "24px",
        color: "#25D366",
        fontWeight: 600,
        textDecoration: "none",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    }}
>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.35 5.07L2 22l5.06-1.33C8.51 21.5 10.2 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.6 0-3.1-.44-4.4-1.2l-.31-.19-3.02.79.8-2.94-.2-.32A7.94 7.94 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.4-5.6c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.44-1.34-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.4-.54-.4-.14 0-.3-.02-.46-.02s-.42.06-.64.3c-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28z"/>
                    </svg>
                    Contact us on WhatsApp for any queries or refund related issues
                </a>

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
                                Status: {booking.status.replace(/_/g, " ")} · Payment: {booking.payment?.status || "N/A"}
                            </p>
                            {booking.status === "CONFIRMED" && (
                                <button
                                    onClick={() => handleCancel(booking.id)}
                                    disabled={cancellingId === booking.id}
                                    style={{
                                        background: "transparent", border: "1px solid #d33",
                                        color: "#d33", padding: "8px 18px", borderRadius: "20px", cursor: "pointer",
                                    }}
                                >
                                    {cancellingId === booking.id ? "Submitting..." : "Request Cancellation"}
                                </button>
                            )}
                            {booking.status === "CANCELLATION_REQUESTED" && (
                                <p style={{ fontSize: "13px", color: "#e6a817", margin: 0 }}>
                                    Your cancellation is under review. We'll notify you once it's processed.
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}