// import React, { useEffect } from 'react';
// import styles from './Modal.module.scss';
// import useModalStore from '@/store/modalStore'; // Sử dụng modalStore để quản lý modal

// const Modal = () => {
//     const { isOpen, modalContent, closeModal } = useModalStore((state) => ({
//         isOpen: state.isOpen,
//         modalContent: state.modalContent,
//         closeModal: state.closeModal,
//     }));

//     // Ngăn không cho click ra ngoài modal đóng modal
//     const handleClose = (e) => {
//         if (e.target === e.currentTarget) {
//             closeModal();
//         }
//     };

//     useEffect(() => {
//         // Lắng nghe nhấn phím ESC để đóng modal
//         const handleEscKey = (e) => {
//             if (e.key === 'Escape') {
//                 closeModal();
//             }
//         };
//         window.addEventListener('keydown', handleEscKey);

//         return () => {
//             window.removeEventListener('keydown', handleEscKey);
//         };
//     }, [closeModal]);

//     if (!isOpen) return null; // Nếu modal không mở, không render gì cả

//     return (
//         <div className={styles.modalOverlay} onClick={handleClose}>
//             <div className={styles.modalContent}>
//                 <button className={styles.closeButton} onClick={closeModal}>X</button>
//                 {modalContent} {/* Hiển thị nội dung truyền vào từ component cha */}
//             </div>
//         </div>
//     );
// };

// export default Modal;


import { useEffect, useState } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        // Cập nhật showModal chỉ khi isOpen thay đổi
        setShowModal(isOpen);
    }, [isOpen]); // Chỉ phụ thuộc vào isOpen để tránh vòng lặp vô tận

    const handleClose = () => {
        setShowModal(false);
        onClose(); // Gọi lại onClose khi modal đóng
    };

    if (!showModal) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                {children}
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
