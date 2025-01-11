import React, { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { CompButton } from './CompButton';
import { CompHeaderSearchBar } from './CompHeaderSearchBar';

export const CompHeader = () => {

  const [startinit, setStartinit] = useState(true);
  const [startRender, setStartRender] = useState(false);
  const [scrollingToggle, setScrollingToggle] = useState(true);

  const ctlAttribute = useRef([]);

  const Navigator = useNavigate()
  function initiControl() {
    const CtlArray = [
      {
        /*btn:search bar : 0*/
        arrayindex: 0,
        csstheme: {
          id: "mainsearchbar",
          icon: "ti ti-command",
        },
        inputvalue: "",
      },
      {
        /*Btn:Login : 1*/
        arrayindex: 1,
        csstheme: {
          labletext: "Cart",
          classname: "btn btn-warning m-06 media-730",
          id: "btn_cart",
          icon: "fa-solid fa-cart-shopping m-06 "
        },
      },
      {
        /*Btn:logout : 2*/
        arrayindex: 2,
        csstheme: {
          labletext: "Logout",
          classname: "btn btn-light text-dark media-730",
          id: "btn_logout",
          icon: "fas fa-sign-out-alt m-06"
        },
      },
      {
        /*Btn:arrow : 3*/
        arrayindex: 3,
        csstheme: {
          labletext: "",
          classname: "btn btn-light m-06",
          id: "btn_arrow",
          icon: `fa-solid fa-angles-${scrollingToggle ? "down" : "up"}`
        },
      },

    ]
    ctlAttribute.current = CtlArray;
    setStartRender(true);
    setStartinit(false);
  }
  function scrollingTopDown() {
    if (scrollingToggle) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
      ctlAttribute.current[3].csstheme.icon = "fa-solid fa-angles-up"
      setScrollingToggle(false);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      ctlAttribute.current[3].csstheme.icon = "fa-solid fa-angles-down"
      setScrollingToggle(true);
    }
  }
  function handleButtonClick(e) {
    let btn_id = e.currentTarget.id;
    switch (btn_id) {

      case "btn_arrow":
        scrollingTopDown()
        break;
      case "btn_logout":
        Navigator("/")
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
          <div className="main-wrapper">
            <header className='header d-flex flex-wrap justify-content-between'>
              <div className='header-right'>
                <div style={{ height: "fit-content" }}>
                  <img
                    className='img-fluid'
                    src={require("../assets/image/small-logo.jpg")}
                    alt="header logo"
                  ></img>
                </div>
                <CompHeaderSearchBar
                  ctl_Attribute={ctlAttribute.current[0]}
                />
              </div>
              <div className="header-left">
                <div>
                  <CompButton
                    ctl_Attribute={ctlAttribute.current[3]}
                    handleButtonClick={handleButtonClick}
                  />
                  <CompButton
                    ctl_Attribute={ctlAttribute.current[1]}
                    handleButtonClick={handleButtonClick}
                  />
                  <CompButton
                    ctl_Attribute={ctlAttribute.current[2]}
                    handleButtonClick={handleButtonClick}
                  />
                </div>
              </div>
            </header>
            <Outlet />
          </div >
        </>
      )}
    </>
  )
}
