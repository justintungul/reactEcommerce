const initialState = {
    user: {
        firstName: '',
        id: '',
        isLoggedIn: false
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER':
            return {
                ...state,
                user: action.user
            };
        case 'LOGOUT_USER':
            return {
                ...state,
                user: {}
            };
        default:
            return state;
    }
}