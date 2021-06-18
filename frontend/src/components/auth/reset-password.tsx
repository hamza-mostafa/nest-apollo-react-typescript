import React from 'react';
import {handleInputChange, submitAction} from "../../helpers/misc";
import {useHistory, useParams} from "react-router-dom";
import {gql, useMutation} from "@apollo/client";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {saveUser} from "../../store/actions";

interface resetPasswordObject {
    email: string,
    password: string,
    token: string
}

let resetPasswordData: resetPasswordObject = {
    email: '',
    password: '',
    token: ''
}

const RESET_PASSWORD_MUTATION = gql`
    mutation RegisterMutation($resetPasswordData: ResetPasswordInputType!){
        resetPassword(resetPasswordData: $resetPasswordData){
            id
            token
            name
            email
        }
    }
`

const ResetPassword = () => {
    resetPasswordData.token = (useParams() as resetPasswordObject).token
    let [resetPassword, { loading: resetPasswordLoading, error: resetPasswordError , data }] = useMutation(RESET_PASSWORD_MUTATION);
    let history = useHistory();

    const dispatch = useDispatch();
    const state = useSelector((state: any) => state)

    if (resetPasswordLoading) {
        toast('Loading ...')
    };
    if (resetPasswordError) {
        toast(resetPasswordError.message)
    }
    if(data){
        localStorage.setItem('token', data.resetPassword.token);
        if(!state.user.token){
            dispatch(saveUser(data.resetPassword))
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
                          await submitAction(e, resetPasswordData, 'resetPasswordData', resetPassword)
                          history.push('/posts')
                      }}
                >
                <span className="login100-form-title">
                    Reset your password
                </span>

                    <div id='email-validation' className="wrap-input100">
                        <input className="input100" type="text" name="email" placeholder="Email" onBlur={(e) => handleInputChange(e, resetPasswordData)}/>
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
                    </div>

                    <div className="wrap-input100">
                        <input className="input100" type="password" name="password" placeholder="Password" onBlur={(e) => handleInputChange(e, resetPasswordData)}/>
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
                    </div>

                    <div className="wrap-input100">
                        <input className="input100" type="password" name="repeat-password" placeholder="Repeat Password"  onBlur={(e) => handleInputChange(e, resetPasswordData)}/>
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
                    </div>


                    <div className="container-login100-form-btn">
                        <button className="login100-form-btn">
                            Reset Password
                        </button>
                    </div>


                    <div className="text-center p-t-136">
                        remembered your old password?
                        <p></p>
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
    
export default ResetPassword;
