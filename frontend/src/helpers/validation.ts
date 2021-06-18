export const emailValidation = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const nameValidation = (name: string) => {
    const re = /\w+/;
    return re.test(String(name).toLowerCase());
}

export const passwordValidation = (password: string) => {
    return password.length >= 3 && password.length <= 15
}

export const comparePasswordValidation = (password: string, repeat: string) => {
    return password === repeat
}
