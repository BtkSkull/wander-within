'use client';

import { useState } from "react";
import styles from "./Testimonials.module.css";

const reviews = [
    {
        name:"Anonymous Client",
        review:
        "The therapy sessions helped me understand myself better and manage my anxiety with more confidence.",
    },
    {
        name:"Anonymous Client",
        review:
        "A safe and supportive environment where I felt heard and understood. The guidance has been very helpful.",
    },
    {
        name:"Anonymous Client",
        review:
        "The approach was compassionate and practical. I learned healthy ways to handle stress and emotions.",
    },
];

export default function Testimonials(){
    const [expanded, setExpanded] = useState({});

    const toggle = (index) => {
        setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <section className={styles.section}>
            <div className={styles.heading}>
                <p>TESTIMONIALS</p>
                <h2>What Our Clients Say</h2>
            </div>

            <div className={styles.cards}>
                {reviews.map((item, index) => (
                    <div className={styles.card} key={index}>
                        <div className={styles.stars}>★★★★★</div>
                        <p className={`${styles.review} ${expanded[index] ? styles.expanded : ""}`}>
                            "{item.review}"
                        </p>
                        <button className={styles.seeMore} onClick={() => toggle(index)}>
                            {expanded[index] ? "See Less" : "See More"}
                        </button>
                        <h3>- {item.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}