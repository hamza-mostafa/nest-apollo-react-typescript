import React from 'react';
import { Link } from 'react-router-dom';


const style = {
    alignItems: 'center',
    justifyContent: 'center'
}

const Home = () => {
    return (
    <div className="wrap-login100" style={{paddingTop: '33px'}}>
        <h1 style={style}>Hello!</h1>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/forget-password">Forgot Password</Link>
    </div>
    );
};
    
export default Home;
