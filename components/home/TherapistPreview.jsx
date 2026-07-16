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

                        src="/images/Therapist.jpeg"

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
        Aakanksha
    </h2>


    <p>
        She is a warm and compassionate Counselling Psychologist 
        who believes that healing begins when you feel truly heard, 
        understood, and accepted without judgment.
    </p>


    <p>
        Holding a Master’s degree in Psychology and a Diploma in Counselling, 
        she has supported over 80 individuals through online and in-person 
        therapy. Through her initiative, <strong>Wander Within</strong>, she 
        creates a safe, welcoming, and open-minded space where individuals 
        can explore their emotions, challenges, and personal growth journeys.
    </p>


    <p>
        Her therapeutic approach combines evidence-based psychological 
        practices with spiritual wisdom, recognizing that every person's 
        healing journey is unique. With empathy, authenticity, and deep 
        respect for each individual's story, Aakanksha walks alongside her 
        clients as they heal, grow, and reconnect with themselves.
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