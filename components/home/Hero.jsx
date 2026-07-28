import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>

            <div className={`${styles.content} fade-in-up`}>
                <p className={styles.tag} style={{ animation: "fadeInUp 0.6s ease-out 0.1s both" }}>
                    WELCOME TO WANDER WITHIN
                </p>

                <h1 style={{ animation: "fadeInUp 0.7s ease-out 0.25s both" }}>
                    Where every step leads to a new discovery..
                </h1>

                <p className={styles.description} style={{ animation: "fadeInUp 0.7s ease-out 0.4s both" }}>
                    Compassionate therapy and mental health support
                    to help you heal, grow and reconnect with yourself.
                </p>

                <div className={styles.buttons} style={{ animation: "fadeInUp 0.7s ease-out 0.55s both" }}>
                    <Link href="/booking">
                        <button className={styles.primary}>
                            Book a Session
                        </button>
                    </Link>

                    <Link href="/services">
                        <button className={styles.secondary}>
                            Explore Services
                        </button>
                    </Link>
                </div>
            </div>

            <div className={styles.trustRow} style={{ animation: "fadeInUp 0.8s ease-out 0.7s both" }}>
                <div className={styles.trustItem}>
                    <strong>80+</strong>
                    <span>Clients Supported</span>
                </div>
                <div className={styles.trustItem}>
                    <strong>100%</strong>
                    <span>Confidential Sessions</span>
                </div>
                <div className={styles.trustItem}>
                    <strong>Online & In-Person</strong>
                    <span>Flexible Sessions</span>
                </div>
            </div>
        </section>
    );
}