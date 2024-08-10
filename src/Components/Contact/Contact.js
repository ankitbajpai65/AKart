import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../firebase";
import "./Contact.css";

const Contact = () => {
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [detail, setDetail] = useState({
    fullname: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setDetail((prevDetail) => ({
          ...prevDetail,
          fullname: user.displayName || "",
          email: user.email || "",
        }));
      }
    });
  }, []);

  const inputEvent = (event) => {
    const { name, value } = event.target;
    setDetail((prevDetail) => ({ ...prevDetail, [name]: value }));
  };

  const validateName = () => {
    const reg1 = /^[a-zA-Z ]+$/;
    if (!reg1.test(detail.fullname) || detail.fullname.length <= 2) {
      setErrors((prevErrors) => ({ ...prevErrors, name: true }));
      return false;
    }
    setErrors((prevErrors) => ({ ...prevErrors, name: false }));
    return true;
  };

  const validateMail = () => {
    const reg2 = /^[a-zA-Z0-9._]+@+[a-zA-Z0-9._]+\.[a-zA-Z]{2,4}$/;
    if (!reg2.test(detail.email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: true }));
      return false;
    }
    setErrors((prevErrors) => ({ ...prevErrors, email: false }));
    return true;
  };

  const validateMsg = () => {
    if (detail.message.length === 0) {
      setErrors((prevErrors) => ({ ...prevErrors, message: true }));
      return false;
    }
    setErrors((prevErrors) => ({ ...prevErrors, message: false }));
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateMail();
    const isMessageValid = validateMsg();

    if (isNameValid && isEmailValid && isMessageValid) {
      try {
        const res = await fetch(
          "https://e-commerce-website-a04e4-default-rtdb.firebaseio.com/contactForm.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(detail),
          }
        );

        const data = await res.json();
        console.log(data);

        if (res.ok) {
          toast.success("Your form has been submitted successfully!", {
            position: "top-center",
            theme: "dark",
          });
          setDetail({ fullname: "", email: "", message: "" });
        } else {
          throw new Error("Failed to submit");
        }
      } catch (error) {
        toast.error("Submission failed. Please try again.", {
          position: "top-center",
          theme: "dark",
        });
      }
    } else {
      toast.error("Please fill all details correctly!", {
        position: "top-center",
        theme: "dark",
      });
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
          <form className="form container" onSubmit={handleSubmit}>
            {errors.name && (
              <span className="errorMsg row mb-3">
                Must hold alphabets only and length should be greater than 2
              </span>
            )}
            <input
              type="text"
              id="name"
              className={`details input row ${
                errors.name ? "notifyError" : ""
              }`}
              onChange={inputEvent}
              onBlur={validateName}
              name="fullname"
              value={detail.fullname}
              placeholder="Enter name"
            />

            {errors.email && (
              <span className="errorMsg row mb-3">
                Please enter valid email!
              </span>
            )}
            <input
              type="text"
              id="email"
              className={`details input row ${
                errors.email ? "notifyError" : ""
              }`}
              onChange={inputEvent}
              onBlur={validateMail}
              name="email"
              value={detail.email}
              placeholder="Enter email"
            />

            {errors.message && (
              <span className="errorMsg row mb-3">Message is required!</span>
            )}
            <textarea
              rows="3"
              cols="20"
              id="message"
              className={`details row ${errors.message ? "notifyError" : ""}`}
              onChange={inputEvent}
              onBlur={validateMsg}
              name="message"
              value={detail.message}
              placeholder="Your message"
            />

            <button className="btn btn-secondary" type="submit">
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
