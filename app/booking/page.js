'use client';

import { useState } from "react";
import IntakeForm from "@/components/booking/IntakeForm";
import AppointmentBooking from "@/components/booking/AppointmentBooking";
import PaymentGateway from "@/components/booking/PaymentGateway";

export default function BookingPage() {
    const [customer, setCustomer] = useState(null);
    const [bookingId, setBookingId] = useState(null);
    const [bookingInfo, setBookingInfo] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [checking, setChecking] = useState(false);
    const [cashChosen, setCashChosen] = useState(false);

    const pollForBooking = async (email) => {
        setChecking(true);
        const since = Date.now();
        let attempts = 0;
        const maxAttempts = 15;

        const interval = setInterval(async () => {
            attempts++;
            try {
                const res = await fetch(`/api/booking/lookup?email=${encodeURIComponent(email)}&since=${since}`);
                const data = await res.json();

                if (data.found) {
                    clearInterval(interval);
                    setChecking(false);
                    setBookingId(data.booking.id);
                    setBookingInfo(data.booking);
                    setShowModal(true);
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

    const handleBooked = () => {
        if (customer?.email) pollForBooking(customer.email);
    };

    const handlePayLater = async () => {
        await fetch("/api/booking/mark-cash", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookingId }),
        });
        setCashChosen(true);
    };

    return (
        <main className="bookingPage">
            <div className="leftSide">
                <IntakeForm onSubmitted={setCustomer} />
            </div>
            <div className="rightSide">
                <AppointmentBooking
                    prefillEmail={customer?.email}
                    prefillName={customer?.name}
                    onBooked={handleBooked}
                />
                {checking && (
                    <p style={{ textAlign: "center", color: "#6B2D8B" }}>Confirming your booking...</p>
                )}
            </div>

            {showModal && (
                <div style={{
                    position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
                    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
                }}>
                    <div style={{ background: "white", borderRadius: "16px", padding: "30px", maxWidth: "420px", width: "90%" }}>
                        {!cashChosen ? (
                            <>
                                <h2 style={{ color: "#6B2D8B" }}>Your session is booked!</h2>
                                <p>
                                    {bookingInfo?.service} on{" "}
                                    {bookingInfo?.date && new Date(bookingInfo.date).toLocaleString()}
                                </p>
                                <p>Would you like to pay now, or pay later in cash?</p>

                                <div style={{ marginTop: "20px" }}>
                                    <PaymentGateway
                                        bookingId={bookingId}
                                        amount={500}
                                        customerName={customer?.name}
                                        customerEmail={customer?.email}
                                        customerPhone={customer?.phone}
                                    />
                                </div>

                                <button
                                    onClick={handlePayLater}
                                    style={{
                                        marginTop: "12px", background: "transparent", border: "1px solid #6B2D8B",
                                        color: "#6B2D8B", padding: "10px 20px", borderRadius: "30px", width: "100%",
                                    }}
                                >
                                    Pay Later (Cash)
                                </button>
                            </>
                        ) : (
                            <>
                                <h2 style={{ color: "#6B2D8B" }}>All set!</h2>
                                <p>You've chosen to pay in person. We look forward to seeing you.</p>
                            </>
                        )}

                        <button
                            onClick={() => setShowModal(false)}
                            style={{ marginTop: "12px", background: "none", border: "none", color: "#999", width: "100%" }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </main>
    )
}