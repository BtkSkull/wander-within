'use client';

import { useState } from "react";
import styles from "./PaymentGateway.module.css";

export default function PaymentGateway({ bookingId, amount = 500, customerName, customerEmail, customerPhone }) {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        if (!bookingId) {
            alert("Please complete your booking first, then enter the Booking ID to pay.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/payment/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookingId, amount }),
            });
            const data = await res.json();

            if (!data.success) {
                alert("Something went wrong creating the payment. Please try again.");
                setLoading(false);
                return;
            }

            const options = {
                key: data.keyId,
                amount: data.amount,
                currency: data.currency,
                order_id: data.orderId,
                name: "Wander Within",
                description: "Therapy Session Payment",
                prefill: {
                    name: customerName || "",
                    email: customerEmail || "",
                    contact: customerPhone || "",
                },
                method: {
                    upi: true,
                    card: false,
                    netbanking: false,
                    wallet: false,
                },
                theme: { color: "#6B2D8B" },
                handler: async function (response) {
                    const verifyRes = await fetch("/api/payment/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            bookingId,
                        }),
                    });
                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {
                        alert("Payment successful! Your session is confirmed.");
                    } else {
                        alert("Payment verification failed. Please contact support.");
                    }
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error(error);
            alert("Payment failed to start. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.card}>
            <h2>
                Secure Payment Gateway
            </h2>
            <div className={styles.paymentBox}>
                <h3>
                    Pay via UPI
                </h3>
                <button onClick={handlePayment} disabled={loading}>
                    {loading ? "Processing..." : `PAY ₹${amount}`}
                </button>
            </div>
        </div>
    )
}