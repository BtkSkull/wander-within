"use client"

import {useState} from "react";
import styles from "./FAQ.module.css";


const faqData = [

{
category:"Therapy Basics",

questions:[
{
q:"What is Wander Within Therapy?",
a:"Wander Within provides a safe and compassionate space where you can explore your emotions, thoughts, and personal growth through therapy."
},
{
q:"How long is a therapy session?",
a:"A typical therapy session lasts around 50-60 minutes depending on your needs."
},
{
q:"Is my information confidential?",
a:"Yes, your personal information and therapy discussions are kept completely confidential."
}
]

},


{
category:"Booking & Fees",


questions:[
{
q:"What do sessions cost?",
a:"Session fees depend on the type of counselling service selected."
},

{
q:"How do I book a session?",
a:"You can book your session using our online booking system."
},

{
q:"What is the cancellation policy?",
a:"Appointments can be rescheduled with prior notice."
}

]

},


{
category:"Resources",


questions:[
{
q:"What free resources are available?",
a:"We provide mental health resources, blogs and wellness guidance."
},

{
q:"Do you run group workshops?",
a:"Yes, we conduct mental health workshops and group programs."
}

]

}

]



export default function FAQ(){


const [open,setOpen]=useState(null);



return(

<section className={styles.faqSection}>


<div className={styles.heading}>

<h1>
Frequently Asked Questions
</h1>

<p>
Browse common questions about therapy, booking and resources.
</p>

</div>



<div className={styles.cards}>


{
faqData.map((item,index)=>(


<div className={styles.card} key={index}>


<div className={styles.cardTitle}>

<span>
{item.icon}
</span>

<h2>
{item.category}
</h2>

</div>



{
item.questions.map((faq,i)=>(


<div 
className={styles.question}
key={i}
onClick={()=>setOpen(open===`${index}-${i}`?null:`${index}-${i}`)}
>


<div className={styles.questionTitle}>

<p>
{faq.q}
</p>

<span>
⌄
</span>

</div>


{
open===`${index}-${i}` &&

<p className={styles.answer}>
{faq.a}
</p>

}


</div>


))

}


</div>


))

}


</div>



<div className={styles.cta}>


<div>

<h2>
Still curious?
</h2>

<p>
Send us a message and we will get back to you.
</p>

</div>


<button>
Message Us
</button>


</div>


</section>


)

}