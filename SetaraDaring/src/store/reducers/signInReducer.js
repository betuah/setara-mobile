const initState = {
    isSignIn: false
}

const signInReducer = (state = initState, actions) => {
    switch (actions.type) {
        case 'SIGN_IN':
            return {
                ...state,
                isSignIn: actions.isSignIn
            }
    
        default:
            return state;
    }
}

export default signInReducer