import styles from "./WhyChoose.module.css";

export default function WhyChoose(){

const points=[
"Confidential & Safe Sessions",
"Evidence Based Therapy",
"Personalized Care Plans",
"Online & Offline Sessions",
"Flexible Scheduling",
"Compassionate Support"
];

return(

<section className={styles.section}>

<div className={styles.left}>

<p className={styles.tag}>WHY CHOOSE US</p>

<h2>Why Clients Trust Wander Within</h2>

<p className={styles.text}>
We combine empathy, professionalism and modern therapeutic practices
to help individuals navigate emotional challenges with confidence.
</p>

<div className={styles.list}>

{points.map((item,index)=>(
<div className={styles.item} key={index}>
✔ {item}
</div>
))}

</div>

</div>

<div className={styles.right}>

<div className={styles.box}>
<h1>500+</h1>
<p>Clients Helped</p>
</div>

<div className={styles.box}>
<h1>1000+</h1>
<p>Sessions Conducted</p>
</div>

<div className={styles.box}>
<h1>98%</h1>
<p>Client Satisfaction</p>
</div>

</div>

</section>

);

}