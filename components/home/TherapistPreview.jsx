import Image from "next/image";
import Link from "next/link";
import styles from "./TherapistPreview.module.css";


export default function TherapistPreview(){

    return (

        <section className={styles.section}>


            <div className={styles.card}>


                {/* Image */}

                <div className={styles.imageBox}>

                    <Image

                        src="/images/therapist.jpeg"

                        alt="Therapist"

                        width={350}

                        height={400}

                    />

                </div>



                {/* Content */}

                <div className={styles.content}>


                    <p className={styles.tag}>
                        MEET YOUR THERAPIST
                    </p>


                    <h2>
                        A Safe Space For Healing
                        And Personal Growth
                    </h2>


                    <p>

                        At Wander Within, we believe that
                        everyone deserves a safe and supportive
                        space to understand themselves, manage
                        emotions, and build a healthier life.

                    </p>


                    <p>

                        With a compassionate and personalized
                        approach, I help individuals navigate
                        anxiety, stress, relationships, and
                        personal challenges.

                    </p>



                    <Link href="/about">

                        <button className={styles.button}>
                            Know More
                        </button>

                    </Link>


                </div>


            </div>


        </section>

    );

}