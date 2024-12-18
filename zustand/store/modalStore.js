import { create } from 'zustand';

const useModalStore = create((set) => ({
    isOpen: false, // Trạng thái modal (mở/đóng)
    modalContent: null, // Nội dung của modal
    openModal: (content) => set({ isOpen: true, modalContent: content }), // Mở modal và gán nội dung
    closeModal: () => set({ isOpen: false, modalContent: null }), // Đóng modal
}));

export default useModalStore;
