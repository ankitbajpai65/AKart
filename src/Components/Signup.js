import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from './firebase';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const navigate = useNavigate();
    const [invalidMail, setInvalidMail] = useState()
    const [invalidPass, setInvalidPass] = useState()
    const [user, setUser] = useState({
        fullname: "",
        email: "",
        pass: ""
    })
    const [submitBtnDisable, setSubmitBtnDisable] = useState(false);
    const [visible, setVisible] = useState(false);
    const loginClicked = () => {
        navigate('/login');
    }
    const inputEvent = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        // console.log(name, value);
        setUser({ ...user, [name]: value });
    }
    const handleSubmission = () => {
        if (!user.fullname || !user.email || !user.pass) {
            // alert("Please fill all entries!");
            toast.error("Please fill all details!", {
                position: "top-center",
                theme: "dark"
            });
            return;
        }
        console.log(user);
        setSubmitBtnDisable(true);
        createUserWithEmailAndPassword(auth, user.email, user.pass).then(
            async (res) => {
                setSubmitBtnDisable(false);
                const x = res.user;
                await updateProfile(x, {
                    displayName: user.fullname
                })
                console.log(res);
                navigate('/');
            }).catch((err) => {
                setSubmitBtnDisable(false);
                // console.log("error is", err)
                // alert(err.message);
                if (err.message === "Firebase: Error (auth/invalid-email).")
                    setInvalidMail("The email id is invalid!")
                if (err.message === "Firebase: Error (auth/email-already-in-use).")
                    setInvalidMail("Email already in use!")
                if (err.message === "Firebase: Password should be at least 6 characters (auth/weak-password).")
                    setInvalidPass("Password should be at least 6 characters!")
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
                        <label>Name</label>
                        <input type="text" onChange={inputEvent} name="fullname" />
                        <label>Email</label>
                        <input type="text" onChange={inputEvent} name="email" />
                        <span className="errorMsg text-danger fw-semibold d-block">{invalidMail}</span>
                        <label>Password</label>
                        <input type={visible ? "text" : "password"} onChange={inputEvent} name="pass" />
                        <span className="errorMsg text-danger fw-semibold d-block">{invalidPass}</span>
                        {visible ?
                            <VisibilityOffIcon className="vIcon" onClick={notVisibleClicked} />
                            :
                            <VisibilityIcon className="vIcon" onClick={visibleClicked} />
                        }
                        <button className="btn btn-success w-100 loginPageBtn" onClick={handleSubmission} disabled={submitBtnDisable}>Signup</button>
                        <div className="text-center not_has_account">
                            <span>Already have an account? </span>
                            <button className="btn text-success mb-2" onClick={loginClicked}>Login</button>
                        </div>
                    </div>
                </div>
            </div >
            <ToastContainer />
        </>
    );
}

export default Signup;
