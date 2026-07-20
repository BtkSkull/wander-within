import styles from "./OurStory.module.css";

export default function OurStory() {
  return (

    <section className={styles.section}>

      <div className={styles.heading}>

        <p>OUR STORY</p>

        <h2>
          Why Wander Within Was Created
        </h2>

      </div>

      <div className={styles.container}>

        <div className={styles.left}>

          <h3>
            Healing Begins From Within
          </h3>

          <p>
            Wander Within was founded with one simple belief that mental
            wellness should be accessible, compassionate and free from
            judgement.
          </p>

          <p>
            Every person experiences challenges differently. That's why every
            therapy session is personalized to your emotional needs, goals and
            life experiences.
          </p>

          <p>
            Whether you're struggling with anxiety, stress, relationships,
            burnout or self-esteem, we're here to help you take one meaningful
            step at a time.
          </p>

        </div>

        <div className={styles.right}>

          <div className={styles.card}>
            <h3>🎯 Our Mission</h3>

            <p>
              Empower individuals to lead healthier, happier and emotionally
              balanced lives.
            </p>
          </div>

          <div className={styles.card}>
            <h3>🌿 Our Vision</h3>

            <p>
              Creating a world where seeking therapy is seen as a strength,
              not a weakness.
            </p>
          </div>

        </div>

      </div>

    </section>

  );
}