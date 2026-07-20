import styles from "./Qualifications.module.css";

export default function Qualifications() {
  return (
    <section className={styles.section}>

      <div className={styles.heading}>
        <p>QUALIFICATIONS</p>
        <h2>Education & Professional Expertise</h2>
      </div>

      <div className={styles.grid}>

        <div className={styles.card}>
          <div className={styles.icon}>🎓</div>
          <h3>Master's Degree</h3>
          <p>
            Master's in Clinical Psychology with extensive practical
            training in mental health care.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>📜</div>
          <h3>Licensed Therapist</h3>
          <p>
            Certified mental health professional following ethical and
            evidence-based therapeutic practices.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>🧠</div>
          <h3>CBT Specialist</h3>
          <p>
            Specialized in Cognitive Behavioural Therapy for anxiety,
            depression and stress management.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>🌿</div>
          <h3>Mindfulness Coach</h3>
          <p>
            Helping clients build emotional resilience through
            mindfulness-based techniques.
          </p>
        </div>

      </div>

    </section>
  );
}