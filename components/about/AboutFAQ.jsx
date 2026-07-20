import styles from "./AboutFAQ.module.css";

export default function AboutFAQ() {

const faq = [

{
question:"Is therapy confidential?",
answer:"Yes. Everything discussed during therapy sessions remains completely confidential, except where disclosure is legally required."
},

{
question:"Do you offer online sessions?",
answer:"Yes. We provide secure online therapy sessions for clients across India and internationally."
},

{
question:"How long does one session last?",
answer:"Most therapy sessions are approximately 50–60 minutes."
},

{
question:"How do I book an appointment?",
answer:"Simply visit the Booking page, choose your preferred date and time, and confirm your session."
}

];

return(

<section className={styles.section}>

<div className={styles.heading}>

<p>FAQs</p>

<h2>Frequently Asked Questions</h2>

</div>

<div className={styles.container}>

{faq.map((item,index)=>(

<div className={styles.card} key={index}>

<h3>{item.question}</h3>

<p>{item.answer}</p>

</div>

))}

</div>

</section>

);

}