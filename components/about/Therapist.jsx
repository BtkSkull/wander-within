import Image from "next/image";
import styles from "./Therapist.module.css";

export default function Therapist() {
  return (
    <section className={styles.section}>

      <div className={styles.container}>

        <div className={styles.imageBox}>

          <Image
            src="/images/therapist.jpeg"
            alt="Therapist"
            fill
            className={styles.image}
          />

        </div>

        <div className={styles.content}>

          <p className={styles.tag}>
            MEET YOUR THERAPIST
          </p>

          <h2>
            Aakanksha Sharma
          </h2>

          <h4>
            Clinical Psychologist & Mental Wellness Counsellor
          </h4>

          <p>
            At Wander Within, therapy is more than solving problems—it's about
            discovering your strengths, understanding your emotions, and
            creating lasting positive change.
          </p>

          <p>
            With years of experience working with individuals, adolescents,
            couples and families, my goal is to provide a safe, compassionate
            and judgement-free environment where healing naturally begins.
          </p>

          <div className={styles.stats}>

            <div className={styles.box}>
              <h3>8+</h3>
              <span>Years Experience</span>
            </div>

            <div className={styles.box}>
              <h3>500+</h3>
              <span>Clients Helped</span>
            </div>

            <div className={styles.box}>
              <h3>1000+</h3>
              <span>Therapy Sessions</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}