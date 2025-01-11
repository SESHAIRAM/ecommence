import React from 'react'
import { Link, } from 'react-router-dom'

export const Error404 = () => {
    function goBack() {
        window.history.back();
    }

    return (
        <div className="main-wrapper">
            <div className="d-flex flex-wrap w-100 vh-100 overflow-hidden">
                <div className="d-flex align-items-center justify-content-center flex-fill flex-column vh-100 overflow-auto">
                    <div className="error-img mb-4">
                        <img src={require("../assets/image/error/error-404.png")} className="img-fluid" />
                    </div>
                    <div className="text-center">
                        <h3 className="fs-28 mb-3">Oops, something went wrong</h3>
                        <p className="fs-16">Error 404 Page not found. Sorry the page you looking for <br></br> doesn’t exist or has
                            been moved</p>
                        <Link onClick={goBack} className="btn btn-primary">
                            <i className="ti ti-arrow-narrow-left me-1"></i> Go Back
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
