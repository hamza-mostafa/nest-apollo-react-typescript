import React from "react";
import {comparePasswordValidation, emailValidation, nameValidation, passwordValidation} from "./validation";
import {toast} from "react-toastify";

export const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, data: any): void | boolean => {
    switch (e.target.name) {
        case "name":
            if(!nameValidation(e.target.value)){
                toast('please enter a valid name')
                return false
            }else{
                data.name = e.target.value;
            }
            break;
        case "email":
            if(!emailValidation(e.target.value)){
                toast('please check the email')
                return false
            }else{
                data.email = e.target.value;
            }
            break;
        case "password":
            if(!passwordValidation(e.target.value)){
                toast('password between 3 and 15')
                return false
            }else{
                data.password = e.target.value
            }
            break;
        case "repeat-password":
            if(!comparePasswordValidation(e.target.value, data.password)){
                toast('passwords should match')
                return false
            }
            break;
    }

};

export const submitAction = async(e: React.FormEvent<HTMLFormElement>, queryData: any, dataKey: string, cb: Function): Promise<void> => {
    e.preventDefault();
    try {
        let variables: any = {}
        variables[dataKey] = queryData
        await cb({ variables });
    } catch (e) {
        console.error(e.message)
    }

    (e.target as HTMLFormElement).reset()
}
