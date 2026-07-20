import Link from "next/link";
import styles from "./Footer.module.css";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>

      <div className={styles.container}>

        {/* About */}

        <div className={styles.column}>
          <h2>Wander Within</h2>

          <p>
            Supporting mental wellness through compassionate,
            confidential and professional therapy services for
            individuals, couples and families.
          </p>
        </div>

        {/* Quick Links */}

        <div className={styles.column}>
          <h3>Quick Links</h3>

          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/booking">Book Session</Link>
        </div>

        {/* Services */}

        <div className={styles.column}>
          <h3>Services</h3>

          <p>Individual Therapy</p>
          <p>Child & Parent Support</p>
          <p>Relationship Counselling</p>
          <p>Trauma & Grief Healing</p>
          <p>Addiction Recovery</p>
          <p>Mental Health Workshops</p>
        </div>

        {/* Contact */}

        <div className={styles.column}>
          <h3>Contact</h3>

          <p>📍 New Delhi, India</p>
          <p>📞 +91 9311639804</p>
          <p>✉ bloxfruiz000@gmail.com</p>

          <div className={styles.social}>

            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaLinkedinIn />
            </a>

          </div>

        </div>

      </div>

      <div className={styles.bottom}>
        <p>
          © 2026 Wander Within. All Rights Reserved.
        </p>

        <div>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
        </div>
      </div>

    </footer>
  );
}