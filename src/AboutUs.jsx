import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <div className="animated fadeInDown">
            <br />
            <br />
            <br />
            <section className="about">
                <div className="container">
                    <div className="ro">
                        <img
                            src="../../images/mac.jpg"
                            alt="mac-change-logo"
                            className="center-block"
                        />
                        <div className="col-xs-8 col-xs-offset-2">
                            <hr />
                            <h1 className="text-center">MAC Tutoring</h1>
                            <div className="col-md-offset-2 col-md-8 mx-auto text-center">
                                <p>
                                    We connect students with college students
                                    for tutoring!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="who-we-are">
                <div className="container">
                    <h2 className="text-center">Who We Are</h2>
                    <div className="">
                        <div className="row">
                            <br />
                            <div className="col-md-offset-2 col-md-8 mx-auto text-center">
                                <p>
                                    Midtown Assistance Center (MAC) is a
                                    non-profit, interfaith organization whose
                                    mission is to provide emergency assistance
                                    to low-income working Atlantans to help
                                    prevent homelessness and hunger during
                                    periods of crisis.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact">
                <div className="container">
                    <h2 className="text-center">Contact Us</h2>
                    <br />
                    <div className="row text-center">
                        <div className="col-xs-4">
                            <h3>Website</h3>
                            <hr />
                            <a href="http://www.midtownassistancectr.org">
                                {' '}
                                Midtown Assistance Center
                            </a>
                        </div>
                        <div className="col-xs-4">
                            <h3>Phone:</h3>
                            <hr />
                            <div className="text-left">
                                <p>Main: 404-681-0470</p>
                                <p>For Assistance: 404-681-5777</p>
                            </div>
                        </div>
                        <div className="col-xs-4">
                            <h3>Location:</h3>
                            <hr />
                            <div className="text-left">
                                <p>Midtown Assistance Center</p>
                                <p>30 Porter Place NE</p>
                                <p>Atlanta, GA 30308</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
