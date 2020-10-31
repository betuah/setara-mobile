const signinConstrains = {
    uname: {
        presence: {
            allowEmpty: false,
            message: "^Username tidak boleh kosong."
        }
    },
    password: {
        presence: {
            allowEmpty: false,
            message: "^Password tidak boleh kosong."
        }
    }
}

const signupWbConstrains = {
    uname: {
        presence: {
            allowEmpty: false,
            message: "^Username tidak boleh kosong."
        }
    },
    password: {
        presence: {
            allowEmpty: false,
            message: "^Password tidak boleh kosong."
        },
        length: {
            minimum: 8,
            message: '^Password harus memiliki minimal 8 karakter.'
        }
    },
    kode_kelas: {
        presence: {
            allowEmpty: false,
            message: "^Kode kelas tidak boleh kosong."
        }
    },
    name: {
        presence: {
            allowEmpty: false,
            message: "^Nama lengkap tidak boleh kosong."
        }
    },
    confirmPass: {
        presence: {
            allowEmpty: false,
            message: "^Konformasi password tidak boleh kosong."
        }
    }
}

const signupTutorConstrains = {
    uname: {
        presence: {
            allowEmpty: false,
            message: "^Username tidak boleh kosong."
        }
    },
    password: {
        presence: {
            allowEmpty: false,
            message: "^Password tidak boleh kosong."
        },
        length: {
            minimum: 8,
            message: '^Password harus memiliki minimal 8 karakter.'
        }
    },
    email: {
        presence: {
            allowEmpty: false,
            message: '^Email tidak boleh kosong.'
        },
        email: {
            message: '^Format Email Anda salah.'
        }
    },
    name: {
        presence: {
            allowEmpty: false,
            message: "^Nama lengkap tidak boleh kosong."
        }
    },
    confirmPass: {
        presence: {
            allowEmpty: false,
            message: "^Konformasi password tidak boleh kosong."
        }
    }
}

export { signinConstrains, signupWbConstrains, signupTutorConstrains }