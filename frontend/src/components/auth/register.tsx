import React from 'react';
import {handleInputChange, submitAction} from "../../helpers/misc";
import {toast} from "react-toastify";
import {gql, useMutation} from "@apollo/client";
import {saveUser} from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import  {useHistory} from "react-router-dom";


interface registerObject {
    email: string,
    password: string,
    name: string
}

let registerData: registerObject = {
    email: '',
    password: '',
    name: ''
}

const REGISTER_MUTATION = gql`
    mutation RegisterMutation($registerData: RegisterUserInputType!){
        register(registerData: $registerData){
            id
            token
            name
            email
        }
    }
`

const Register = () => {
    let [register, { loading: registerLoading, error: registerError , data }] = useMutation(REGISTER_MUTATION);
    const dispatch = useDispatch();
    const state = useSelector((state: any) => state)
    let history = useHistory();

    if (registerLoading) {
        toast('Loading ...')
    };
    if (registerError) {
        toast(registerError.message)
    }
    if(data){
        localStorage.setItem('token', data.register.token);
        if(!state.user.token){
            dispatch(saveUser(data.register))
        }
    }


    return (
            <>
                <div className="wrap-login100">
                    <div className="login100-pic js-tilt" data-tilt>
                        <img src="/images/img-01.png" alt="IMG"/>
                    </div>

                    <form className="login100-form validate-form"
                      onSubmit={async (e) => {
                          await submitAction(e, registerData, 'registerData', register)

                          history.push('/posts')
                      }}
                    >
					<span className="login100-form-title">
						Member Login
					</span>


                        <div id='email-validation' className="wrap-input100">
                            <input className="input100" type="text" name="name" placeholder="Your name" onBlur={(e) => handleInputChange(e, registerData)}/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
                        </div>


                        <div id='email-validation' className="wrap-input100">
                            <input className="input100" type="text" name="email" placeholder="Email" onBlur={(e) => handleInputChange(e, registerData)}/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
                        </div>

                        <div className="wrap-input100">
                            <input className="input100" type="password" name="password" placeholder="Password" onBlur={(e) => handleInputChange(e, registerData)}/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
                        </div>

                        <div className="wrap-input100">
                            <input className="input100" type="password" name="repeat-password" placeholder="Repeat Password"  onBlur={(e) => handleInputChange(e, registerData)}/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
                        </div>


                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn">
                                Register
                            </button>
                        </div>


                        <div className="text-center p-t-136">
                        <span className="txt1">
							Have an account?
						</span>
                            <a className="txt2" href="/login">
                                Login
                                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                            </a>
                        </div>
                    </form>
                </div>
            </>
    );
};
    
export default Register;
