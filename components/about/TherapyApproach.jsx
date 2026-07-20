import styles from "./TherapyApproach.module.css";

export default function TherapyApproach() {

  const data = [
    {
      title: "Safe & Confidential",
      text: "A judgement-free environment where your privacy is always protected."
    },
    {
      title: "Evidence Based",
      text: "Using modern psychological techniques backed by scientific research."
    },
    {
      title: "Personalized Therapy",
      text: "Every treatment plan is designed according to your unique needs."
    },
    {
      title: "Holistic Healing",
      text: "Supporting emotional, mental and personal growth together."
    },
    {
      title: "Collaborative Process",
      text: "Working with you as a partner throughout your healing journey."
    },
    {
      title: "Long-Term Wellness",
      text: "Building practical skills that support lifelong emotional wellbeing."
    }
  ];

  return (
    <section className={styles.section}>

      <div className={styles.heading}>
        <p>THERAPY APPROACH</p>
        <h2>How We Support Your Journey</h2>
      </div>

      <div className={styles.grid}>

        {data.map((item, index) => (

          <div className={styles.card} key={index}>

            <div className={styles.number}>
              {index + 1}
            </div>

            <h3>{item.title}</h3>

            <p>{item.text}</p>

          </div>

        ))}

      </div>

    </section>
  );
}