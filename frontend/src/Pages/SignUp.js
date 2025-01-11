import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TextBox } from '../Component/TextBox';
import { CompLink } from '../Component/CompLink';
import { CompButton } from '../Component/CompButton';
import { Validations } from '../Common/Validations';
import useFetch from '../ApiOP/useFetch';
import { CompErrorMsg } from '../Component/CompErrorMsg';
import { useDispatch, useSelector } from 'react-redux';
import { setlogininfo } from '../reduxStore/AppState';

export const SignUp = () => {

    const [startinit, setStartinit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [rerender, setRerender] = useState(false);

    const ctlAttribute = useRef([]);

    const navigate = useNavigate()
    const validate = Validations();

    const { responseData, isLoadingApi, apiKey, fetchError, serverRequest } = useFetch();
    const dispatchappStore = useDispatch();
    const getAppStoreData = useSelector((state) => state.appstate.login_info);

    function initiControl() {
        const CtlArray = [
            {
                /*Ctl:Email Address : 0*/
                arrayindex: 0,
                csstheme: {
                    labletext: "Email Address",
                    classname: "form-control",
                    id: "txt_emailaddress",
                    inputtype: "email",
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
                /*Ctl:confirm password : 2*/
                arrayindex: 2,
                csstheme: {
                    labletext: "Confirm Password",
                    classname: "form-control",
                    id: "txt_confirmpassword",
                    inputtype: "password",
                },
                length: 50,
                readonly: false,
                hinttext: "Enter your Confirm Password",
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
                /*Ctl:SignUp : 3*/
                arrayindex: 3,
                csstheme: {
                    labletext: "SignUp",
                    classname: "btn btn-primary pad-btn",
                    id: "btn_signup",
                },
            },
            {
                /*Link:Login : 4*/
                arrayindex: 4,
                csstheme: {
                    labletext: " Login",
                    classname: "",
                    id: "cb_login",
                },
                to: "/Login"
            },
            {
                /*Ctl:username : 5*/
                arrayindex: 5,
                csstheme: {
                    labletext: "User Name",
                    classname: "form-control",
                    id: "txt_username",
                    inputtype: "text",
                },
                length: 50,
                readonly: false,
                hinttext: "Enter your User Name",
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
        ]
        ctlAttribute.current = CtlArray;
        setStartRender(true);
        setStartinit(false);
    }
    function fnSignUp() {
        let canFormSubmit = true;
        let err = [];
        let l_validate = [];
        err.push(validate(ctlAttribute.current[2]))
        err.push(validate(ctlAttribute.current[1]))
        err.push(validate(ctlAttribute.current[0]))
        err.push(validate(ctlAttribute.current[5]))


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
            if (ctlAttribute.current[1].inputvalue == ctlAttribute.current[2].inputvalue) {
                let _sendingUserDetails = {
                    userName: ctlAttribute.current[5].inputvalue,
                    mailID: ctlAttribute.current[0].inputvalue,
                    password: ctlAttribute.current[1].inputvalue,
                }
                let serverRequestParam = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(_sendingUserDetails),
                    apiUrl: "/api/v1/signup",
                    apikey: "SIGNUP"
                };
                console.log(serverRequestParam.body);

                serverRequest(serverRequestParam);
            } else {
                ctlAttribute.current[2].error.errorshow = true;
                ctlAttribute.current[2].error.errormsg = "Password didn't match";
                ctlAttribute.current[2].tooltip.isvalidation = true;
                ctlAttribute.current[2].tooltip.isfocus.focus();
                setRerender(!rerender);
            }
        }
    };

    function fnSignUpResult() {
        console.log(responseData);
        if (responseData.success) {
            dispatchappStore(
                setlogininfo({
                    username: ctlAttribute.current[0].inputvalue,
                    email: ctlAttribute.current[1].inputvalue,
                    isloggedin: true,
                })
            );
            navigate("/home")

        } else {
            if (responseData.errormsg == "user is already register") {

            } else {
                navigate("/error500")
            }
        }
    }

    function handleButtonClick(e) {
        let btn_id = e.currentTarget.id;
        switch (btn_id) {
            case "btn_signup":
                fnSignUp();
                break;
        }
    }

    useEffect(() => {
        if (startinit) {
            initiControl();
        } else {
            if (isLoadingApi) {
                switch (apiKey) {
                    case "SIGNUP":
                        fnSignUpResult();
                        break;
                }
            }
        }
    }, [startinit, isLoadingApi]);

    return (
        <>
            {startRender && (
                <>
                    <CompErrorMsg />
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
                                        <h4 className='mb-2 fs-20'>Sign Up</h4>
                                        <p>Welcome! Create an account to start your shopping journey.</p>
                                    </div>
                                    <div className="mb-3 d-grid mx-auto">
                                        <TextBox
                                            ctl_Attribute={ctlAttribute.current[5]}
                                            rerender={rerender}
                                        />
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
                                    <div className="mb-3 d-grid mx-auto">
                                        <TextBox
                                            ctl_Attribute={ctlAttribute.current[2]}
                                            rerender={rerender}
                                        />
                                    </div>
                                    <div className='d-grid mx-auto mb-3'>
                                        <CompButton
                                            ctl_Attribute={ctlAttribute.current[3]}
                                            handleButtonClick={handleButtonClick}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <h6>Already a member?
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
