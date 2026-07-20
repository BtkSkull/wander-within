import styles from "./WhoWeHelp.module.css";

const people = [
  "Adults",
  "Teenagers",
  "Couples",
  "Parents",
  "Working Professionals",
  "Students",
  "Families",
  "Senior Citizens"
];

export default function WhoWeHelp() {
  return (
    <section className={styles.section}>

      <div className={styles.heading}>
        <p>WHO WE HELP</p>
        <h2>Supporting Every Stage of Life</h2>
      </div>

      <div className={styles.grid}>
        {people.map((item,index)=>(
          <div className={styles.card} key={index}>
            <div className={styles.icon}>❤</div>
            <h3>{item}</h3>
          </div>
        ))}
      </div>

    </section>
  );
}