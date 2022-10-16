import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/Login.css';

export default function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        pass: ""
    })
    const [invalidMail, setInvalidMail] = useState()
    const [invalidPass, setInvalidPass] = useState()
    const [submitBtnDisable, setSubmitBtnDisable] = useState(false);
    const [visible, setVisible] = useState(false);
    const loginClicked = () => {
        navigate('/signup');
    }
    const inputEvent = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value });
    }
    const handleSubmission = () => {
        if (!user.email || !user.pass) {
            // alert("Please fill all entries!");
            toast.error("Please fill all details!", {
                position: "top-center",
                theme: "dark"
            });
            return;
        }
        // console.log(user);
        setSubmitBtnDisable(true);
        signInWithEmailAndPassword(auth, user.email, user.pass).then(
            async (res) => {
                setSubmitBtnDisable(false);
                console.log(res);
                navigate('/');
            }).catch((err) => {
                setSubmitBtnDisable(false);
                // console.log("error is", err)
                // alert(err.message)
                if (err.message === "Firebase: Error (auth/invalid-email).")
                    setInvalidMail("The email id is invalid!")
                if (err.message === "Firebase: Error (auth/user-not-found).")
                    setInvalidMail("User not found!")
                if (err.message === "Firebase: Error (auth/wrong-password).")
                    setInvalidPass("Password is incorrect!")
                setTimeout(() => {
                    setInvalidMail()
                    setInvalidPass()
                }, 2000)
            });
        function removeVal() {
            document.querySelectorAll('input').forEach(element => {
                element.value = "";
            });
        }
        if (!setInvalidMail && !setInvalidPass)
            setTimeout(removeVal, 500);
    }
    const visibleClicked = () => {
        setVisible(true);
    }
    const notVisibleClicked = () => {
        setVisible(false);
    }
    return (
        <>
            <div className="loginSec">
                <div className='loginDiv'>
                    <div className="loginFormDiv">
                        <label>Email</label>
                        <input type="text" onChange={inputEvent} name="email" />
                        <span className="errorMsg text-danger fw-semibold d-block">{invalidMail}</span>
                        <label>Password</label>
                        <input type={visible ? "text" : "password"} onChange={inputEvent} name="pass" className="password" />
                        {visible ?
                            <VisibilityOffIcon className="visibilityIcon" onClick={notVisibleClicked} />
                            :
                            <VisibilityIcon className="visibilityIcon" onClick={visibleClicked} />
                        }
                        <span className="errorMsg text-danger fw-semibold d-block">{invalidPass}</span>
                        <button className="btn btn-success w-100 loginPageBtn" onClick={handleSubmission} disabled={submitBtnDisable}>Login</button>
                        <div className="text-center not_has_account">
                            <span>Need an account? </span>
                            <button className="btn text-success mb-2" onClick={loginClicked} >Signup</button>
                        </div>
                    </div>
                </div>
            </div >
            <ToastContainer />
        </>
    )
}
