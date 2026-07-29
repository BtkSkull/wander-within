import styles from "./Services.module.css";


const services = [

    {
        title:"Individual Therapy & Emotional Well-being",
        description:
        "Support for anxiety, stress, self-esteem, emotional regulation, personal growth and burnout."
    },


    {
        title:"Child, Adolescent & Parent Support",
        description:
        "Child counselling, teen counselling, parent guidance, behavioural concerns and exam stress support."
    },


    {
        title:"Relationship & Family Counselling",
        description:
        "Improve communication, resolve conflicts and build healthier relationships with professional guidance."
    },


    {
        title:"Group Programs & Mental Health Workshops",
        description:
        "Group therapy, support groups, psychoeducation and wellness workshops for schools, colleges and workplaces."
    },


    {
        title:"Addiction Recovery & Lifestyle Wellness",
        description:
        "Support for addiction recovery, relapse prevention, mindfulness and healthy coping strategies."
    },

    {
    title: "Trauma, Grief & Emotional Healing",
    description:
      "Compassionate support for trauma recovery, grief counselling, emotional healing, resilience building and coping with life-changing experiences."
},

];



export default function Services(){


return (

<section className={styles.section}>


<div className={styles.heading}>

<h1>
OUR SERVICES
</h1>

</div>



<div className={styles.cards}>


{
services.map((service,index)=>(

<div 
className={styles.card}
key={index}
>


<h3>
{service.title}
</h3>


<p>
{service.description}
</p>



</div>

))
}


</div>


</section>

);

}