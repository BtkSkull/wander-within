'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminClientsPage() {
    const [intakes, setIntakes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(null);

    useEffect(() => {
        fetch("/api/admin/clients")
            .then((res) => res.json())
            .then((data) => {
                setIntakes(data);
                setLoading(false);
            });
    }, []);

    return (
        <main style={{ minHeight: "100vh", background: "#eee4ff", padding: "clamp(20px, 5vw, 40px) clamp(12px, 4vw, 20px)" }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "10px" }}>
                    <h1 style={{ color: "#463280", margin: 0, fontSize: "clamp(22px, 5vw, 30px)" }}>Client Intake Records</h1>
                    <Link href="/admin" style={{ color: "#463280", textDecoration: "underline", fontSize: "14px" }}>← Back to Dashboard</Link>
                </div>

                {loading ? (
                    <p style={{ color: "#5f4370" }}>Loading...</p>
                ) : intakes.length === 0 ? (
                    <div style={{ background: "white", borderRadius: "16px", padding: "40px", textAlign: "center", color: "#999" }}>
                        No intake forms submitted yet.
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {intakes.map((intake) => (
                            <div key={intake.id} style={{ background: "white", borderRadius: "16px", padding: "20px" }}>
                                <div
                                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                                    onClick={() => setExpanded(expanded === intake.id ? null : intake.id)}
                                >
                                    <div>
                                        <p style={{ margin: 0, fontWeight: 600, color: "#463280" }}>{intake.fullName}</p>
                                        <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#999" }}>{intake.email} · {intake.phone}</p>
                                    </div>
                                    <span style={{ color: "#463280", fontSize: "13px" }}>
                                        {expanded === intake.id ? "Hide details ▲" : "View details ▼"}
                                    </span>
                                </div>

                                {expanded === intake.id && (
                                    <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #eee", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", fontSize: "13px" }}>
                                        <Field label="Preferred Name" value={intake.preferredName} />
                                        <Field label="Date of Birth" value={intake.dateOfBirth ? new Date(intake.dateOfBirth).toLocaleDateString() : null} />
                                        <Field label="Gender" value={intake.gender === "Other" ? intake.genderOther : intake.gender} />
                                        <Field label="Occupation" value={intake.occupation} />
                                        <Field label="City / Country" value={intake.cityCountry} />
                                        <Field label="Session Mode" value={intake.mode} />
                                        <Field label="Emergency Contact" value={intake.emergencyContact} />
                                        <Field label="Relationship" value={intake.emergencyContactRelationship} />
                                        <Field label="Emergency Phone" value={intake.emergencyContactPhone} />
                                        <div style={{ gridColumn: "1 / -1" }}>
                                            <Field label="Reason for Consultation" value={intake.reasonForVisit} />
                                        </div>
                                        <Field label="Submitted" value={new Date(intake.submittedAt).toLocaleString()} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}

function Field({ label, value }) {
    if (!value) return null;
    return (
        <div>
            <p style={{ margin: 0, color: "#999", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</p>
            <p style={{ margin: "2px 0 0", color: "#4b216b" }}>{value}</p>
        </div>
    );
}