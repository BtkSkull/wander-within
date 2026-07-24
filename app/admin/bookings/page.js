'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

const statusColors = {
    PENDING: "#999",
    CONFIRMED: "#2a7",
    CANCELLATION_REQUESTED: "#e6a817",
    REFUND_APPROVED: "#2a7",
    REFUND_REJECTED: "#d33",
    REFUNDED: "#6B2D8B",
    COMPLETED: "#2a7",
    NO_SHOW: "#d33",
    CANCELLED: "#999",
};

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("ALL");

    const loadBookings = () => {
        setLoading(true);
        fetch("/api/booking")
            .then((res) => res.json())
            .then((data) => {
                setBookings(data);
                setLoading(false);
            });
    };

    useEffect(() => {
        loadBookings();
    }, []);

    const markManualRefund = async (bookingId) => {
        if (!confirm("Confirm you have already paid the client manually (bank transfer, UPI, cash, etc.) outside this system. This will mark the session as refunded and cancel it. Continue?")) return;
        try {
            const res = await fetch("/api/admin/booking/mark-manual-refund", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookingId }),
            });
            const data = await res.json();
            if (!res.ok) {
                alert(data.error || "Something went wrong.");
                return;
            }
            loadBookings();
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        }
    };

    const rejectRefund = async (bookingId) => {
        const reason = prompt("Reason for rejecting this refund request:");
        if (reason === null) return;
        try {
            const res = await fetch("/api/admin/booking/reject-refund", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookingId, reason }),
            });
            const data = await res.json();
            if (!res.ok) {
                alert(data.error || "Something went wrong.");
                return;
            }
            loadBookings();
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        }
    };

    const updateStatus = async (bookingId, status) => {
        try {
            const res = await fetch("/api/admin/booking/update-status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookingId, status }),
            });
            const data = await res.json();
            if (!res.ok) {
                alert(data.error || "Something went wrong.");
                return;
            }
            loadBookings();
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        }
    };

    const filtered = filter === "ALL" ? bookings : bookings.filter((b) => b.status === filter);

    const filterOptions = [
        { value: "ALL", label: "All" },
        { value: "CANCELLATION_REQUESTED", label: "Needs Review" },
        { value: "CONFIRMED", label: "Confirmed" },
        { value: "REFUNDED", label: "Refunded" },
        { value: "COMPLETED", label: "Completed" },
    ];

    return (
        <main style={{ minHeight: "100vh", background: "#eee4ff", padding: "40px 20px" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                    <h1 style={{ color: "#6B2D8B", margin: 0 }}>Bookings</h1>
                    <Link href="/admin" style={{ color: "#6B2D8B", textDecoration: "underline" }}>← Back to Dashboard</Link>
                </div>

                <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
                    {filterOptions.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => setFilter(opt.value)}
                            style={{
                                padding: "8px 16px", borderRadius: "20px", cursor: "pointer",
                                border: filter === opt.value ? "none" : "1px solid #bda6d8",
                                background: filter === opt.value ? "#6B2D8B" : "white",
                                color: filter === opt.value ? "white" : "#6B2D8B",
                                fontWeight: 500, fontSize: "14px",
                            }}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <p style={{ color: "#5f4370" }}>Loading...</p>
                ) : filtered.length === 0 ? (
                    <div style={{ background: "white", borderRadius: "16px", padding: "40px", textAlign: "center", color: "#999" }}>
                        No bookings in this view.
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {filtered.map((b) => (
                            <div key={b.id} style={{ background: "white", borderRadius: "16px", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                                <div style={{ flex: 1, minWidth: "220px" }}>
                                    <p style={{ margin: 0, fontWeight: 600, color: "#35105C" }}>{b.name}</p>
                                    <p style={{ margin: "2px 0", fontSize: "13px", color: "#999" }}>{b.email}</p>
                                    <p style={{ margin: "2px 0", fontSize: "13px", color: "#5f4370" }}>
                                        {b.service} · {new Date(b.date).toLocaleString()}
                                    </p>
                                    {b.cancellationReason && (
                                        <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#e6a817" }}>
                                            Reason: {b.cancellationReason}
                                        </p>
                                    )}
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                        <span style={{
                                            fontSize: "12px", fontWeight: 600, padding: "4px 10px", borderRadius: "12px",
                                            background: `${statusColors[b.status] || "#999"}22`,
                                            color: statusColors[b.status] || "#999",
                                        }}>
                                            {b.status.replace(/_/g, " ")}
                                        </span>
                                        <span style={{ fontSize: "12px", color: "#999" }}>
                                            {b.payment?.status || "No payment"}
                                        </span>
                                    </div>

                                    <div style={{ display: "flex", gap: "8px" }}>
                                        {b.status === "CANCELLATION_REQUESTED" && (
                                            <>
                                                <button onClick={() => markManualRefund(b.id)} style={btnStyle("#6B2D8B")}>
                                                    Mark as Refunded
                                                </button>
                                                <button onClick={() => rejectRefund(b.id)} style={btnStyle("#d33")}>
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        {b.status === "CONFIRMED" && (
                                            <>
                                                <button onClick={() => updateStatus(b.id, "COMPLETED")} style={btnStyle("#6B2D8B")}>
                                                    Mark Completed
                                                </button>
                                                <button onClick={() => updateStatus(b.id, "NO_SHOW")} style={btnStyle("#999")}>
                                                    No-Show
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}

function btnStyle(color) {
    return {
        background: color, color: "white", border: "none",
        padding: "8px 14px", borderRadius: "20px", cursor: "pointer",
        fontSize: "13px", fontWeight: 500,
    };
}