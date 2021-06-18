
export function saveUser(user: User): SaveUserAction {
    return {
        type: 'SAVE_USER',
        user
    }
}
