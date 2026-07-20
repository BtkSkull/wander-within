import styles from "./IntakeForm.module.css";


export default function IntakeForm(){

    return (

        <div className={styles.card}>


            <h2>
                Client Intake Form
            </h2>



            <div className={styles.form}>


                <h3>
                    Personal Details
                </h3>


                <div className={styles.row}>

                    <input 
                    placeholder="Name"
                    />

                    <input 
                    placeholder="Last Name"
                    />

                </div>



                <div className={styles.row}>

                    <input 
                    placeholder="Email Address"
                    />


                    <input 
                    placeholder="Phone"
                    />

                </div>



                <h3>
                    Reason for Consultation
                </h3>


                <textarea
                className={styles.textarea}
                placeholder="Write your concern"
                />



                <h3>
                    Consent & Confidentiality Agreement
                </h3>


                <textarea
                className={styles.bigBox}
                />



                {/* <h3>
                    E-Signature
                </h3> */}



                


            </div>


        </div>

    )

}