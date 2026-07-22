'use client';

import { signIn } from "next-auth/react";

export default function LoginPage() {
    return (
        <main style={{ minHeight: "100vh", background: "#eee4ff", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
            <div style={{ background: "white", borderRadius: "16px", padding: "40px", maxWidth: "400px", width: "100%", textAlign: "center" }}>
                <h1 style={{ color: "#6B2D8B", marginBottom: "10px" }}>Welcome to Wander Within</h1>
                <p style={{ color: "#5f4370", marginBottom: "30px" }}>
                    Sign in to book a session and manage your appointments.
                </p>

                <button
                    onClick={() => signIn("google", { callbackUrl: "/booking" })}
                    style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                        width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #ddd",
                        background: "white", cursor: "pointer", fontWeight: 500, fontSize: "15px",
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 32.7 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.5 5.1 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.7-.4-3.5z"/>
                        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.5 6.1 29.5 4 24 4c-7.9 0-14.7 4.4-18.3 10.7z"/>
                        <path fill="#4CAF50" d="M24 44c5.4 0 10.3-2 14-5.4l-6.4-5.3c-2 1.4-4.6 2.3-7.6 2.3-5.4 0-9.9-3.3-11.4-8l-6.5 5C9.4 39.5 16.1 44 24 44z"/>
                        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.9 2.5-2.6 4.6-4.7 6l6.4 5.3C40.7 36.2 44 30.6 44 24c0-1.4-.1-2.7-.4-3.5z"/>
                    </svg>
                    Continue with Google
                </button>
            </div>
        </main>
    )
}