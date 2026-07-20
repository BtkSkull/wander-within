import styles from "./CoreValues.module.css";

const values=[
{
title:"Empathy",
text:"Understanding every client with compassion."
},
{
title:"Respect",
text:"Creating a judgement-free safe environment."
},
{
title:"Growth",
text:"Helping individuals become their best selves."
},
{
title:"Integrity",
text:"Maintaining ethical and confidential care."
}
];

export default function CoreValues(){

return(

<section className={styles.section}>

<div className={styles.heading}>

<p>OUR VALUES</p>

<h2>Core Values That Guide Every Session</h2>

</div>

<div className={styles.grid}>

{values.map((value,index)=>(

<div className={styles.card} key={index}>

<div className={styles.circle}>
{index+1}
</div>

<h3>{value.title}</h3>

<p>{value.text}</p>

</div>

))}

</div>

</section>

);

}