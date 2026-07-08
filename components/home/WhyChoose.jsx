import styles from "./WhyChoose.module.css";


const highlights = [

    {
        icon:"♡",
        title:"Safe & Confidential Space",
        description:
        "A judgment-free environment where you can openly express your thoughts and emotions."
    },


    {
        icon:"✦",
        title:"Personalized Approach",
        description:
        "Therapy sessions designed according to your unique needs, experiences and goals."
    },


    {
        icon:"✓",
        title:"Professional Guidance",
        description:
        "Evidence-based therapeutic support to help you manage challenges and build resilience."
    },


    {
        icon:"◉",
        title:"Holistic Mental Wellness",
        description:
        "Focus on emotional well-being, self-awareness and long-term personal growth."
    },


    {
        icon:"☁",
        title:"Support At Your Pace",
        description:
        "A comfortable journey where healing happens at a pace that feels right for you."
    }

];



export default function WhyChoose(){


return (

<section className={styles.section}>


<div className={styles.heading}>

<p>
WHY CHOOSE WANDER WITHIN
</p>


<h2>
A Space Designed For Your Healing Journey
</h2>


</div>



<div className={styles.cards}>


{
highlights.map((item,index)=>(


<div 
className={styles.card}
key={index}
>


<div className={styles.icon}>
{item.icon}
</div>


<h3>
{item.title}
</h3>


<p>
{item.description}
</p>


</div>


))
}


</div>


</section>

);

}