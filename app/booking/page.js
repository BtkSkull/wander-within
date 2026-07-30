'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import IntakeForm from "@/components/booking/IntakeForm";
import AppointmentBooking from "@/components/booking/AppointmentBooking";
import PaymentGateway from "@/components/booking/PaymentGateway";
import { getPriceForService } from "@/lib/pricing";

export default function BookingPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [customer, setCustomer] = useState(null);
    const [bookingId, setBookingId] = useState(null);
    const [bookingInfo, setBookingInfo] = useState(null);
    const [confirmed, setConfirmed] = useState(false);
    const [paid, setPaid] = useState(false);
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    const handleIntakeSubmitted = async (customerData) => {
        try {
            const res = await fetch("/api/booking/create-pending", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(customerData),
            });
            const data = await res.json();

            if (data.success) {
                setCustomer(customerData);
                setBookingId(data.bookingId);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        }
    };

    const pollForConfirmation = () => {
        setChecking(true);
        let attempts = 0;
        const maxAttempts = 15;

        const interval = setInterval(async () => {
            attempts++;
            try {
                const res = await fetch(`/api/booking/lookup?id=${bookingId}`);
                const data = await res.json();

                if (data.found) {
                    clearInterval(interval);
                    setChecking(false);
                    setBookingInfo(data.booking);
                    setConfirmed(true);
                }
            } catch (error) {
                console.error(error);
            }

            if (attempts >= maxAttempts) {
                clearInterval(interval);
                setChecking(false);
            }
        }, 2000);
    };

    const handlePaymentSuccess = () => {
        setPaid(true);
    };

    if (status === "loading") {
        return <main style={{ minHeight: "100vh", background: "#eee4ff" }} />;
    }

    if (status === "unauthenticated") {
        return null;
    }

    return (
        <main style={{ minHeight: "100vh", background: "#eee4ff", padding: "clamp(20px, 5vw, 40px) clamp(12px, 4vw, 20px)" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto", width: "100%" }}>

                {!customer && (
                    <IntakeForm onSubmitted={handleIntakeSubmitted} />
                )}

                {customer && !confirmed && customer.service === "Group Programs & Mental Health Workshops" && (
                    <div style={{ background: "white", borderRadius: "16px", padding: "40px", textAlign: "center" }}>
                        <h2 style={{ color: "#463280", marginBottom: "12px" }}>Group Sessions Booked Manually</h2>
                        <p style={{ color: "#5f4370", marginBottom: "24px" }}>
                            Our group programs run on a weekly schedule and are currently booked directly with our team.
                            Please contact us on WhatsApp to check availability and reserve your spot.
                        </p>
                        
                        <a
                            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "inline-block", background: "#463280", color: "white",
                                padding: "14px 32px", borderRadius: "30px", textDecoration: "none", fontWeight: 600,
                            }}
                        >
                            Contact Us on WhatsApp
                        </a>
                        <div style={{ marginTop: "20px" }}>
                            <button
                                onClick={() => setCustomer(null)}
                                style={{ background: "none", border: "none", color: "#999", textDecoration: "underline", cursor: "pointer" }}
                            >
                                ← Choose a different session type
                            </button>
                        </div>
                    </div>
                )}

                {customer && !confirmed && customer.service !== "Group Programs & Mental Health Workshops" && (
                    <div>
                        <div style={{
                            background: "#f8f6fc", borderRadius: "16px", padding: "16px 24px",
                            marginBottom: "24px", textAlign: "center",
                        }}>
                            <h2 style={{ color: "#463280", margin: 0 }}>Pick a time that works for you</h2>
                            <p style={{ color: "#5f4370", margin: "6px 0 0" }}>
                                Choose an available slot below. Payment happens right after.
                            </p>
                        </div>

                        <AppointmentBooking
                            prefillEmail={customer.email}
                            prefillName={customer.name}
                            onBooked={pollForConfirmation}
                        />
                    </div>
                )}

                {confirmed && !paid && (
                    <div>
                        <div style={{
                            background: "#f8f6fc", borderRadius: "16px", padding: "16px 24px",
                            marginBottom: "24px", textAlign: "center",
                        }}>
                            <h2 style={{ color: "#463280", margin: 0 }}>Time slot reserved!</h2>
                            <p style={{ color: "#5f4370", margin: "6px 0 0" }}>
                                {bookingInfo?.service} on{" "}
                                {bookingInfo?.date && new Date(bookingInfo.date).toLocaleString()}
                                <br />
                                Complete payment below to confirm your session.
                            </p>
                        </div>

                        <PaymentGateway
                            bookingId={bookingId}
                            amount={getPriceForService(customer.service)}
                            customerName={customer.name}
                            customerEmail={customer.email}
                            customerPhone={customer.phone}
                            onSuccess={handlePaymentSuccess}
                        />
                    </div>
                )}

                {paid && (
                    <div style={{
                        background: "white", borderRadius: "16px", padding: "40px", textAlign: "center",
                    }}>
                        <h2 style={{ color: "#463280" }}>You're all set!</h2>
                        <p style={{ color: "#5f4370" }}>
                            Your session is booked and payment confirmed. We look forward to seeing you.
                        </p>
                    </div>
                )}

                {checking && (
                    <div style={{
                        position: "fixed",
                        bottom: "24px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "white",
                        borderRadius: "30px",
                        padding: "14px 28px",
                        boxShadow: "0 8px 24px rgba(107,45,139,0.25)",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        zIndex: 1000,
                    }}>
                        <div style={{
                            width: "18px",
                            height: "18px",
                            border: "3px solid #e4dcf3",
                            borderTopColor: "#463280",
                            borderRadius: "50%",
                            animation: "spin 0.8s linear infinite",
                        }} />
                        <span style={{ color: "#463280", fontWeight: 500 }}>
                            Confirming your booking, just a few seconds...
                        </span>
                    </div>
                )}

                <style>{`
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}</style>

            </div>
        </main>
    );
}