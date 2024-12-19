import React from 'react';
import styles from './Table.module.scss'; // Import CSS Module

const Table = ({ data, onEdit, onDelete }) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Specialty</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((doctor) => (
                    <tr key={doctor.id}>
                        <td>{doctor.name}</td>
                        <td>{doctor.specialty}</td>
                        <td>
                            <button className={styles.edit}
                            onClick={() => onEdit(doctor)}>Edit</button>
                            <button
                                className={styles.delete}
                                onClick={() => onDelete(doctor.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
