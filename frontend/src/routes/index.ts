import Register from "../components/auth/register";
import ResetPassword from "../components/auth/reset-password";
import Home from "../components/home";
import Login from "../components/auth/login";
import ForgetPassword from "../components/auth/forget-password";
import Posts from "../components/posts";

const routes = [
    { path: '/', component: Home },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/reset-password/token/:token', component: ResetPassword},
    { path: '/forget-password', component: ForgetPassword },
    { path: '/posts', component: Posts }
];

export default routes;
