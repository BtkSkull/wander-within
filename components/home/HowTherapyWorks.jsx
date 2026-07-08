import styles from "./HowTherapyWorks.module.css";


const steps = [

    {
        number:"01",
        title:"Book a Session",
        description:
        "Choose a convenient time and schedule your therapy session through our easy booking process."
    },


    {
        number:"02",
        title:"Talk & Explore",
        description:
        "Share your thoughts and experiences in a safe, confidential and supportive environment."
    },


    {
        number:"03",
        title:"Heal & Grow",
        description:
        "Work towards emotional balance, self-awareness and positive changes in your life."
    }

];


export default function HowTherapyWorks(){


return (

<section className={styles.section}>


<div className={styles.heading}>

<p>
HOW THERAPY WORKS
</p>


<h2>
Your Journey Towards Wellness
</h2>


</div>



<div className={styles.steps}>


{
steps.map((step,index)=>(


<div 
className={styles.card}
key={index}
>


<div className={styles.number}>
{step.number}
</div>


<h3>
{step.title}
</h3>


<p>
{step.description}
</p>


</div>


))
}


</div>


</section>

);

}