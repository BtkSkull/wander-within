import Link from "next/link";
import styles from "./ServicesPage.module.css";

const services = [
  {
    title: "Individual Therapy (50-60 min)",
    price: "₹999",
    description:
      "Personalized one-to-one therapy sessions to help you manage anxiety, stress, burnout, emotional regulation, self-esteem, and personal growth in a safe, confidential space.",
  },
  {
    title: "Child, Adolescent & Parent Support",
    price: "₹1,199",
    description:
      "Professional counselling for children, teenagers, and parents to address emotional, behavioural, academic, and family-related challenges.",
  },
  {
    title: "Relationship & Family Counseling",
    price: "₹1,799",
    description:
      "Strengthen relationships through healthy communication, conflict resolution, trust-building, and emotional connection with expert guidance.",
  },
  {
    title: "Group Programs & Mental Health Workshops",
    price: "₹499 / Person",
    description:
      "Interactive wellness workshops for schools, colleges, workplaces, and community groups focusing on mental health awareness and emotional well-being.",
  },
  {
    title: "Addiction Recovery & Lifestyle Wellness",
    price: "₹1,199",
    description:
      "Evidence-based support to overcome addiction, build healthy coping strategies, improve lifestyle habits, and promote long-term recovery.",
  },
  {
    title: "Student Special Therapy",
    price: "₹500 / Session",
    description:
      "Affordable counselling exclusively for students dealing with exam stress, anxiety, career confusion, academic pressure, and emotional well-being. Professional support should always be accessible.",
    student: true,
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

          <div
            key={index}
            className={`${styles.card} ${
              service.student ? styles.studentCard : ""
            }`}
          >

            <h2>{service.title}</h2>

            <h3 className={styles.price}>
              {service.price}
            </h3>

            <p>{service.description}</p>

            {service.student ? (

              <Link
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
                className={styles.contactBtn}
              >
                Contact Us
              </Link>

            ) : (

              <Link
                href="/booking"
                className={styles.bookBtn}
              >
                Book Session
              </Link>

            )}

          </div>

        ))}
      </div>

    </section>
  );
}