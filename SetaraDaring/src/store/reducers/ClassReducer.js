import { LOAD_CLASS, DETAIL_CLASS } from '../actions/classAction'

const initState = {
    listClass: [],
    detailClass: {
        details: {},
        listMapel: [],
        listMember: []
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
                    details: {...actions.detailClass.details},
                    listMapel: [...actions.detailClass.listMapel],
                    listMember: [...actions.detailClass.listMember],
                }
            }

        default:
            return state;
    }
}

export default ClassReducer