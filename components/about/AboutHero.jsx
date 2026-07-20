import styles from "./AboutHero.module.css";
import Link from "next/link";

export default function AboutHero() {
  return (
    <section className={styles.hero}>

      <div className={styles.overlay}></div>

      <div className={styles.content}>

        <p className={styles.tag}>
          ABOUT WANDER WITHIN
        </p>

        <h1>
          Helping You Heal,
          <br />
          Grow & Discover
          <br />
          Your Inner Strength
        </h1>

        <p className={styles.description}>
          At Wander Within, we believe every individual deserves a safe,
          confidential and compassionate environment where healing begins.
          Whether you're facing anxiety, stress, relationship challenges,
          burnout or simply seeking personal growth, our goal is to walk
          alongside you with empathy, professionalism and evidence-based care.
        </p>

        <div className={styles.buttons}>

          <Link href="/booking">
            <button className={styles.primary}>
              Book a Session
            </button>
          </Link>

          <Link href="/contact">
            <button className={styles.secondary}>
              Contact Us
            </button>
          </Link>

        </div>

      </div>

    </section>
  );
}