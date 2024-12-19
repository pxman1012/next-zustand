// // modalStore.js
// import { create } from 'zustand';

// const useModalStore = create((set) => ({
//     isOpen: false,
//     openModal: (content) => set({ isOpen: true, content }),
//     closeModal: () => set({ isOpen: false, content: null }),
// }));

// export default useModalStore;

// store/modalStore.js
import { create } from 'zustand';

const useModalStore = create((set) => ({
    isOpen: false,
    content: null,  // Nội dung của Modal
    openModal: (content) => set({ isOpen: true, content }), // Mở modal và gán nội dung
    closeModal: () => set({ isOpen: false, content: null }), // Đóng modal và reset nội dung
}));

export default useModalStore;
