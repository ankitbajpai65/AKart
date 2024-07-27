import React, { useState, useEffect } from "react";
import "./Contact.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../firebase";

const Contact = () => {
  const [name, setName] = useState(false);
  const [email, setEmail] = useState(false);
  const [msg, setMsg] = useState(false);
  const [detail, setDetail] = useState({
    fullname: "",
    email: "",
    message: "",
  });

  // trying to autofill name and email if user is in login state.
  // useEffect(() => {
  //     auth.onAuthStateChanged((user) => {
  //         console.log(user);
  //         if (user) {
  //             detail.fullname = user.displayName;
  //             detail.email = user.email;
  //         }
  //     })
  // })

  const inputEvent = (event) => {
    // console.log(event.target.name, event.target.value);
    const value = event.target.value;
    const name = event.target.name;
    // setDetail((prev) => {
    //     return {
    //         ...prev,
    //         [name]: value
    //     }
    // })
    setDetail({ ...detail, [name]: value });
  };

  const validateName = () => {
    let reg1 = /^[a-zA-Z ]+$/;
    if (!reg1.test(detail.fullname)) {
      setName(true);
      return false;
    } else {
      if (detail.fullname.length <= 2) {
        setName(true);
        return false;
      }
    }
    setName(false);
  };

  const validateMail = () => {
    let reg2 = /^[a-zA-Z0-9._]+@+[a-zA-Z0-9._]+\.[a-zA-Z]{2,4}$/;
    if (!reg2.test(detail.email)) {
      setEmail(true);
      return false;
    }
    setEmail(false);
  };

  const validateMsg = () => {
    if (detail.message.length == "") {
      setMsg(true);
      return false;
    }
    setMsg(false);
  };

  const postData = async (event) => {
    event.preventDefault();
    const { fullname, email, message } = detail;
    if (fullname && email && message) {
      const res = await fetch(
        "https://e-commerce-website-a04e4-default-rtdb.firebaseio.com/contactForm.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname,
            email,
            message,
          }),
        }
      );
      toast.success("Your form has been submitted successfully!", {
        position: "top-center",
        theme: "dark",
      });
      function removeVal() {
        document.querySelectorAll(".details").forEach((element) => {
          element.value = "";
        });
      }
      setTimeout(removeVal, 500);
      setDetail(null);
    } else {
      toast.error("Please fill all details!", {
        position: "top-center",
        theme: "dark",
      });
      return false;
    }
  };

  return (
    <>
      <div className="contact">
        <div className="container-fluid contactDiv d-flex align-items-center justify-content-center">
          <h1>Contact Us</h1>
        </div>
        <div
          id="formDiv"
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <form action="" className="form container" method="POST">
            {name && (
              <span className="errorMsg row mb-3">
                *Must hold alphabets only and length should be greater than 2
              </span>
            )}
            <input
              type="text"
              id="name"
              className={`${
                name ? "notifyError details input row" : "details input row"
              }`}
              onChange={inputEvent}
              onBlur={validateName}
              name="fullname"
              placeholder="Enter name"
            />

            {email && (
              <span className="errorMsg row mb-3">
                *Please enter valid email!
              </span>
            )}
            <input
              type=""
              id="email"
              className="details input row"
              onChange={inputEvent}
              onBlur={validateMail}
              name="email"
              placeholder="Enter email"
            />

            {msg && (
              <span className="errorMsg row mb-3">*Message is required!</span>
            )}
            <textarea
              rows="5"
              cols="20"
              id="message"
              className="details row"
              onChange={inputEvent}
              onBlur={validateMsg}
              name="message"
              placeholder="Your message"
            />

            <button className="btn btn-secondary" onClick={postData}>
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default Contact;
