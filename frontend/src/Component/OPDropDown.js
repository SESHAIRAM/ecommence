import { useEffect, useState } from "react";
import { OPValidations } from "../CommonOP/OPValidations";

export const OPDropDown = ({ ctl_Attribute, rerender }) => {
    const [isControlRender, setControlRender] = useState(false);
    const [isHintBox, setIsHintBox] = useState(false);
    const [alertWidthSize, setAlertWidthSize] = useState("");
    const [isHintIcon, setIsHintIcon] = useState(false);
    const [valueDrop, setValueDrop] = useState(ctl_Attribute.inputvalue);

    useEffect(() => {
        setValueDrop(ctl_Attribute.inputvalue);
    }, [rerender]);
    const validate = OPValidations();

    function handleOnBlur(e) {
        console.log(isHintBox == true);

        if (isHintBox == true) {
            setIsHintIcon(true);
        } else {
            setIsHintIcon(false);
            setIsHintBox(false)
        }
    };

    const handleOnChange = (e) => {
        setValueDrop(e.target.value);
        ctl_Attribute.inputvalue = e.target.value;
    };
    const handleOnFocus = () => {
        setIsHintIcon(true);
    };
    const handleAlertOnClick = (e) => {
        let a = ctl_Attribute.csstheme.hinttext
        if (a.length <= 34) {
            let count = 0
            for (let i = 0; i < a.length; i++) {
                count += 5.5;
            }
            setAlertWidthSize(count + "px")
        } else {
            setAlertWidthSize("170px")
        }
        setIsHintBox(true);
    }
    const handleAlertOnBlur = () => {
        setIsHintIcon(false);
        setIsHintBox(false);

    }

    return (
        <>
            <>
                <div className="component-gap pos-relative">
                    <label htmlFor={ctl_Attribute.csstheme.id} className="col-form-label">{ctl_Attribute.csstheme.labletext}</label>
                    {isHintIcon && (
                        <>
                            <button
                                className="alert-btn"
                                onMouseDown={handleAlertOnClick}
                                onBlur={handleAlertOnBlur}
                            >
                                <i className='fa fa-exclamation-circle alert-icon'></i>
                            </button>
                            {isHintBox && (
                                <div className="container">
                                    <div className="arrow">
                                        <div className="outer"></div>
                                        <div className="inner"></div>
                                    </div>
                                    <div style={{ width: alertWidthSize }} className="message-body">
                                        <p className="alert-para">{ctl_Attribute.csstheme.hinttext}</p>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
                <select
                    disabled={ctl_Attribute.csstheme.disable}
                    className="form-control"
                    onBlur={handleOnBlur}
                    onFocus={handleOnFocus}
                    onChange={handleOnChange}
                    value={valueDrop}
                    id={ctl_Attribute.csstheme.id}
                >
                    <option id="dd-Option" key="001" value="000">
                        --Select--
                    </option>
                    {ctl_Attribute.dropdata.map((item, index) => (
                        <option id="dd-Option" key={index} value={item.keylistid}>
                            {item.keylistvalue}
                        </option>
                    ))}
                    ;
                </select>
                {/* {ctl_Attribute.csstheme.showhint && (
                        <p className="showElement inputhint">
                            {ctl_Attribute.csstheme.hinttext}
                        </p>
                    )}
                    {ctl_Attribute.error.errorshow && (
                        <p className="showElement valid-failed">
                            {ctl_Attribute.error.errormsg}
                        </p>
                    )} */}

            </>
        </>
    );
}
{/*
    {
                arrayindex: 0,
                csstheme: {
                    labletext: "Select category *",
                    classname: "btn btn-primary d-right",
                    id: "sel_selectcategory",
                    showhint: false,
                    disable: false,
                    hinttext:
                        "Select the Category that related upto your role",
                },
                inputvalue: "",
                validate: {
                    mandatory: false,
                    datatype: "dropdown",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
                dropdata: [
                    {
                        keylistid: 0,
                        keylistvalue: "Server"
                    },
                    {
                        keylistid: 1,
                        keylistvalue: "Chief"
                    },
                    {
                        keylistid: 2,
                        keylistvalue: "Casher"
                    },
                ],
            },
    */ }