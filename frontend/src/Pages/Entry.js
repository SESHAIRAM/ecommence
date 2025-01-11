import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CompButton } from '../Component/CompButton';

export const Entry = () => {

  const [startinit, setStartinit] = useState(true);
  const [startRender, setStartRender] = useState(false);

  const ctlAttribute = useRef([]);

  const Navigate = useNavigate()
  function initiControl() {
    const CtlArray = [
      {
        /*btn:Login button : 0*/
        arrayindex: 0,
        csstheme: {
          labletext: "Login",
          classname: "btn btn-primary w-100",
          id: "btn_Login",
          icon: "ti ti-square-rounded-plus",
        },
      },
      {
        /*btn:signin button : 1*/
        arrayindex: 1,
        csstheme: {
          labletext: "Sign Up",
          classname: "btn btn-secondary w-100",
          id: "btn_Signup",
          icon: "ti ti-square-rounded-plus",
        },
      },
    ]
    ctlAttribute.current = CtlArray;
    setStartRender(true);
    setStartinit(false);
  }
  function handleButtonClick(e) {
    let btn_id = e.currentTarget.id;
    switch (btn_id) {
      case "btn_Login":
        Navigate('login');
        break;
      case "btn_Signup":
        Navigate('signup');
        break;

      default:
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
                    <h4 className='mb-2 fs-20'>Welcome</h4>
                    <p>Shop the best, effortlessly at Online Shop!</p>
                  </div>
                  <div className="d-grid mx-auto">
                    <CompButton
                      handleButtonClick={handleButtonClick}
                      ctl_Attribute={ctlAttribute.current[0]} />
                    <p className='subtitle-entry'>Click here if you have already registered.</p>
                  </div>
                  <div className="d-grid mx-auto">
                    <CompButton
                      handleButtonClick={handleButtonClick}
                      ctl_Attribute={ctlAttribute.current[1]} />
                    <p className='subtitle-entry'>Click here if you want to register and join us.</p>
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
