import { LOAD_MATERI, DETAIL_MATERI } from '../actions/materiAction'

const initState = {
    listMateri: [],
    detailMateri: {
        id: null,
        isi: null,
        judul: null,
        status: null,
        date_modified: null,
        date_created: null
    },
}

const MateriReducer = (state = initState, actions) => {
    switch (actions.type) {
        case LOAD_MATERI:
            return {
                ...state,
                listMateri: [...actions.listMateri],
            }

        case DETAIL_MATERI:
            return {
                ...state,
                detailMateri: {
                    ...state.detailMateri,
                    ...actions.detailMateri
                }
            }

        default:
            return state;
    }
}

export default MateriReducer