import React, { useState } from 'react';
import styles from './DoctorForm.module.scss';  // Import CSS Module

const DoctorForm = ({ initialValues, onSubmit }) => {
    const [doctor, setDoctor] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctor((prevDoctor) => ({
            ...prevDoctor,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(doctor);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={doctor.name}
                    onChange={handleChange}
                    className={styles.inputField}
                    required
                />
            </div>
            <div>
                <label htmlFor="specialty" className={styles.label}>Specialty</label>
                <input
                    type="text"
                    id="specialty"
                    name="specialty"
                    value={doctor.specialty}
                    onChange={handleChange}
                    className={styles.inputField}
                    required
                />
            </div>
            <button type="submit" className={styles.submitButton}>Save</button>
        </form>
    );
};

export default DoctorForm;
