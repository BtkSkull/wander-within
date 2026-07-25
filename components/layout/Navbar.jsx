'use client';

import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { FaWhatsapp, FaUser } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src="/images/logo1.png"
            alt="Wander Within Logo"
            width={160}
            height={70}
          />
        </Link>
      </div>

      <div className={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/services" className={styles.active}>Services</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/my-sessions">My Sessions</Link>
      </div>

      <div className={styles.rightSide}>
        <Link href="/booking">
          <button className={styles.bookBtn}>BOOK NOW</button>
        </Link>

        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsapp}
        >
          <FaWhatsapp className={styles.icon} />
          WhatsApp
        </a>

        {status === "authenticated" ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "#6B2D8B" }}>
              <FaUser size={14} />
              {session.user.name?.split(" ")[0] || "Account"}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              style={{
                background: "transparent", border: "1px solid #6B2D8B", color: "#6B2D8B",
                padding: "6px 14px", borderRadius: "20px", cursor: "pointer", fontSize: "13px",
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login">
            <button
              style={{
                background: "transparent", border: "1px solid #6B2D8B", color: "#6B2D8B",
                padding: "8px 18px", borderRadius: "20px", cursor: "pointer", fontSize: "14px",
              }}
            >
              Login / Signup
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}