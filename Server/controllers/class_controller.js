const kelasData = require("../models/kelasData.model")

exports.getAllClass = (req, res) => {
    const classData = [
        {
            id_kelas: '1',
            id_user: 'axcq32dsda2dw',
            role: 4,
            status: 'Warga Belajar',
            nama: 'SMK Bina Rahayu - Kelas 12.A',
            kode: 'C84UX5',
            tentang: 'Kelas Interaktif dan menyenangkan. Berbagi ilmu dengan teman - teman.',
            tkb: 'Paket C',
            sekolah: 'SMK Bina Rahayu'
        },
        {
            id_kelas: '2',
            id_user: 'axcq32dsda2dw',
            role: 1,
            status: 'Administrator Kelas',
            nama: 'SEAMOLEC - Bootcamp Cloud IoT Sthings',
            kode: 'X25CBT',
            tentang: 'Kelas ini adalah kelas untuk pelatihan bootcamp online untuk belajar Cloud IoT Menggunakan SthingCloud.',
            tkb: 'Paket C',
            sekolah: 'SEAMOLEC'
        },
        {
            id_kelas: '3',
            id_user: 'axcq32dsda2dw',
            role: 2,
            status: 'Tutor (Pengampu Mata Pelajaran)',
            nama: 'SMK Nasional Depok - Produktif',
            kode: 'KLX98A',
            tentang: 'Kelas online SMK Nasional Depok khusus untuk kelas produktif kelas 12.',
            tkb: 'Paket C',
            sekolah: 'SMK Nasional Depok'
        },
        {
            id_kelas: '4',
            id_user: 'axcq32dsda2dw',
            role: 3,
            status: 'Tutor (Pendamping)',
            nama: 'SMA Negri 01 Tajurhalang - Kelas 12.A',
            kode: 'O24IO1',
            tentang: 'Kelas Online SMA Negeri 01 Tahurhalang untuk kelas 12.A.',
            tkb: 'Paket C',
            sekolah: 'SMAN 01 Tajurhalang'
        },
        {
            id_kelas: '5',
            id_user: 'axcq32dsda2dw',
            role: 4,
            status: 'Warga Belajar',
            nama: 'Kelas Belajar React Native Batch Pertama',
            kode: 'VB01X1',
            tentang: 'Kamu akan belajar React Native sampai mahir dan bisa membuat applikasi mobile maupun web.',
            tkb: 'Paket C',
            sekolah: 'SMK Bina Rahayu'
        },
        {
            id_kelas: '6',
            id_user: 'axcq32dsda2dw',
            role: 4,
            status: 'Warga Belajar',
            nama: 'SMK Bina Rahayu - Kelas 12.A',
            kode: 'C84UX5',
            tentang: 'Kelas Interaktif dan menyenangkan. Berbagi ilmu dengan teman - teman.',
            tkb: 'Paket C',
            sekolah: 'SMK Bina Rahayu'
        },
        {
            id_kelas: '7',
            id_user: 'axcq32dsda2dw',
            role: 4,
            status: 'Warga Belajar',
            nama: 'SMK Bina Rahayu - Kelas 12.A',
            kode: 'C84UX5',
            tentang: 'Kelas Interaktif dan menyenangkan. Berbagi ilmu dengan teman - teman.',
            tkb: 'Paket C',
            sekolah: 'SMK Bina Rahayu'
        },
        {
            id_kelas: '8',
            id_user: 'axcq32dsda2dw',
            role: 4,
            status: 'Warga Belajar',
            nama: 'SMK Bina Rahayu - Kelas 12.A',
            kode: 'C84UX5',
            tentang: 'Kelas Interaktif dan menyenangkan. Berbagi ilmu dengan teman - teman.',
            tkb: 'Paket C',
            sekolah: 'SMK Bina Rahayu'
        },
    ]

    res.status(200).json(classData)
}

