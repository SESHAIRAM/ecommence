import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TextBox } from '../Component/TextBox';
import { CompLink } from '../Component/CompLink';
import { CompButton } from '../Component/CompButton';
import { Validations } from '../Common/Validations';

export const Login = () => {

    const [startinit, setStartinit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [rerender, setRerender] = useState(false);

    const ctlAttribute = useRef([]);

    const Navigate = useNavigate()
    const validate = Validations();

    function initiControl() {
        const CtlArray = [
            {
                /*Ctl:Email Address : 0*/
                arrayindex: 0,
                csstheme: {
                    labletext: "Email Address",
                    classname: "form-control",
                    id: "txt_emailaddress",
                    inputtype: "text",
                    length: 50,
                    readonly: false,
                    hinttext: "Enter your Registered Email Address",
                },
                inputvalue: "",
                tooltip: {
                    place: "bottom",
                    classname: "tooltip-react",
                    isfocus: "",
                    isvalidation: false,
                },
                validate: {
                    mandatory: true,
                    datatype: "email",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*Ctl:password : 1*/
                arrayindex: 1,
                csstheme: {
                    labletext: "Password",
                    classname: "form-control",
                    id: "txt_password",
                    inputtype: "password",
                    length: 50,
                    readonly: false,
                    hinttext: "Enter your Password",
                },
                inputvalue: "",
                tooltip: {
                    place: "bottom",
                    classname: "tooltip-react",
                    isfocus: "",
                    errorshow: "",
                    isvalidation: false,
                },
                validate: {
                    mandatory: true,
                    datatype: "default",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*Ctl:Forgot Password : 2*/
                arrayindex: 2,
                csstheme: {
                    labletext: "Forgot Password?",
                    classname: "",
                    id: "cb_rememberme",
                },
                to: "Forgot-password"
            },
            {
                /*Ctl:Login : 3*/
                arrayindex: 3,
                csstheme: {
                    labletext: "Login",
                    classname: "btn btn-primary pad-btn",
                    id: "btn_login",
                },
            },
            {
                /*Link:Sign up : 5*/
                arrayindex: 5,
                csstheme: {
                    labletext: " Sign up.",
                    classname: "",
                    id: "cb_signup",
                },
                to: "/signup"
            },
        ]
        ctlAttribute.current = CtlArray;
        setStartRender(true);
        setStartinit(false);
    }
    function fnLogin() {
        let canFormSubmit = true;
        let err = [];
        let l_validate = [];
        err.push(validate(ctlAttribute.current[1]))
        err.push(validate(ctlAttribute.current[0]))
        console.log(err);

        for (let i = 0; i < err.length; i++) {
            if (err[i].founderror == true) {
                canFormSubmit = false;
                ctlAttribute.current[err[i].arrayindex].error.errorshow = true;
                l_validate.push(err[i])
            }
        }
        if (canFormSubmit == false) {
            ctlAttribute.current[l_validate[l_validate.length - 1].arrayindex].tooltip.isvalidation = true;
            ctlAttribute.current[l_validate[l_validate.length - 1].arrayindex].tooltip.isfocus.focus();
            setRerender(!rerender);
        }
        else {
            Navigate("/login/user")
        }
    }
    function handleButtonClick(e) {
        let btn_id = e.currentTarget.id;
        switch (btn_id) {
            case "btn_login":
                fnLogin();
                break;
        }
    }

    useEffect(() => {
        if (startinit) {
            initiControl();
        }
    });

    return (
        <>
            {startRender && (
                <>
                    <div className='d-flex flex-wrap w-100 vh-100 justify-content-center '>
                        <div className='d-flex justify-content-center flex-wrap overflow-auto p-4 w-50 bg-backdrop'>
                            <div className='flex-fill'>
                                <div className='mx-auto'>
                                    <div className='text-center mb-4'>
                                        <img
                                            className='img-fluid'
                                            src={require("../assets/image/login-logo.jpg")}
                                            alt="Order pls"
                                        ></img>
                                    </div>
                                    <div className="mb-4">
                                        <h4 className='mb-2 fs-20'>Login</h4>
                                        <p>Welcome back! Please log in to continue your shopping experience.</p>
                                    </div>
                                    <div className="mb-3 d-grid mx-auto">
                                        <TextBox
                                            ctl_Attribute={ctlAttribute.current[0]}
                                            rerender={rerender}
                                        />
                                    </div>
                                    <div className="mb-3 d-grid mx-auto">
                                        <TextBox
                                            ctl_Attribute={ctlAttribute.current[1]}
                                            rerender={rerender}
                                        />
                                    </div>
                                    <div className='d-flex align-items-center justify-content-between mb-3'>
                                        <CompLink
                                            ctl_Attribute={ctlAttribute.current[2]}
                                        />
                                    </div>
                                    <div className='d-grid mx-auto mb-3'>
                                        <CompButton
                                            ctl_Attribute={ctlAttribute.current[3]}
                                            handleButtonClick={handleButtonClick}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <h6>Not a member yet?
                                            <CompLink
                                                ctl_Attribute={ctlAttribute.current[4]}
                                            />
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
