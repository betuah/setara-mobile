export const LOAD_DATA = 'LOAD_DATA';
export const UPDATE_DATA = 'UPDATE_DATA';

export const initData = () => {
    return async dispatch => {
        const data = {
            profile: {
                id: 'sad23fwdf23f',
                foto: 'http://setara.kemdikbud.go.id/media/Assets/foto/aa61ff1b9_0110202020015.jpg',
                username: 'betuah@seamolec.org',
                nama: 'Betuah Anugerah',
                email: 'betuah@seamolec.org',
                jk: 'Laki - Laki',
                sekolah: 'SEAMEO SEAMOLEC',
                facebook: 'betuah.anugerah',
                website: 'betuah.com',
                linkedin: 'betuah',
                twitter: '@betuahRIPSN',
                kota: 'Bogor',
                provinsi: 'Jawa Barat'
            },
            settings: {}
        }

        setTimeout(() => {
            dispatch({
                type: LOAD_DATA,
                profile: data.profile,
                settings: data.settings
            })
        }, 3000);
    }
}

export const updateData = data => {
    return async dispatch => {
        dispatch({
            type: UPDATE_DATA,
            profile: data
        })
    }
}