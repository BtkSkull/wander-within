import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";


export default function Hero() {

    return (

        <section className={styles.hero}>

            {/* Left Content */}

            <div className={styles.content}>

                <p className={styles.smallTitle}>
                    WELCOME TO WANDER WITHIN
                </p>


                <h1>
                    Your Journey Towards
                    <br />
                    Mental Wellness Begins Here
                </h1>


                <p className={styles.description}>
                    A safe and compassionate space where you can
                    understand yourself, heal emotionally, and grow
                    with professional guidance.
                </p>


                <div className={styles.buttons}>

                    <Link href="/booking">

                        <button className={styles.primaryBtn}>
                            Book a Session
                        </button>

                    </Link>


                    <Link href="/services">

                        <button className={styles.secondaryBtn}>
                            Explore Services
                        </button>

                    </Link>

                </div>

            </div>



            {/* Right Image */}

            <div className={styles.imageBox}>

                {/* <div className={styles.imageCard}> */}

                    <Image

                        src="/images/logo.png"

                        alt="Therapist"

                        width={450}

                        height={550}

                        priority

                    />

                </div>

            {/* </div> */}


        </section>

    );
}