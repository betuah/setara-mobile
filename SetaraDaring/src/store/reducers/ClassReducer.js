import { LOAD_CLASS, DETAIL_CLASS } from '../actions/classAction'

const initState = {
    listClass: [],
    detailClass: {
        id: null,
        name: null,
        code: null,
        about: null,
        listMapel: [],
        listMembers: []
    },
}

const ClassReducer = (state = initState, actions) => {
    switch (actions.type) {
        case LOAD_CLASS:
            return {
                ...state,
                listClass: [...actions.listClass],
            }

        case DETAIL_CLASS:
            return {
                ...state,
                detailClass: {
                    ...state.detailClass,
                    ...actions.detailClass,
                }
            }

        default:
            return state;
    }
}

export default ClassReducer