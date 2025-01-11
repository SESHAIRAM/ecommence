import React, { useState } from 'react'

export const CompHeaderSearchBar = ({ ctl_Attribute }) => {
    const [l_rerender, l_setRerender] = useState(false)

    function handleOnChange(e) {
        ctl_Attribute.inputvalue = e.target.value;
        l_setRerender(!l_rerender);
    }
    return (
        <div className="searchinputs">
            <input type="text" placeholder='Search' id={ctl_Attribute.csstheme.id} value={ctl_Attribute.inputvalue} onChange={handleOnChange} />
        </div>
    )
}
