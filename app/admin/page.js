'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({ total: 0, pending: 0, paid: 0 });

    useEffect(() => {
        fetch("/api/booking")
            .then((res) => res.json())
            .then((data) => {
                const pending = data.filter((b) => b.status === "CANCELLATION_REQUESTED").length;
                const paid = data.filter((b) => b.payment?.status === "PAID").length;
                setStats({ total: data.length, pending, paid });
            });
    }, []);

    const cards = [
        { label: "Total Bookings", value: stats.total, color: "#463280" },
        { label: "Pending Refund Requests", value: stats.pending, color: "#d33" },
        { label: "Paid Sessions", value: stats.paid, color: "#2a7" },
    ];

    return (
        <main style={{ minHeight: "100vh", background: "#eee4ff", padding: "clamp(20px, 5vw, 40px) clamp(12px, 4vw, 20px)" }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                <h1 style={{ color: "#463280", marginBottom: "30px", fontSize: "clamp(24px, 5vw, 32px)" }}>Admin Dashboard</h1>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "40px" }}>
                    {cards.map((c) => (
                        <div key={c.label} style={{ background: "white", borderRadius: "16px", padding: "clamp(16px, 4vw, 24px)" }}>
                            <p style={{ margin: 0, color: "#999", fontSize: "13px" }}>{c.label}</p>
                            <p style={{ margin: "8px 0 0", fontSize: "clamp(24px, 6vw, 32px)", fontWeight: 700, color: c.color }}>{c.value}</p>
                        </div>
                    ))}
                </div>

                <Link
                    href="/admin/bookings"
                    style={{
                        display: "block", background: "white", borderRadius: "16px", padding: "clamp(16px, 4vw, 24px)",
                        color: "#463280", fontWeight: 600, textDecoration: "none", maxWidth: "300px",
                        boxShadow: "0 2px 8px rgba(70,50,128,0.08)",
                    }}
                >
                    Manage Bookings & Refunds →
                </Link>
            </div>
        </main>
    )
}