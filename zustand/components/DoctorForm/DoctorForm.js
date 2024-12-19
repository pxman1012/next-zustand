'use client';

import { useState } from 'react';
import styles from './DoctorForm.module.scss';
import useModalStore from '@/store/modalStore';

export default function DoctorForm({ initialValues, onSubmit }) {
    const [formValues, setFormValues] = useState(initialValues);
    const { closeModal } = useModalStore()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formValues);
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <h2>{initialValues.id ? 'Edit Doctor' : 'Add Doctor'}</h2>

            <label htmlFor="name">Name</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                placeholder="Enter doctor name"
                required
            />

            <label htmlFor="specialty">Specialty</label>
            <input
                type="text"
                id="specialty"
                name="specialty"
                value={formValues.specialty}
                onChange={handleChange}
                placeholder="Enter specialty"
                required
            />

            <div className={styles.formActions}>
                <button type="submit" className={styles.submit}>
                    {initialValues.id ? 'Save Changes' : 'Add Doctor'}
                </button>
                <button type="button" className={styles.cancel}
                    onClick={closeModal}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
