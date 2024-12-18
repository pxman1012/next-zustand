// 'use client';
// import DoctorForm from '@/components/DoctorForm/DoctorForm';
// import Modal from '@/components/Modal/Modal';
// import Table from '@/components/Table/Table';
// import useDoctorsStore from '@/store/doctorsStore';
// import useModalStore from '@/store/modalStore';
// import { useEffect } from 'react';

// export default function DoctorsPage() {
//     const { doctors, fetchDoctors, addDoctor, updateDoctor, deleteDoctor } = useDoctorsStore();
//     const { openModal, closeModal } = useModalStore((state) => ({
//         openModal: state.openModal,
//         closeModal: state.closeModal,
//     }));

//     useEffect(() => {
//         fetchDoctors();
//     }, [fetchDoctors]);

//     const handleAddDoctor = () => {
//         openModal(
//             <DoctorForm
//                 initialValues={{ name: '', specialty: '' }}
//                 onSubmit={(newDoctor) => {
//                     addDoctor(newDoctor);
//                     closeModal();
//                 }}
//             />
//         );
//     };

//     const handleEditDoctor = (doctor) => {
//         openModal(
//             <DoctorForm
//                 initialValues={doctor}
//                 onSubmit={(updatedDoctor) => {
//                     updateDoctor(updatedDoctor);
//                     closeModal();
//                 }}
//             />
//         );
//     };

//     const handleDeleteDoctor = (id) => {
//         deleteDoctor(id);
//     };

//     return (
//         <div>
//             <h1>Doctors Management</h1>
//             <button onClick={handleAddDoctor}>Add Doctor</button>
//             <Table data={doctors} onEdit={handleEditDoctor} onDelete={handleDeleteDoctor} />
//             <Modal /> {/* Đặt Modal ở đây để hiển thị khi trạng thái modal là true */}
//         </div>
//     );
// }

'use client';
import DoctorForm from '@/components/DoctorForm/DoctorForm';
import Modal from '@/components/Modal/Modal';
import Table from '@/components/Table/Table';
import useDoctorsStore from '@/store/doctorsStore';
import useModalStore from '@/store/modalStore';
import { useEffect, useState } from 'react';

export default function DoctorsPage() {
    const { doctors, fetchDoctors, addDoctor, updateDoctor, deleteDoctor } = useDoctorsStore();
    const { openModal, closeModal, isModalOpen } = useModalStore((state) => ({
        openModal: state.openModal,
        closeModal: state.closeModal,
        isModalOpen: state.isModalOpen, // Thêm trạng thái kiểm tra modal
    }));

    const [loading, setLoading] = useState(true);

    // Fetch doctors only once on page load (client-side)
    useEffect(() => {
        const loadDoctors = async () => {
            await fetchDoctors();
            setLoading(false); // Đánh dấu là đã load xong dữ liệu
        };

        if (doctors.length === 0) {  // Kiểm tra xem dữ liệu đã có chưa
            loadDoctors();
        } else {
            setLoading(false); // Nếu đã có dữ liệu, set loading thành false
        }
    }, [doctors, fetchDoctors]);

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

    // Nếu dữ liệu chưa được tải, hiển thị loading
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Doctors Management</h1>
            <button onClick={handleAddDoctor}>Add Doctor</button>
            <Table data={doctors} onEdit={handleEditDoctor} onDelete={handleDeleteDoctor} />
            {isModalOpen && <Modal />} {/* Kiểm tra trạng thái của modal */}
        </div>
    );
}
