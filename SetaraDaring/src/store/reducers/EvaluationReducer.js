import { LOAD_QUIZ, DETAIL_QUIZ, LOAD_SOAL, FLUSH_SOAL, SAVE_JAWABAN, SET_JAWABAN, ANS_EXIST } from '../actions/evaluationAction'

const initState = {
    listQuiz: [],
    detailQuiz: null,
    soalItem: null,
    jawaban: [],
    nilai: null,
    isAnsExist: false,
}

const EvaluationReducer = (state = initState, actions) => {
    switch (actions.type) {
        case LOAD_QUIZ:
            return {
                ...state,
                listQuiz: [...actions.listQuiz],
            }

        case DETAIL_QUIZ:
            return {
                ...state,
                detailQuiz: {
                    ...state.detailQuiz,
                    ...actions.detailQuiz
                },
                isAnsExist: actions.isAnsExist,
            }

        case LOAD_SOAL:
            return {
                ...state,
                soalItem: actions.detailSoal,
                jawaban: actions.detailSoal.soal.map(itm => { 
                    return { 
                        id_soal: itm.id_soal, 
                        id_opsi: ''
                    }
                }),
                nilai: null,
            }
        
        case FLUSH_SOAL:
            return {
                ...state,
                soalItem: null,
                isAnsExist: false,
            }
        
        case SET_JAWABAN:
            return {
                ...state,
                jawaban: [...actions.answers]
            }
        
        case SAVE_JAWABAN:
            return {
                ...state,
                soalItem: null,
                jawaban: [],
                nilai: actions.nilai,
                isAnsExist: false,
            }

        case ANS_EXIST:
            return {
                ...state,
                isAnsExist: actions.isAnsExist
            }

        default:
            return state;
    }
}

export default EvaluationReducer