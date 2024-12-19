'use client';

import { useState, useEffect } from 'react';
import DoctorForm from '@/components/DoctorForm/DoctorForm';
import Modal from '@/components/Modal/Modal';
import Table from '@/components/Table/Table';
import useDoctorsStore from '@/store/doctorsStore';
import styles from './DoctorsPage.module.scss';
import useModalStore from '@/store/modalStore';

export default function DoctorsPage() {
    const { doctors, fetchDoctors, addDoctor, updateDoctor, deleteDoctor } = useDoctorsStore();

    const { isOpen, openModal, closeModal } = useModalStore();

    useEffect(() => {
        fetchDoctors();
    }, [fetchDoctors]);

    const handleAddDoctor = () => {
        openModal(
            <DoctorForm
                initialValues={{ name: '', specialty: '' }}
                onSubmit={(newDoctor) => {
                    addDoctor(newDoctor);
                    closeModal();
                }}
            />
        );
    };

    const handleEditDoctor = (doctor) => {
        openModal(
            <DoctorForm
                initialValues={doctor}
                onSubmit={(updatedDoctor) => {
                    updateDoctor(updatedDoctor);
                    closeModal();
                }}
            />
        );
    };

    const handleDeleteDoctor = (id) => {
        deleteDoctor(id);
    };

    return (
        <div>
            <h1>Doctors Management</h1>
            <button className={styles.addButton} onClick={handleAddDoctor}>
                Add Doctor
            </button>
            <Table data={doctors} onEdit={handleEditDoctor} onDelete={handleDeleteDoctor} />
            {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
                {modalContent}
            </Modal> */}
        </div>
    );
}
