import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';

export default function Login() {
    let navigate = useNavigate();
    const signupClicked = () => {
        navigate('/signup');
    }
    return (
        <div className="loginSec">
            <div className='loginDiv'>
                <div className="loginFormDiv">
                    <label>Email</label>
                    <input type="text" />
                    <label>Password</label>
                    <input type="text" />
                    <button className="btn btn-success w-100 loginPageBtn">Login</button>
                    <div className="text-center not_has_account">
                        <span>Need an account? </span>
                        <button className="btn text-success mb-2" onClick={signupClicked}>Signup</button>
                    </div>
                </div>
            </div>
        </div >
    )
}
