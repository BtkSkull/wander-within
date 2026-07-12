import Link from "next/link";
import styles from "./Hero.module.css";


export default function Hero(){

    return (

        <section className={styles.hero}>


            <div className={styles.overlay}></div>


            <div className={styles.content}>


                <p className={styles.tag}>
                    WELCOME TO WANDER WITHIN
                </p>


                <h1>
                    Where every step leads to a new discovery..
                </h1>


                <p className={styles.description}>
                    Compassionate therapy and mental health support
                    to help you heal, grow and reconnect with yourself.
                </p>



                <div className={styles.buttons}>


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


        </section>

    );

}