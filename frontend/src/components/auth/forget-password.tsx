import React from 'react';
import {gql, useMutation} from "@apollo/client";
import {handleInputChange, submitAction} from "../../helpers/misc";
import {toast} from "react-toastify";
import {Redirect} from "react-router-dom";



interface forgetPasswordObject {
    email: string
}

let forgetPasswordData: forgetPasswordObject = {
    email: ''
}

let linker: string = ''

const FORGET_PASSWORD_MUTATION = gql`
    mutation ForgetPasswordMutation($forgetPasswordData: ForgetPasswordInputType!){
        forgetPassword(forgetPasswordData: $forgetPasswordData)
    }
`

const ForgetPassword = () => {
    let [forgetPassword, { loading: forgetPasswordLoading, error: forgetPasswordError , data }] = useMutation(FORGET_PASSWORD_MUTATION);

    if (forgetPasswordLoading) {
        toast('Loading ...')
    }
    if (forgetPasswordError) {
        toast(forgetPasswordError.message)
    }
    if(data){
        linker = data.forgetPassword
    }

    const linkGeneration = () => {
        if(linker){
            toast('imagine you received an email')
            return <a className="wrap-input100" href={linker}>reset with this link</a>
        }else{
            return ''
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
                          await submitAction(e, forgetPasswordData, 'forgetPasswordData', forgetPassword)
                          return
                          return <Redirect to="/posts" />
                      }}
                >
                <span className="login100-form-title">
                    Reset your password
                </span>

                    <div className="wrap-input100 validate-input"
                         data-validate="Valid email is required: ex@abc.xyz">
                        <input className="input100" type="text" name="email" placeholder="Email" onBlur={(e) => handleInputChange(e, forgetPasswordData)}/>
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
                    </div>


                    <div className="container-login100-form-btn">
                        <button className="login100-form-btn">
                            send reset email
                        </button>
                    </div>

                    <div className="text-center p-t-136">
                    {linkGeneration()}

                    </div>
                </form>
            </div>
        </>
    );
};
    
export default ForgetPassword;
