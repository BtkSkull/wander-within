import Link from "next/link";
import styles from "./ServicesPage.module.css";

const services = [
  {
    title: "Individual Therapy & Emotional Well-being",
    description:
      "Support for anxiety, stress, burnout, emotional regulation, self-esteem and personal growth.",
    icon: "🧠",
  },
  {
    title: "Child, Adolescent & Parent Support",
    description:
      "Counselling for children, teenagers and parents dealing with behavioural, emotional and academic concerns.",
    icon: "👨‍👩‍👧",
  },
  {
    title: "Relationship & Family Counselling",
    description:
      "Improve communication, resolve conflicts and strengthen healthy relationships.",
    icon: "❤️",
  },
  {
    title: "Group Programs & Mental Health Workshops",
    description:
      "Interactive group sessions, school, college and corporate wellness workshops.",
    icon: "👥",
  },
  {
    title: "Addiction Recovery & Lifestyle Wellness",
    description:
      "Helping individuals overcome addiction while building healthy coping skills and resilience.",
    icon: "🌿",
  },
  {
    title: "Mindfulness & Self Discovery",
    description:
      "Learn mindfulness techniques, emotional awareness and develop inner peace.",
    icon: "🪷",
  },
];

export default function ServicesPage() {
  return (
    <section className={styles.servicesSection}>

      <div className={styles.heading}>
        <h1>Our Services</h1>

        <p>
          Compassionate, evidence-based therapy services designed to help you
          heal, grow and reconnect with yourself.
        </p>
      </div>

      <div className={styles.grid}>

        {services.map((service, index) => (

          <div className={styles.card} key={index}>

            <div className={styles.icon}>
              {service.icon}
            </div>

            <h2>{service.title}</h2>

            <p>{service.description}</p>

            <Link
              href="/booking"
              className={styles.bookBtn}
            >
              Book Session
            </Link>

          </div>

        ))}

      </div>

    </section>
  );
}