import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Error.css';

function Error() {
    const navigate = useNavigate();
    const homeBtnClicked = () => {
        navigate('/');
    }
    const contactBtnClicked = () => {
        navigate('/contact');
    }
    return (
        <div className="errorDiv mt-5 row">
            <div className="page_not_found col-md-5 offset-lg-1 d-flex flex-column align-items-center">
                <h1 className="head-1 display-1">Oops!</h1>
                <h1 className="head-2 second display-1 fw-bold">404</h1>
                <h1 className="head-3 display-2 fw-semibold">Page not found</h1>
                <div className="row">
                    <button className="errorBtn col-4 offset-1 btn" onClick={homeBtnClicked}>Back to home</button>
                    <button className="errorBtn col-4 offset-2 btn" onClick={contactBtnClicked}>Contact Us</button>
                </div>
            </div>
        </div>
    )
}

export default Error;
