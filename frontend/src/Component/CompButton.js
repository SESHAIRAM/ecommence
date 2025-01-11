import { useEffect, useRef, useState } from "react";

export const CompButton = ({ handleButtonClick, ctl_Attribute }) => {
    useEffect(() => { });

    return (
        <button
            type="button"
            id={ctl_Attribute.csstheme.id}
            className={ctl_Attribute.csstheme.classname}
            disabled={ctl_Attribute.csstheme.disable}
            onClick={(e) => {
                handleButtonClick(e)
            }}
        >
            <i className={ctl_Attribute.csstheme.icon}> </i>
            <span>{ctl_Attribute.csstheme.labletext}</span>
        </button>
    )
}
