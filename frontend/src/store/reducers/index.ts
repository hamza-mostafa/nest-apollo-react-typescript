const defaultState = {
    id: 0,
    name: '',
    email: "fake@email.com",
    token: ''
}


const userReducer = (state: User = defaultState, action: UserAction): User => {
    switch (action.type) {
        case 'USER_SAVE':
            return Object.assign({}, state, {user: action.user})
        default:
            return state
    }
}

export default userReducer
