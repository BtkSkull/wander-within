import Link from "next/link";
import styles from "./CTASection.module.css";


export default function BookingCTA(){

    return (

        <section className={styles.section}>


            <div className={styles.box}>


                <p className={styles.tag}>
                    START YOUR JOURNEY
                </p>


                <h2>
                    Ready to start your healing journey?
                    <br />
                    Book your session today
                </h2>


                <p className={styles.description}>
                    Take the first step towards better mental
                    health with a safe and supportive space.
                </p>



                <Link href="/booking">

                    <button className={styles.button}>
                        Book a Session
                    </button>

                </Link>


            </div>


        </section>

    );

}