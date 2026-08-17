'use client';

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import styles from "./IntakeForm.module.css";
import { SERVICES } from "@/lib/pricing";

export default function IntakeForm({ onSubmitted }) {
    const { data: session } = useSession();

    const [form, setForm] = useState({
        firstName: session?.user?.name?.split(" ")[0] || "",
        lastName: session?.user?.name?.split(" ").slice(1).join(" ") || "",
        preferredName: "",
        age: "",
        gender: "",
        genderOther: "",
        email: session?.user?.email || "",
        phone: "",
        occupation: "",
        cityCountry: "",
        emergencyContact: "",
        emergencyContactRelationship: "",
        emergencyContactPhone: "",
        service: "",
        mode: "",
        reason: "",
        agreed: false,
    });

    const [status, setStatus] = useState(null);

    // Turnstile verification token
    const [turnstileToken, setTurnstileToken] = useState("");

    // Render Cloudflare Turnstile
    useEffect(() => {
    let widgetId = null;

    const renderWidget = () => {
        const container = document.getElementById("turnstile-widget");
        if (!window.turnstile || !container || container.hasChildNodes()) return;

        widgetId = window.turnstile.render("#turnstile-widget", {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
            callback: (token) => setTurnstileToken(token),
        });
    };

    if (window.turnstile) {
        renderWidget();
    } else {
        const interval = setInterval(() => {
            if (window.turnstile) {
                clearInterval(interval);
                renderWidget();
            }
        }, 200);
        return () => clearInterval(interval);
    }

    return () => {
        if (widgetId && window.turnstile) {
            window.turnstile.remove(widgetId);
        }
    };
}, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check Turnstile first
        if (!turnstileToken) {
            alert("Please complete the verification check.");
            return;
        }

        if (!form.service) {
            alert("Please select a session type.");
            return;
        }

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
                    preferredName: form.preferredName,
                    email: form.email,
                    phone: form.phone,
                    age: form.age ? parseInt(form.age, 10) : undefined,
                    gender: form.gender,
                    genderOther: form.genderOther,
                    occupation: form.occupation,
                    cityCountry: form.cityCountry,
                    emergencyContact: form.emergencyContact,
                    emergencyContactRelationship: form.emergencyContactRelationship,
                    emergencyContactPhone: form.emergencyContactPhone,
                    mode: form.mode,
                    reasonForVisit: form.reason,

                    // Send Turnstile token to backend
                    turnstileToken,
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
                onSubmitted({
                    name: fullName,
                    email: form.email,
                    phone: form.phone,
                    service: form.service,
                });
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

                <h3>Personal Information</h3>

                <div className={styles.row}>
                    <input
                        name="firstName"
                        placeholder="Full Name"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="lastName"
                        placeholder="Last Name"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.row}>
                    <input
                        name="preferredName"
                        placeholder="Preferred Name (optional)"
                        value={form.preferredName}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        min="1"
                        max="120"
                        value={form.age}
                        onChange={handleChange}
                    />
                </div>

                <div style={{ margin: "10px 0" }}>
                    <p
                        style={{
                            fontSize: "14px",
                            color: "#463280",
                            fontWeight: 600,
                            marginBottom: "8px",
                        }}
                    >
                        Gender
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "18px",
                            flexWrap: "wrap",
                            fontSize: "14px",
                        }}
                    >
                        {["Female", "Male", "Non-binary", "Prefer not to say", "Other"].map((g) => (
                            <label
                                key={g}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                }}
                            >
                                <input
                                    type="radio"
                                    name="gender"
                                    value={g}
                                    checked={form.gender === g}
                                    onChange={handleChange}
                                />
                                {g}
                            </label>
                        ))}
                    </div>

                    {form.gender === "Other" && (
                        <input
                            name="genderOther"
                            placeholder="Self-describe (optional)"
                            value={form.genderOther}
                            onChange={handleChange}
                            style={{
                                marginTop: "10px",
                                width: "100%",
                                padding: "12px",
                                border: "1px solid #bda6d8",
                                borderRadius: "10px",
                                background: "#f4edff",
                            }}
                        />
                    )}
                </div>

                <div className={styles.row}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="phone"
                        placeholder="Phone Number (+91XXXXXXXXXX)"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.row}>
                    <input
                        name="occupation"
                        placeholder="Occupation (optional)"
                        value={form.occupation}
                        onChange={handleChange}
                    />

                    <input
                        name="cityCountry"
                        placeholder="City / Country"
                        value={form.cityCountry}
                        onChange={handleChange}
                    />
                </div>

                <h3>Emergency Contact</h3>

                <div className={styles.row}>
                    <input
                        name="emergencyContact"
                        placeholder="Full Name"
                        value={form.emergencyContact}
                        onChange={handleChange}
                    />

                    <input
                        name="emergencyContactRelationship"
                        placeholder="Relationship (e.g. Parent, Partner)"
                        value={form.emergencyContactRelationship}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.row}>
                    <input
                        name="emergencyContactPhone"
                        placeholder="Emergency Contact Phone"
                        value={form.emergencyContactPhone}
                        onChange={handleChange}
                    />
                </div>

                <h3>Session Type</h3>

                <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "10px",
                        border: "1px solid #bda6d8",
                        background: "#f4edff",
                        fontSize: "15px",
                    }}
                >
                    <option value="">Select a session type</option>

                    {SERVICES.map((s) => (
                        <option key={s.value} value={s.value}>
                            {s.label} — ₹{s.price}
                        </option>
                    ))}
                </select>

                <p
                    style={{
                        fontSize: "12px",
                        color: "#7a6094",
                        marginTop: "6px",
                    }}
                >
                    Are you a student looking for discounted pricing? Please contact us directly on WhatsApp.
                </p>

                <h3>Session Mode</h3>

                <div
                    style={{
                        display: "flex",
                        gap: "18px",
                        fontSize: "14px",
                        marginBottom: "6px",
                    }}
                >
                    <label
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                        }}
                    >
                        <input
                            type="radio"
                            name="mode"
                            value="Online"
                            checked={form.mode === "Online"}
                            onChange={handleChange}
                        />
                        Online
                    </label>

                    <label
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                        }}
                    >
                        <input
                            type="radio"
                            name="mode"
                            value="Offline"
                            checked={form.mode === "Offline"}
                            onChange={handleChange}
                        />
                        In-Person
                    </label>
                </div>

                {form.mode === "Online" && (
                    <p
                        style={{
                            fontSize: "12px",
                            color: "#7a6094",
                            marginBottom: "10px",
                        }}
                    >
                        You'll receive your online meeting link via WhatsApp or a call to your provided number before the session.
                    </p>
                )}

                {form.mode === "Offline" && (
                    <p
                        style={{
                            fontSize: "12px",
                            color: "#7a6094",
                            marginBottom: "10px",
                        }}
                    >
                        For in-person sessions, please contact us on WhatsApp to confirm location details.
                    </p>
                )}

                <h3>Please specify your concerns in brief</h3>

                <textarea
                    className={styles.textarea}
                    name="reason"
                    placeholder="e.g., Struggling with anxiety, feeling overwhelmed at work, or going through a life transition..."
                    value={form.reason}
                    onChange={handleChange}
                    required
                />

                <h3>Consent &amp; Confidentiality Agreement</h3>

                <div className={styles.bigBox}>
                    <p
                        style={{
                            margin: 0,
                            fontSize: "14px",
                            lineHeight: "1.6",
                            color: "#4b216b",
                        }}
                    >
                        I understand that all sessions are confidential and protected under
                        applicable privacy laws, with limited exceptions where disclosure is
                        legally required (such as risk of harm to myself or others). I consent
                        to Wander Within collecting and storing my personal and health
                        information for the purpose of providing therapy services. I understand
                        I may withdraw consent at any time by contacting my therapist directly.
                    </p>
                </div>

                <div className={styles.bottom}>
                    <label
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            fontSize: "14px",
                            color: "#4b216b",
                        }}
                    >
                        <input
                            type="checkbox"
                            name="agreed"
                            checked={form.agreed}
                            onChange={handleChange}
                            style={{
                                width: "18px",
                                height: "18px",
                            }}
                        />

                        I have read and agree to the above.
                    </label>

                    {/* Cloudflare Turnstile */}
                    <div
                        id="turnstile-widget"
                        style={{ marginBottom: "10px" }}
                    ></div>

                    <button
                        type="submit"
                        disabled={status === "sending"}
                    >
                        {status === "sending"
                            ? "Submitting..."
                            : "Submit & Continue"}
                    </button>
                </div>

                {status === "sent" && (
                    <p
                        style={{
                            color: "green",
                            marginTop: "12px",
                        }}
                    >
                        Submitted! Now pick a time in the calendar.
                    </p>
                )}

                {status === "error" && (
                    <p
                        style={{
                            color: "red",
                            marginTop: "12px",
                        }}
                    >
                        Something went wrong. Please try again.
                    </p>
                )}

            </form>
        </div>
    );
}