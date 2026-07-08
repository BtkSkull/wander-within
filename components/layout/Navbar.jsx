import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {

  return (

    <nav className={styles.navbar}>

      {/* Logo */}
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src="/images/logo.png"
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

        <Link href="/resources">
          Resources
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
          href="https://wa.me/your-number"
          target="_blank"
          className={styles.whatsapp}
        >

          <span className={styles.icon}>
            ◉
          </span>

          <span>
            WHATSAPP
          </span>

        </a>


      </div>


    </nav>

  );

}