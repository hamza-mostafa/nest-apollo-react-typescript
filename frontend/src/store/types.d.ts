type User =  {
    id: number,
    email: string,
    token: string,
    name: string
}

type SaveUserAction = {
    type: string,
    user: User
}

type UserAction = SaveUserAction
