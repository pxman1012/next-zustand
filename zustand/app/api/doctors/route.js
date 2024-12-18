let doctors = [
    { id: 1, name: 'Dr. Smith', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Jane', specialty: 'Neurology' },
];

export async function GET() {
    return new Response(JSON.stringify(doctors), { status: 200 });
}

// Thêm Doctor mới
export async function POST(request) {
    const newDoctor = await request.json(); // Lấy dữ liệu doctor từ body của request
    newDoctor.id = doctors.length + 1; // Tạo id mới
    doctors.push(newDoctor); // Thêm doctor vào danh sách
    return new Response(JSON.stringify(newDoctor), { status: 201 });
}

// Cập nhật thông tin Doctor
export async function PUT(request) {
    const updatedDoctor = await request.json();
    doctors = doctors.map((doctor) =>
        doctor.id === updatedDoctor.id ? updatedDoctor : doctor
    );
    return new Response(JSON.stringify(updatedDoctor), { status: 200 });
}

// Xóa Doctor
export async function DELETE(request) {
    const id = new URL(request.url).searchParams.get('id');
    doctors = doctors.filter((doctor) => doctor.id !== parseInt(id, 10));
    return new Response(null, { status: 204 });
}
