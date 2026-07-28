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
            Every meaningful journey begins with a single step and sometimes,
            that step is inward.
          </p>
          <p>
            Wander Within was created with the belief that healing doesn't
            come from becoming someone else, it begins by understanding who
            you already are. In a world that often encourages us to keep
            moving, performing, and pushing through, we wanted to create a
            space where people could simply pause, be heard, and reconnect
            with themselves.
          </p>
          <p className={styles.hideOnMobile}>
            We believe that seeking support is not a sign of weakness, but an
            act of courage and self-respect. Every person's story is unique,
            and so is their path to healing. That's why we offer therapy that
            is compassionate, collaborative, and tailored to your individual
            experiences, goals, and emotional needs.
          </p>
          <p>
            Whether you're navigating anxiety, relationship challenges,
            stress, burnout, grief, or simply feeling lost, we're here to
            walk alongside you one conversation, one insight, and one
            meaningful step at a time.
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.card}>
            <h3>Our Mission</h3>
            <p>
              To empower individuals to build emotional resilience, deepen
              self-awareness, and lead healthier, happier, and more
              fulfilling lives.
            </p>
          </div>
          <div className={styles.card}>
            <h3>Our Vision</h3>
            <p>
              To create a world where seeking therapy is embraced as an act
              of strength, self-care, and personal growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}