import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TextBox } from '../Component/TextBox';
import { CompLink } from '../Component/CompLink';
import { CompButton } from '../Component/CompButton';
import { Validations } from '../Common/Validations';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../ApiOP/useFetch';
import { setlogininfo } from '../reduxStore/AppState';
import { CompErrorMsg } from '../Component/CompErrorMsg';

export const Login = () => {

    const [startinit, setStartinit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [rerender, setRerender] = useState(false);
    const [notify, setNotify] = useState(false);

    const ctlAttribute = useRef([]);
    const ctlNotify = useRef({});

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
            let _sendingUserDetails = {
                mailID: ctlAttribute.current[0].inputvalue,
                password: ctlAttribute.current[1].inputvalue,
            }
            let serverRequestParam = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(_sendingUserDetails),
                apiUrl: "/api/v1/login",
                apikey: "LOGIN"
            };
            serverRequest(serverRequestParam);
        }
    }

    function fnLoginResult() {
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
        } else if (responseData.errormsg == "Incorrect password") {
            ctlAttribute.current[1].tooltip.isvalidation = true;
            ctlAttribute.current[1].tooltip.isfocus.focus();
            ctlNotify.current.name = responseData.errormsg;
            ctlNotify.current.price = "Please enter the right password";
            ctlNotify.current.photo = "notify-error-img";
        } else if (responseData.errormsg == "user not exist") {
            ctlAttribute.current[0].tooltip.isvalidation = true;
            ctlAttribute.current[0].tooltip.isfocus.focus();
            ctlNotify.current.name = responseData.errormsg;
            ctlNotify.current.price = "User don't exist in database";
            ctlNotify.current.photo = "notify-error-img";
        }
        else {
            navigate("/error500")
        }
        setNotify(true)
    }

    useEffect(() => {
        if (notify) {
            const closeNotify = setInterval(() => {
                setNotify(false);
            }, 2000);

            return () => clearInterval(closeNotify);
        }
    }, [notify]);

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
        } else {
            if (isLoadingApi) {
                switch (apiKey) {
                    case "LOGIN":
                        fnLoginResult();
                        break;
                }
            }
        }
    }, [startinit, isLoadingApi]);

    return (
        <>
            {startRender && (
                <>
                    <div className='d-flex flex-wrap w-100 vh-100 justify-content-center '>
                        <CompErrorMsg
                            nameProps={ctlNotify.current.name}
                            priceProps={ctlNotify.current.price}
                            photoProps={ctlNotify.current.photo}
                            bool={notify}
                        />
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
