import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';

const Signup = () => {
    let navigate = useNavigate();
    const loginClicked = () => {
        navigate('/login');
    }
    return (
        <div className="loginSec">
            <div className='loginDiv'>
                <div className="loginFormDiv">
                    <label>Name</label>
                    <input type="text" />
                    <label>Email</label>
                    <input type="text" />
                    <label>Password</label>
                    <input type="text" />
                    <button className="btn btn-success w-100 loginPageBtn">Signup</button>
                    <div className="text-center not_has_account">
                        <span>Already have an account? </span>
                        <button className="btn text-success mb-2" onClick={loginClicked}>Login</button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Signup;
