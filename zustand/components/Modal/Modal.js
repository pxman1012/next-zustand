// 'use client';

// import styles from './Modal.module.scss';

// const Modal = ({ isOpen, onClose, children }) => {
//     if (!isOpen) return null; // Không render nếu Modal không mở

//     return (
//         <div className={styles.modalOverlay}>
//             <div className={styles.modalContent}>
//                 {children}
//                 <button className={styles.closeButton} onClick={onClose}>
//                     Close
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Modal;

'use client'

import React, { useEffect } from 'react';
import useModalStore from '@/store/modalStore';
import styles from './Modal.module.scss'; // CSS Module cho Modal

const Modal = () => {
    const { content,isOpen, closeModal } = useModalStore(); // Lấy trạng thái từ modalStore

    useEffect(() => {
        // Ngừng bất kỳ sự kiện nào nếu modal đóng, để tránh click ngoài modal gây sự cố
        const handleEscKey = (e) => {
            if (e.key === 'Escape') {
                closeModal(); // Đóng modal khi nhấn ESC
            }
        };

        // Lắng nghe sự kiện Escape
        window.addEventListener('keydown', handleEscKey);

        // Cleanup listener khi component unmount
        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, [closeModal]);

    if (!isOpen) return null; // Nếu modal không mở, không render gì cả

    return (
        <div className={styles.modalBackdrop} 
        // onClick={closeModal}
        >
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {/* Ngừng lan truyền sự kiện click ra ngoài modal */}
                <button className={styles.closeButton} onClick={closeModal}>X</button>
                <div className={styles.modalBody}>
                    {content} {/* Render nội dung modal được truyền vào */}
                </div>
            </div>
        </div>
    );
};

export default Modal;
