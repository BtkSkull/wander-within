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
    }

];



export default function Services(){


return (

<section className={styles.section}>


<div className={styles.heading}>

<p>
OUR SERVICES
</p>

<h2>
Support Designed For Your Mental Wellness
</h2>

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


<button>
Learn More
</button>


</div>

))
}


</div>


</section>

);

}