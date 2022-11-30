import React from 'react';
import { Link } from 'react-router-dom';
import './css/Footer.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';

const Footer = () => {
    return (
        <>
            <div className="container-fluid footer d-flex flex-column align-items-center
            justify-content-center">
                <div className="footerDiv mb-3">
                    <div className="row">
                        <div className="categories col-sm-3 offset-sm-1">
                            <h3 className="heading">CATEGORIES</h3>
                            <ul>
                                <li>
                                    <Link to="/" className="footer_links">Men</Link>
                                </li>
                                <li>
                                    <Link to="/" className="footer_links">Women</Link>
                                </li>
                                <li>
                                    <Link to="/" className="footer_links">Shoes</Link>
                                </li>
                                <li>
                                    <Link to="/" className="footer_links">Watches</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="help col-sm-2">
                            <h3 className="heading">HELP</h3>
                            <ul>
                                <li>
                                    <Link to="/" className="footer_links">Track Order</Link>
                                </li>
                                <li>
                                    <Link to="/" className="footer_links">Returns</Link>
                                </li>
                                <li>
                                    <Link to="/" className="footer_links">Shipping</Link>
                                </li>
                                <li>
                                    <Link to="/" className="footer_links">FAQs</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-3" id="contact_sec_in_footer">
                            <h3 className="heading">GET IN TOUCH</h3>
                            <div className="row">
                                <p className="mb-5">Any questions? Let us know in store at Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis, consectetur.</p>                      </div>
                            <div className="row">
                                <div className="col-2 offset-sm-0 offset-3">
                                    <Link to="/" className="footer_icon_link">
                                        <FacebookIcon className="footer_icons" />
                                    </Link>

                                </div>
                                <div className="col-2">
                                    <Link to="/" className="footer_icon_link">
                                        <InstagramIcon className="footer_icons" />
                                    </Link>

                                </div>
                                <div className="col-2">
                                    <Link to="/" className="footer_icon_link">
                                        <YouTubeIcon className="footer_icons" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-2 newsDiv">
                            <h3 className="heading">NEWSLETTER</h3>
                            <div className="row newsletterDiv">
                                <input type="text" placeholder="Enter email" className="p-1 ps-4" />
                                <button className="subscribeBtn btn btn-secondary m-auto mt-5">SUBSCRIBE</button>
                            </div>
                            <div className="row"></div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <p>Copyright ©2022 All rights reserved | This template is made with ♡ by Ankit Bajpai</p>
                </div>
            </div>
        </>
    );
}
export default Footer;