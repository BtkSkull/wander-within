'use client';

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { FaWhatsapp, FaUser } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";

const menuItemStyle = {
  display: "block",
  padding: "10px 12px",
  borderRadius: "8px",
  color: "#463280",
  textDecoration: "none",
  fontSize: "14px",
};

export default function Navbar() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <Image
  src="/images/logo1.png"
  alt="Wander Within"
  width={180}
  height={60}
  priority
/>
      </Link>

      <div className={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/services" className={styles.active}>
          Services
        </Link>
        <Link href="/faq">FAQ</Link>
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

        <div ref={menuRef} style={{ position: "relative" }}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Account menu"
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "#f4eaff",
              border: "1px solid #463280",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <FaUser color="#463280" size={16} />
          </button>

          {menuOpen && (
            <div
              style={{
                position: "absolute",
                top: "48px",
                right: 0,
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(70,50,128,0.18)",
                minWidth: "200px",
                padding: "8px",
                zIndex: 100,
              }}
            >
              {status === "authenticated" ? (
                <>
                  <div
                    style={{
                      padding: "10px 12px",
                      fontSize: "13px",
                      color: "#999",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    Signed in as
                    <br />
                    <strong style={{ color: "#463280" }}>
                      {session.user.name}
                    </strong>
                  </div>

                  <Link
                    href="/my-sessions"
                    onClick={() => setMenuOpen(false)}
                    style={menuItemStyle}
                  >
                    My Sessions
                  </Link>

                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={menuItemStyle}
                  >
                    Contact Us
                  </a>

                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    style={{
                      ...menuItemStyle,
                      width: "100%",
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#d33",
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    style={menuItemStyle}
                  >
                    Login / Signup
                  </Link>

                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={menuItemStyle}
                  >
                    Contact Us
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}