import { SettingsSystemDaydreamTwoTone } from '@material-ui/icons';
import React, { useState } from 'react';
import './css/Contact.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
    const [name, setName] = useState(false);
    const [email, setEmail] = useState(false);
    const [msg, setMsg] = useState(false);
    const [detail, setDetail] = useState({
        fullname: "",
        email: "",
        message: ""
    });
    const inputEvent = (event) => {
        // console.log(event.target.value);
        // console.log(event.target.name);
        const value = event.target.value;
        const name = event.target.name;
        // setDetail((prev) => {
        //     return {
        //         ...prev,
        //         [name]: value
        //     }
        // })
        setDetail({ ...detail, [name]: value });
    }
    const validateName = () => {
        let reg1 = /^[a-zA-Z ]+$/;
        if (!reg1.test(detail.fullname)) {
            setName(true);
            return false;
        } else {
            if (detail.fullname.length <= 2) {
                setName(true)
                return false;
            }
        }
        setName(false);
    }
    const validateMail = () => {
        let reg2 = /^[a-zA-Z0-9._]+@+[a-zA-Z0-9._]+\.[a-zA-Z]{2,4}$/;
        if (!reg2.test(detail.email)) {
            setEmail(true);
            return false;
        }
        setEmail(false);
    }
    const validateMsg = () => {
        if (detail.message.length == "") {
            setMsg(true);
            return false;
        }
        setMsg(false);
    }
    const validate = (event) => {
        event.preventDefault();

        if (name || email || msg) {
            toast.error("Please fill correct details!", {
                position: "top-center",
                theme: "dark"
            });
            return false;
        }
        toast.success("Your form has been submitted successfully!", {
            position: "top-center",
            theme: "dark"
        });
        function removeVal() {
            document.querySelectorAll('.details').forEach(element => {
                element.value = "";
            });
        }
        setTimeout(removeVal, 500);
        setName(false);
        setEmail(false);
        setMsg(false);
        setDetail(null);
    }
    return (
        <>
            <div className="contact">
                <div className="container-fluid contactDiv d-flex align-items-center justify-content-center">
                    <h1>Contact Us</h1>
                </div>
                <div id="formDiv" className="d-flex flex-column justify-content-center align-items-center">
                    <form action="" onSubmit={validate} className="form container">
                        {name && <span className="errorMsg row mb-3">Must hold alphabets only and length should be greater than 2</span>}
                        <input type="text" id="name" className={`${name ? 'ankit details input row' : 'row details input'}`} onChange={inputEvent} onBlur={validateName} name="fullname" placeholder="Enter name" />

                        {email && <span className="errorMsg row mb-3">Please enter valid email!</span>}
                        <input type="" id="email" className="details input row" onChange={inputEvent} onBlur={validateMail} name="email" placeholder="Enter email" />

                        {msg && <span className="errorMsg row mb-3">Message is required!</span>}
                        <textarea rows="5" cols="20" id="message" className="details row" onChange={inputEvent} onBlur={validateMsg} name="message" placeholder="Your message" />

                        <button className="btn btn-secondary">Submit</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
export default Contact;