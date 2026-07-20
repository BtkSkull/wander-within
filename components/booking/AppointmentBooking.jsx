'use client';

import { InlineWidget, useCalendlyEventListener } from 'react-calendly';
import styles from "./AppointmentBooking.module.css";

export default function AppointmentBooking({ prefillEmail, prefillName, onBooked }) {
    useCalendlyEventListener({
        onEventScheduled: () => {
            if (onBooked) onBooked();
        },
    });

    return (
        <div className={styles.card}>
            <h2>Online Appointment Booking</h2>
            <div className={styles.calendlyBox}>
                <InlineWidget
                    url="https://calendly.com/bloxfruiz000"
                    styles={{ height: '600px', width: '100%' }}
                    prefill={{ name: prefillName, email: prefillEmail }}
                    pageSettings={{
                        backgroundColor: 'f8f6fc',
                        primaryColor: '6b2d8b',
                        textColor: '35105c',
                    }}
                />
            </div>
        </div>
    )
}