exports.getDetailClass = (req, res) => {
    const data = [
        {
            id: '1',
            listMapel : [
                { id: '1', title:'Artificial Intelegent' },
                { id: '2', title:'Pemograman Dasar 1' },
                { id: '3', title:'Fisika Diskrit' },
                { id: '4', title:'Bahasa Inggris Lanjutan' },
                { id: '5', title:'Automata' },
                { id: '6', title:'Matematika Lanjutan 2' },
                { id: '7', title:'Bahasa Inggris Lanjutan' },
                { id: '8', title:'Automata' },
            ],
            listMember : [
                {
                    id: '1',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1541223188/photosp/718c0244-c154-478f-bb4a-d54ccf435fc6/718c0244-c154-478f-bb4a-d54ccf435fc6.jpg', 
                    name: 'Asmianto Mustofa', 
                    school: 'School Name',
                    role: 1,
                    role_name: 'Administrator Kelas'
                },
                {
                    id: '2',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1603754014/photosp/69039a17-b3c0-48a4-83e9-05e5318adc44/69039a17-b3c0-48a4-83e9-05e5318adc44.jpg', 
                    name: 'Anastasia Pratiwi ', 
                    school: 'School Name',
                    role: 2,
                    role_name: 'Tutor (Pengampu Mata Pelajaran)'
                },
                {
                    id: '3',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1588714018/photosp/9b3ffbb6-8a31-4480-9ddd-48ddc01f47e8/9b3ffbb6-8a31-4480-9ddd-48ddc01f47e8.jpg', 
                    name: 'Cindy Kuswandari', 
                    school: 'School Name',
                    role: 3,
                    role_name: 'Tutor (Pendamping)'
                },
                {
                    id: '4',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838979/photosp/d201ccb2-d396-4d88-b4d2-4553281a6e3f/d201ccb2-d396-4d88-b4d2-4553281a6e3f.jpg', 
                    name: 'Mursita Najmudin S.E.', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                },
                {
                    id: '5',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838910/photosp/ec242c0b-e6bd-411f-a6ad-46476779ae28/ec242c0b-e6bd-411f-a6ad-46476779ae28.jpg', 
                    name: 'Indah Mandasari S.IP', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                },
                {
                    id: '6',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1603756909/photosp/371b7901-4b1f-453c-b3fb-ae40efb8f153/371b7901-4b1f-453c-b3fb-ae40efb8f153.jpg', 
                    name: 'Kariman Simanjuntak', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                }
            ]
        },
        {
            id: '2',
            listMapel : [
                { id: '1', title:'Artificial Intelegent' },
                { id: '2', title:'Pemograman Dasar 1' },
                { id: '3', title:'Fisika Diskrit' },
                { id: '4', title:'Bahasa Inggris Lanjutan' },
                { id: '5', title:'Automata' },
                { id: '6', title:'Matematika Lanjutan 2' },
                { id: '7', title:'Bahasa Inggris Lanjutan' },
                { id: '8', title:'Automata' },
            ],
            listMember : [
                {
                    id: '1',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1541223188/photosp/718c0244-c154-478f-bb4a-d54ccf435fc6/718c0244-c154-478f-bb4a-d54ccf435fc6.jpg', 
                    name: 'Asmianto Mustofa', 
                    school: 'School Name',
                    role: 1,
                    role_name: 'Administrator Kelas'
                },
                {
                    id: '2',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1603754014/photosp/69039a17-b3c0-48a4-83e9-05e5318adc44/69039a17-b3c0-48a4-83e9-05e5318adc44.jpg', 
                    name: 'Anastasia Pratiwi ', 
                    school: 'School Name',
                    role: 2,
                    role_name: 'Tutor (Pengampu Mata Pelajaran)'
                },
                {
                    id: '3',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1588714018/photosp/9b3ffbb6-8a31-4480-9ddd-48ddc01f47e8/9b3ffbb6-8a31-4480-9ddd-48ddc01f47e8.jpg', 
                    name: 'Cindy Kuswandari', 
                    school: 'School Name',
                    role: 3,
                    role_name: 'Tutor (Pendamping)'
                },
                {
                    id: '4',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838979/photosp/d201ccb2-d396-4d88-b4d2-4553281a6e3f/d201ccb2-d396-4d88-b4d2-4553281a6e3f.jpg', 
                    name: 'Mursita Najmudin S.E.', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                },
                {
                    id: '5',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838910/photosp/ec242c0b-e6bd-411f-a6ad-46476779ae28/ec242c0b-e6bd-411f-a6ad-46476779ae28.jpg', 
                    name: 'Indah Mandasari S.IP', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                },
                {
                    id: '6',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1603756909/photosp/371b7901-4b1f-453c-b3fb-ae40efb8f153/371b7901-4b1f-453c-b3fb-ae40efb8f153.jpg', 
                    name: 'Kariman Simanjuntak', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                }
            ]
        },
        {
            id: '3',
            listMapel : [
                { id: '1', title:'Artificial Intelegent' },
                { id: '2', title:'Pemograman Dasar 1' },
                { id: '3', title:'Fisika Diskrit' },
                { id: '4', title:'Bahasa Inggris Lanjutan' },
                { id: '5', title:'Automata' },
                { id: '6', title:'Matematika Lanjutan 2' },
                { id: '7', title:'Bahasa Inggris Lanjutan' },
                { id: '8', title:'Automata' },
            ],
            listMember : [
                {
                    id: '1',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1541223188/photosp/718c0244-c154-478f-bb4a-d54ccf435fc6/718c0244-c154-478f-bb4a-d54ccf435fc6.jpg', 
                    name: 'Asmianto Mustofa', 
                    school: 'School Name',
                    role: 1,
                    role_name: 'Administrator Kelas'
                },
                {
                    id: '2',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1603754014/photosp/69039a17-b3c0-48a4-83e9-05e5318adc44/69039a17-b3c0-48a4-83e9-05e5318adc44.jpg', 
                    name: 'Anastasia Pratiwi ', 
                    school: 'School Name',
                    role: 2,
                    role_name: 'Tutor (Pengampu Mata Pelajaran)'
                },
                {
                    id: '3',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1588714018/photosp/9b3ffbb6-8a31-4480-9ddd-48ddc01f47e8/9b3ffbb6-8a31-4480-9ddd-48ddc01f47e8.jpg', 
                    name: 'Cindy Kuswandari', 
                    school: 'School Name',
                    role: 3,
                    role_name: 'Tutor (Pendamping)'
                },
                {
                    id: '4',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838979/photosp/d201ccb2-d396-4d88-b4d2-4553281a6e3f/d201ccb2-d396-4d88-b4d2-4553281a6e3f.jpg', 
                    name: 'Mursita Najmudin S.E.', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                },
                {
                    id: '5',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838910/photosp/ec242c0b-e6bd-411f-a6ad-46476779ae28/ec242c0b-e6bd-411f-a6ad-46476779ae28.jpg', 
                    name: 'Indah Mandasari S.IP', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                },
                {
                    id: '6',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1603756909/photosp/371b7901-4b1f-453c-b3fb-ae40efb8f153/371b7901-4b1f-453c-b3fb-ae40efb8f153.jpg', 
                    name: 'Kariman Simanjuntak', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                }
            ]
        },
        {
            id: '4',
            listMapel : [
                { id: '1', title:'Artificial Intelegent' },
                { id: '2', title:'Pemograman Dasar 1' },
                { id: '3', title:'Fisika Diskrit' },
                { id: '4', title:'Bahasa Inggris Lanjutan' },
                { id: '5', title:'Automata' },
                { id: '6', title:'Matematika Lanjutan 2' },
                { id: '7', title:'Bahasa Inggris Lanjutan' },
                { id: '8', title:'Automata' },
            ],
            listMember : [
                {
                    id: '1',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1541223188/photosp/718c0244-c154-478f-bb4a-d54ccf435fc6/718c0244-c154-478f-bb4a-d54ccf435fc6.jpg', 
                    name: 'Asmianto Mustofa', 
                    school: 'School Name',
                    role: 1,
                    role_name: 'Administrator Kelas'
                },
                {
                    id: '2',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1603754014/photosp/69039a17-b3c0-48a4-83e9-05e5318adc44/69039a17-b3c0-48a4-83e9-05e5318adc44.jpg', 
                    name: 'Anastasia Pratiwi ', 
                    school: 'School Name',
                    role: 2,
                    role_name: 'Tutor (Pengampu Mata Pelajaran)'
                },
                {
                    id: '3',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1588714018/photosp/9b3ffbb6-8a31-4480-9ddd-48ddc01f47e8/9b3ffbb6-8a31-4480-9ddd-48ddc01f47e8.jpg', 
                    name: 'Cindy Kuswandari', 
                    school: 'School Name',
                    role: 3,
                    role_name: 'Tutor (Pendamping)'
                },
                {
                    id: '4',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838979/photosp/d201ccb2-d396-4d88-b4d2-4553281a6e3f/d201ccb2-d396-4d88-b4d2-4553281a6e3f.jpg', 
                    name: 'Mursita Najmudin S.E.', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                },
                {
                    id: '5',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838910/photosp/ec242c0b-e6bd-411f-a6ad-46476779ae28/ec242c0b-e6bd-411f-a6ad-46476779ae28.jpg', 
                    name: 'Indah Mandasari S.IP', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                },
                {
                    id: '6',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1603756909/photosp/371b7901-4b1f-453c-b3fb-ae40efb8f153/371b7901-4b1f-453c-b3fb-ae40efb8f153.jpg', 
                    name: 'Kariman Simanjuntak', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                }
            ]
        },
        {
            id: '5',
            listMapel : [
                { id: '1', title:'Artificial Intelegent' },
                { id: '2', title:'Pemograman Dasar 1' },
                { id: '3', title:'Fisika Diskrit' },
                { id: '4', title:'Bahasa Inggris Lanjutan' },
                { id: '5', title:'Automata' },
                { id: '6', title:'Matematika Lanjutan 2' },
                { id: '7', title:'Bahasa Inggris Lanjutan' },
                { id: '8', title:'Automata' },
            ],
            listMember : [
                {
                    id: '1',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1541223188/photosp/718c0244-c154-478f-bb4a-d54ccf435fc6/718c0244-c154-478f-bb4a-d54ccf435fc6.jpg', 
                    name: 'Asmianto Mustofa', 
                    school: 'School Name',
                    role: 1,
                    role_name: 'Administrator Kelas'
                },
                {
                    id: '2',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1603754014/photosp/69039a17-b3c0-48a4-83e9-05e5318adc44/69039a17-b3c0-48a4-83e9-05e5318adc44.jpg', 
                    name: 'Anastasia Pratiwi ', 
                    school: 'School Name',
                    role: 2,
                    role_name: 'Tutor (Pengampu Mata Pelajaran)'
                },
                {
                    id: '3',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1588714018/photosp/9b3ffbb6-8a31-4480-9ddd-48ddc01f47e8/9b3ffbb6-8a31-4480-9ddd-48ddc01f47e8.jpg', 
                    name: 'Cindy Kuswandari', 
                    school: 'School Name',
                    role: 3,
                    role_name: 'Tutor (Pendamping)'
                },
                {
                    id: '4',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838979/photosp/d201ccb2-d396-4d88-b4d2-4553281a6e3f/d201ccb2-d396-4d88-b4d2-4553281a6e3f.jpg', 
                    name: 'Mursita Najmudin S.E.', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                },
                {
                    id: '5',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838910/photosp/ec242c0b-e6bd-411f-a6ad-46476779ae28/ec242c0b-e6bd-411f-a6ad-46476779ae28.jpg', 
                    name: 'Indah Mandasari S.IP', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                },
                {
                    id: '6',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1603756909/photosp/371b7901-4b1f-453c-b3fb-ae40efb8f153/371b7901-4b1f-453c-b3fb-ae40efb8f153.jpg', 
                    name: 'Kariman Simanjuntak', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                }
            ]
        },
        {
            id: '6',
            listMapel : [
                { id: '1', title:'Artificial Intelegent' },
                { id: '2', title:'Pemograman Dasar 1' },
                { id: '3', title:'Fisika Diskrit' },
                { id: '4', title:'Bahasa Inggris Lanjutan' },
                { id: '5', title:'Automata' },
                { id: '6', title:'Matematika Lanjutan 2' },
                { id: '7', title:'Bahasa Inggris Lanjutan' },
                { id: '8', title:'Automata' },
            ],
            listMember : [
                {
                    id: '1',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1541223188/photosp/718c0244-c154-478f-bb4a-d54ccf435fc6/718c0244-c154-478f-bb4a-d54ccf435fc6.jpg', 
                    name: 'Asmianto Mustofa', 
                    school: 'School Name',
                    role: 1,
                    role_name: 'Administrator Kelas'
                },
                {
                    id: '2',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1603754014/photosp/69039a17-b3c0-48a4-83e9-05e5318adc44/69039a17-b3c0-48a4-83e9-05e5318adc44.jpg', 
                    name: 'Anastasia Pratiwi ', 
                    school: 'School Name',
                    role: 2,
                    role_name: 'Tutor (Pengampu Mata Pelajaran)'
                },
                {
                    id: '3',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1588714018/photosp/9b3ffbb6-8a31-4480-9ddd-48ddc01f47e8/9b3ffbb6-8a31-4480-9ddd-48ddc01f47e8.jpg', 
                    name: 'Cindy Kuswandari', 
                    school: 'School Name',
                    role: 3,
                    role_name: 'Tutor (Pendamping)'
                },
                {
                    id: '4',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838979/photosp/d201ccb2-d396-4d88-b4d2-4553281a6e3f/d201ccb2-d396-4d88-b4d2-4553281a6e3f.jpg', 
                    name: 'Mursita Najmudin S.E.', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                },
                {
                    id: '5',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838910/photosp/ec242c0b-e6bd-411f-a6ad-46476779ae28/ec242c0b-e6bd-411f-a6ad-46476779ae28.jpg', 
                    name: 'Indah Mandasari S.IP', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                },
                {
                    id: '6',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1603756909/photosp/371b7901-4b1f-453c-b3fb-ae40efb8f153/371b7901-4b1f-453c-b3fb-ae40efb8f153.jpg', 
                    name: 'Kariman Simanjuntak', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                }
            ]
        },
        {
            id: '7',
            listMapel : [
                { id: '1', title:'Artificial Intelegent' },
                { id: '2', title:'Pemograman Dasar 1' },
                { id: '3', title:'Fisika Diskrit' },
                { id: '4', title:'Bahasa Inggris Lanjutan' },
                { id: '5', title:'Automata' },
                { id: '6', title:'Matematika Lanjutan 2' },
                { id: '7', title:'Bahasa Inggris Lanjutan' },
                { id: '8', title:'Automata' },
            ],
            listMember : [
                {
                    id: '1',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1541223188/photosp/718c0244-c154-478f-bb4a-d54ccf435fc6/718c0244-c154-478f-bb4a-d54ccf435fc6.jpg', 
                    name: 'Asmianto Mustofa', 
                    school: 'School Name',
                    role: 1,
                    role_name: 'Administrator Kelas'
                },
                {
                    id: '2',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1603754014/photosp/69039a17-b3c0-48a4-83e9-05e5318adc44/69039a17-b3c0-48a4-83e9-05e5318adc44.jpg', 
                    name: 'Anastasia Pratiwi ', 
                    school: 'School Name',
                    role: 2,
                    role_name: 'Tutor (Pengampu Mata Pelajaran)'
                },
                {
                    id: '3',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1588714018/photosp/9b3ffbb6-8a31-4480-9ddd-48ddc01f47e8/9b3ffbb6-8a31-4480-9ddd-48ddc01f47e8.jpg', 
                    name: 'Cindy Kuswandari', 
                    school: 'School Name',
                    role: 3,
                    role_name: 'Tutor (Pendamping)'
                },
                {
                    id: '4',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838979/photosp/d201ccb2-d396-4d88-b4d2-4553281a6e3f/d201ccb2-d396-4d88-b4d2-4553281a6e3f.jpg', 
                    name: 'Mursita Najmudin S.E.', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                },
                {
                    id: '5',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838910/photosp/ec242c0b-e6bd-411f-a6ad-46476779ae28/ec242c0b-e6bd-411f-a6ad-46476779ae28.jpg', 
                    name: 'Indah Mandasari S.IP', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                },
                {
                    id: '6',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1603756909/photosp/371b7901-4b1f-453c-b3fb-ae40efb8f153/371b7901-4b1f-453c-b3fb-ae40efb8f153.jpg', 
                    name: 'Kariman Simanjuntak', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                }
            ]
        },
        {
            id: '8',
            listMapel : [
                { id: '1', title:'Artificial Intelegent' },
                { id: '2', title:'Pemograman Dasar 1' },
                { id: '3', title:'Fisika Diskrit' },
                { id: '4', title:'Bahasa Inggris Lanjutan' },
                { id: '5', title:'Automata' },
                { id: '6', title:'Matematika Lanjutan 2' },
                { id: '7', title:'Bahasa Inggris Lanjutan' },
                { id: '8', title:'Automata' },
            ],
            listMember : [
                {
                    id: '1',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1541223188/photosp/718c0244-c154-478f-bb4a-d54ccf435fc6/718c0244-c154-478f-bb4a-d54ccf435fc6.jpg', 
                    name: 'Asmianto Mustofa', 
                    school: 'School Name',
                    role: 1,
                    role_name: 'Administrator Kelas'
                },
                {
                    id: '2',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1603754014/photosp/69039a17-b3c0-48a4-83e9-05e5318adc44/69039a17-b3c0-48a4-83e9-05e5318adc44.jpg', 
                    name: 'Anastasia Pratiwi ', 
                    school: 'School Name',
                    role: 2,
                    role_name: 'Tutor (Pengampu Mata Pelajaran)'
                },
                {
                    id: '3',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1588714018/photosp/9b3ffbb6-8a31-4480-9ddd-48ddc01f47e8/9b3ffbb6-8a31-4480-9ddd-48ddc01f47e8.jpg', 
                    name: 'Cindy Kuswandari', 
                    school: 'School Name',
                    role: 3,
                    role_name: 'Tutor (Pendamping)'
                },
                {
                    id: '4',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838979/photosp/d201ccb2-d396-4d88-b4d2-4553281a6e3f/d201ccb2-d396-4d88-b4d2-4553281a6e3f.jpg', 
                    name: 'Mursita Najmudin S.E.', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                },
                {
                    id: '5',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838910/photosp/ec242c0b-e6bd-411f-a6ad-46476779ae28/ec242c0b-e6bd-411f-a6ad-46476779ae28.jpg', 
                    name: 'Indah Mandasari S.IP', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                },
                {
                    id: '6',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1603756909/photosp/371b7901-4b1f-453c-b3fb-ae40efb8f153/371b7901-4b1f-453c-b3fb-ae40efb8f153.jpg', 
                    name: 'Kariman Simanjuntak', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                }
            ]
        },
        {
            id: '9',
            listMapel : [
                { id: '1', title:'Artificial Intelegent' },
                { id: '2', title:'Pemograman Dasar 1' },
                { id: '3', title:'Fisika Diskrit' },
                { id: '4', title:'Bahasa Inggris Lanjutan' },
                { id: '5', title:'Automata' },
                { id: '6', title:'Matematika Lanjutan 2' },
                { id: '7', title:'Bahasa Inggris Lanjutan' },
                { id: '8', title:'Automata' },
            ],
            listMember : [
                {
                    id: '1',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1541223188/photosp/718c0244-c154-478f-bb4a-d54ccf435fc6/718c0244-c154-478f-bb4a-d54ccf435fc6.jpg', 
                    name: 'Asmianto Mustofa', 
                    school: 'School Name',
                    role: 1,
                    role_name: 'Administrator Kelas'
                },
                {
                    id: '2',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1603754014/photosp/69039a17-b3c0-48a4-83e9-05e5318adc44/69039a17-b3c0-48a4-83e9-05e5318adc44.jpg', 
                    name: 'Anastasia Pratiwi ', 
                    school: 'School Name',
                    role: 2,
                    role_name: 'Tutor (Pengampu Mata Pelajaran)'
                },
                {
                    id: '3',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1588714018/photosp/9b3ffbb6-8a31-4480-9ddd-48ddc01f47e8/9b3ffbb6-8a31-4480-9ddd-48ddc01f47e8.jpg', 
                    name: 'Cindy Kuswandari', 
                    school: 'School Name',
                    role: 3,
                    role_name: 'Tutor (Pendamping)'
                },
                {
                    id: '4',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838979/photosp/d201ccb2-d396-4d88-b4d2-4553281a6e3f/d201ccb2-d396-4d88-b4d2-4553281a6e3f.jpg', 
                    name: 'Mursita Najmudin S.E.', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                },
                {
                    id: '5',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838910/photosp/ec242c0b-e6bd-411f-a6ad-46476779ae28/ec242c0b-e6bd-411f-a6ad-46476779ae28.jpg', 
                    name: 'Indah Mandasari S.IP', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                },
                {
                    id: '6',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1603756909/photosp/371b7901-4b1f-453c-b3fb-ae40efb8f153/371b7901-4b1f-453c-b3fb-ae40efb8f153.jpg', 
                    name: 'Kariman Simanjuntak', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                }
            ]
        },
        {
            id: '10',
            listMapel : [
                { id: '1', title:'Artificial Intelegent' },
                { id: '2', title:'Pemograman Dasar 1' },
                { id: '3', title:'Fisika Diskrit' },
                { id: '4', title:'Bahasa Inggris Lanjutan' },
                { id: '5', title:'Automata' },
                { id: '6', title:'Matematika Lanjutan 2' },
                { id: '7', title:'Bahasa Inggris Lanjutan' },
                { id: '8', title:'Automata' },
            ],
            listMember : [
                {
                    id: '1',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1541223188/photosp/718c0244-c154-478f-bb4a-d54ccf435fc6/718c0244-c154-478f-bb4a-d54ccf435fc6.jpg', 
                    name: 'Asmianto Mustofa', 
                    school: 'School Name',
                    role: 1,
                    role_name: 'Administrator Kelas'
                },
                {
                    id: '2',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1603754014/photosp/69039a17-b3c0-48a4-83e9-05e5318adc44/69039a17-b3c0-48a4-83e9-05e5318adc44.jpg', 
                    name: 'Anastasia Pratiwi ', 
                    school: 'School Name',
                    role: 2,
                    role_name: 'Tutor (Pengampu Mata Pelajaran)'
                },
                {
                    id: '3',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1588714018/photosp/9b3ffbb6-8a31-4480-9ddd-48ddc01f47e8/9b3ffbb6-8a31-4480-9ddd-48ddc01f47e8.jpg', 
                    name: 'Cindy Kuswandari', 
                    school: 'School Name',
                    role: 3,
                    role_name: 'Tutor (Pendamping)'
                },
                {
                    id: '4',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838979/photosp/d201ccb2-d396-4d88-b4d2-4553281a6e3f/d201ccb2-d396-4d88-b4d2-4553281a6e3f.jpg', 
                    name: 'Mursita Najmudin S.E.', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                },
                {
                    id: '5',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838910/photosp/ec242c0b-e6bd-411f-a6ad-46476779ae28/ec242c0b-e6bd-411f-a6ad-46476779ae28.jpg', 
                    name: 'Indah Mandasari S.IP', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                },
                {
                    id: '6',
                    picture: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1603756909/photosp/371b7901-4b1f-453c-b3fb-ae40efb8f153/371b7901-4b1f-453c-b3fb-ae40efb8f153.jpg', 
                    name: 'Kariman Simanjuntak', 
                    school: 'School Name',
                    role: 4,
                    role_name: 'Warga Belajar'
                }
            ]
        },
    ]

    const id = req.params.classId

    const resData = data.map(item => item).filter(item => item.id === id)

    res.status(200).json(resData)
}