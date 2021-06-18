export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(<string>localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}
