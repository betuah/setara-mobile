import { LOAD_TUGAS, DETAIL_TUGAS, ADD_TUGAS } from '../actions/tugasAction'

const initState = {
    listTugas: [],
    detailTugas: null,
}

const TugasReducer = (state = initState, actions) => {
    switch (actions.type) {
        case LOAD_TUGAS:
            return {
                ...state,
                listTugas: [...actions.listTugas],
            }

        case DETAIL_TUGAS:
            return {
                ...state,
                detailTugas: {
                    ...state.detailTugas,
                    ...actions.detailTugas
                }
            }
        
        case ADD_TUGAS:
            return {
                ...state,
                detailTugas: {
                    ...state.detailTugas,
                    ...actions.data
                }
            }

        default:
            return state;
    }
}

export default TugasReducer