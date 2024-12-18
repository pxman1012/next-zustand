import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Hàm để fetch danh sách Doctors
const fetchDoctors = async (set) => {
    const response = await fetch('/api/doctors');
    const data = await response.json();
    set({ doctors: data });
};

// Hàm để thêm Doctor
const addDoctor = async (newDoctor, set) => {
    const response = await fetch('/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDoctor),
    });
    const addedDoctor = await response.json();
    set((state) => ({ doctors: [...state.doctors, addedDoctor] }));
};

// Hàm để cập nhật Doctor
const updateDoctor = async (updatedDoctor, set) => {
    const response = await fetch('/api/doctors', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDoctor),
    });
    const updated = await response.json();
    set((state) => ({
        doctors: state.doctors.map((doctor) =>
            doctor.id === updated.id ? updated : doctor
        ),
    }));
};

// Hàm để xóa Doctor
const deleteDoctor = async (id, set) => {
    await fetch(`/api/doctors?id=${id}`, { method: 'DELETE' });
    set((state) => ({
        doctors: state.doctors.filter((doctor) => doctor.id !== id),
    }));
};

const useDoctorsStore = create(
    devtools(
        persist(
            (set) => ({
                doctors: [],
                fetchDoctors: () => fetchDoctors(set), // Sử dụng hàm fetchDoctors
                addDoctor: (newDoctor) => addDoctor(newDoctor, set), // Sử dụng hàm addDoctor
                updateDoctor: (updatedDoctor) => updateDoctor(updatedDoctor, set), // Sử dụng hàm updateDoctor
                deleteDoctor: (id) => deleteDoctor(id, set), // Sử dụng hàm deleteDoctor
            }),
            { name: 'doctors-storage' }
        ),
        { name: 'Doctors Store' }
    )
);

export default useDoctorsStore;
