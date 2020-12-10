const Error = err => {
    const errRes = err.response ? err.response.data : false

    if (errRes.code) {
        switch (errRes.code) {
            case 'ERR_INCORRECT_USER_PASS':
                throw('Sepertinya username atau password kamu ada yang salah.')
            case 'INCORRECT_USER_PASS':
                throw('Sepertinya username atau password kamu ada yang salah. Coba lagi dengan teliti ya.')
            case 'ERR_KELAS_NOT_EXIST':
                throw('Kode kelas yang kamu masukan tidak terdaftar.')
            case 'ERR_USER_EXIST':
                throw('Username tersebut sudah terdaftar. Silahkan ganti username atau masuk dengan username tersebut.')
            case 'ERR_REGISTER':
                throw('Mohon maaf pendaftaran gagal. Silahkan ulangi kembali beberapa saat lagi ya!')
            case 'ERR_BAD_REQUEST':
                throw('Mohon maaf sepertinya terjadi kesalahan pada applikasi. Kamu bisa menghubungi Admin untuk mendapatkan bantuan.')
            case 'ERR_GENERATE_TOKEN':
                throw(errRes.code)
            case 'ERR_CLASS_NOT_FOUND':
                throw('Kelas dengan kode tersebut tidak ditemukan.')
            case 'ERR_ALREADY_JOIN_CLASS':
                throw('Sepertinya kamu sudah pernah bergabung dengan kelas tersebut.')
            case 'ERR_MATERI_NOT_FOUND':
                throw('Materi tersebut tidak ditemukan.')
            default:
                throw(errRes.message)
        }
    } else if (errRes.message) {
        throw(errRes.message)
    }
    throw('Sepertinya kamu tidak terhubung ke Server. Periksa kembali jaringan internet kamu ya.')
}

export default Error;