import styles from "./SupportAreas.module.css";


const areas = [

    "Anxiety",
    "Stress Management",
    "Relationships",
    "Self-esteem",
    "Trauma Recovery",
    "Addiction Support",
    "Emotional Regulation",
    "Personal Growth"

];


export default function SupportAreas(){


return (

<section className={styles.section}>


<div className={styles.heading}>

<p>
AREAS OF SUPPORT
</p>


<h2>
Support For Your Mental Wellness Journey
</h2>


</div>



<div className={styles.grid}>


{
areas.map((area,index)=>(

<div 
className={styles.card}
key={index}
>


<div className={styles.icon}>
✓
</div>


<h3>
{area}
</h3>


<p>
Compassionate guidance and support
to help you understand and overcome
life challenges.
</p>


</div>

))
}


</div>


</section>

);

}