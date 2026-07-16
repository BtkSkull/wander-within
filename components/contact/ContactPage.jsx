import styles from "./ContactPage.module.css";

export default function ContactPage() {
  return (
    <section className={styles.contactSection}>

      <div className={styles.heading}>
        <h1>Get In Touch</h1>
        <p>
          We are here to support your healing journey.
          Reach out anytime.
        </p>
      </div>

      <div className={styles.container}>

        {/* LEFT */}

        <div className={styles.left}>

          <div className={styles.card}>

            <h2>Contact Us</h2>

            <div className={styles.inputGroup}>
              <label>Name</label>
              <input type="text" placeholder="Your Name" />
            </div>

            <div className={styles.inputGroup}>
              <label>Email</label>
              <input type="email" placeholder="Your Email" />
            </div>

            <div className={styles.inputGroup}>
              <label>WhatsApp Number</label>
              <input type="text" placeholder="Your WhatsApp Number" />
            </div>

            <div className={styles.inputGroup}>
              <label>Message</label>
              <textarea placeholder="Type your message"></textarea>
            </div>

            <button className={styles.sendBtn}>
              Send Message
            </button>

          </div>

        </div>

        {/* RIGHT */}

        <div className={styles.right}>

          <div className={styles.infoCard}>

            <h2>Contact Information</h2>

            <div className={styles.infoItem}>
              <h4>Email</h4>
              <p>hello@wanderwithin.com</p>
            </div>

            <div className={styles.infoItem}>
              <h4>Phone</h4>
              <p>+91 98765 43210</p>
            </div>

            <div className={styles.infoItem}>
              <h4>Working Hours</h4>
              <p>Mon - Sat | 9:00 AM - 7:00 PM</p>
            </div>

          </div>

          <div className={styles.mapCard}>

            <h2>Our Location</h2>

            <div className={styles.map}>

              <iframe
                src="https://www.google.com/maps?q=Delhi&output=embed"
                loading="lazy"
                allowFullScreen
              ></iframe>

            </div>

          </div>

          <div className={styles.socialCard}>

            <h2>Connect With Us</h2>

            <div className={styles.socialIcons}>

              <a href="#">📷</a>
              <a href="#">📘</a>
              <a href="#">💼</a>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}