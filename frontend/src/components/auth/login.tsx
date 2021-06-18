import React from 'react';
import {gql, useMutation} from "@apollo/client";
import { toast } from 'react-toastify';
import {handleInputChange, submitAction} from "../../helpers/misc";
import {useDispatch, useSelector} from "react-redux";
import {saveUser} from "../../store/actions";
import {Redirect, useHistory} from "react-router-dom";

interface loginObject {
    email: string,
    password: string
}

let loginData: loginObject = {
        email: '',
        password: ''
    }
const LOGIN_MUTATION = gql`
    mutation LoginMutation($loginData: LoginUserInputType!){
        login(loginData: $loginData){
            id
            token
            name
            email
        }
    }
`

const Login = () => {

    let [login, { loading: loginLoading, error: loginError , data }] = useMutation(LOGIN_MUTATION);
    const dispatch = useDispatch();
    const state = useSelector((state: any) => state)
    let history = useHistory();

    if (loginLoading) {
        toast('Loading ...')
    };
    if (loginError) {
        toast(loginError.message)
    }

    if(data){
        localStorage.setItem('token', data.login.token);
        if(!state.user.token){
            dispatch(saveUser(data.login))
        }
    }

    return (
        <>
            <div className="wrap-login100">
                <div className="login100-pic js-tilt" data-tilt>
                    <img src="/images/img-01.png" alt="IMG"/>
                </div>

                <form id="login-form"
                    className="login100-form validate-form"
                      onSubmit={async (e) => {
                          await submitAction(e, loginData, 'loginData', login)

                          history.push('/posts')
                      }}
                >
					<span className="login100-form-title">
						Member Login
					</span>

                    <div id='email-validation' className="wrap-input100">
                        <input className="input100" type="text" name="email" placeholder="Email" onBlur={(e) => handleInputChange(e, loginData)}/>
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
                    </div>

                    <div className="wrap-input100">
                        <input className="input100" type="password" name="password" placeholder="Password"  onBlur={(e) => handleInputChange(e, loginData)}/>
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
                    </div>


                    <div className="container-login100-form-btn">
                        <button className="login100-form-btn">
                            Login
                        </button>
                    </div>

                    <div className="text-center p-t-12">
						<span className="txt1">
							Forgot
						</span>
                        <a className="txt2" href="/forget-password">
                            Username / Password?
                        </a>
                    </div>

                    <div className="text-center p-t-136">
                        <a className="txt2" href="/register">
                            Create your Account
                            <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                        </a>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;

