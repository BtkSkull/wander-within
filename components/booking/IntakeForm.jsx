'use client';

import { useSession } from "next-auth/react";
import { useState } from "react";
import styles from "./IntakeForm.module.css";

export default function IntakeForm({ onSubmitted }) {
    const { data: session } = useSession();

    const [form, setForm] = useState({
        firstName: session?.user?.name?.split(" ")[0] || "",
        lastName: session?.user?.name?.split(" ").slice(1).join(" ") || "",
        email: session?.user?.email || "",
        phone: "",
        reason: "",
        agreed: false,
    });
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.agreed) {
            alert("Please agree to the Consent & Confidentiality Agreement to continue.");
            return;
        }

        setStatus("sending");
        try {
            const fullName = `${form.firstName} ${form.lastName}`.trim();

            await fetch("/api/intake-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName,
                    email: form.email,
                    phone: form.phone,
                    reasonForVisit: form.reason,
                }),
            });

            await fetch("/api/consent-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clientName: fullName,
                    email: form.email,
                    agreed: form.agreed,
                }),
            });

            setStatus("sent");
            if (onSubmitted) {
                onSubmitted({ name: fullName, email: form.email, phone: form.phone });
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <div className={styles.card}>
            <h2>Client Intake Form</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h3>Personal Details</h3>
                <div className={styles.row}>
                    <input name="firstName" placeholder="Name" value={form.firstName} onChange={handleChange} required />
                    <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
                </div>
                <div className={styles.row}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        readOnly={!!session?.user?.email}
                        required
                    />
                    <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
                </div>

                <h3>Reason for Consultation</h3>
                <textarea
                    className={styles.textarea}
                    name="reason"
                    placeholder="Write your concern"
                    value={form.reason}
                    onChange={handleChange}
                    required
                />

                <h3>Consent &amp; Confidentiality Agreement</h3>
                <div className={styles.bigBox}>
                    <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.6", color: "#4b216b" }}>
                        I understand that all sessions are confidential and protected under
                        applicable privacy laws, with limited exceptions where disclosure is
                        legally required (such as risk of harm to myself or others). I consent
                        to Wander Within collecting and storing my personal and health
                        information for the purpose of providing therapy services. I understand
                        I may withdraw consent at any time by contacting my therapist directly.
                    </p>
                </div>

                <div className={styles.bottom}>
                    <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#4b216b" }}>
                        <input
                            type="checkbox"
                            name="agreed"
                            checked={form.agreed}
                            onChange={handleChange}
                            style={{ width: "18px", height: "18px" }}
                        />
                        I have read and agree to the above.
                    </label>

                    <button type="submit" disabled={status === "sending"}>
                        {status === "sending" ? "Submitting..." : "Submit & Continue"}
                    </button>
                </div>

                {status === "sent" && <p style={{ color: "green", marginTop: "12px" }}>Submitted! Now pick a time in the calendar.</p>}
                {status === "error" && <p style={{ color: "red", marginTop: "12px" }}>Something went wrong. Please try again.</p>}
            </form>
        </div>
    )
}