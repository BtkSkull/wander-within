import Link from "next/link";
import styles from "./AboutCTA.module.css";

export default function AboutCTA(){

return(

<section className={styles.section}>

<div className={styles.card}>

<p className={styles.tag}>
START YOUR HEALING JOURNEY
</p>

<h2>
Your Mental Wellbeing Matters.
Let's Take the First Step Together.
</h2>

<p className={styles.text}>
Whether you're dealing with stress, anxiety, relationship challenges,
or simply looking for personal growth, we're here to support you with
care, compassion, and evidence-based therapy.
</p>

<Link href="/booking">

<button className={styles.button}>
Book Your Session
</button>

</Link>

</div>

</section>

);

}