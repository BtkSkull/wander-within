import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { FaWhatsapp } from "react-icons/fa";

export default function Navbar() {

  return (

    <nav className={styles.navbar}>

      {/* Logo */}
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


      {/* Navigation Links */}
      <div className={styles.links}>

        <Link href="/">
          Home
        </Link>

        <Link href="/about">
          About
        </Link>

        <Link href="/services" className={styles.active}>
          Services
        </Link>

        <Link href="/faq">
          FAQ
        </Link>

        <Link href="/contact">
          Contact
        </Link>

      </div>


      {/* Right Side */}
      <div className={styles.rightSide}>

        <Link href="/booking">
          <button className={styles.bookBtn}>
            BOOK NOW
          </button>
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


      </div>


    </nav>

  );

}