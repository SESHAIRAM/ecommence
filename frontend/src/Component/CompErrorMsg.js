import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const CompErrorMsg = ({ nameProps, priceProps, photoProps, bool }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(bool)
    }, [bool]);

    return (
        <div className={`rectangle ${isVisible ? "visible" : "invisible"} justify-content-between`}>
            {isVisible && (
                <>
                    <div className='d-flex align-items-center'>
                        <div className='d-flex align-items-center justify-content-center'>
                            <div className='notify-img p-1'>
                                <img
                                    src={require(`../assets/image/products/${photoProps}.jpg`)}
                                    className="img-cover"
                                    alt="notify-img"
                                    style={{ borderRadius: "5px" }}
                                />
                            </div>
                            <div className='d-flex flex-column justify-content-center'>
                                <h6>{nameProps} </h6>
                                <p className='m-0'>{`Price : ${priceProps}`}</p>
                            </div>
                        </div>
                        <Link
                            style={{ marginLeft: "auto" }}
                            onClick={(e) => { setIsVisible(false) }}
                            className=' notify-cancel'>
                            <img
                                src={require("../assets/image/icon/circle-x.png")}
                                style={{ width: "20px" }}
                                className="img-fluid  "
                                alt="Cancel" />
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}


























// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

// export const CompErrorMsg = ({ nameProps, priceProps, photoProps, bool }) => {
//     const [isVisible, setIsVisible] = useState(true);

//     function initiControl() {

//     }

//     useEffect(() => {
//         setIsVisible(bool)
//     }, [bool]);
//     return (
//         <div className="row bg-black position-fixed " style={{float:"right"}}>
//             <div className={`rectangle ${isVisible ? "visible" : "invisible"} justify-content-between`}>
//                 {isVisible && (
//                     <>
//                         <div className='d-flex align-items-center '>
//                             <div>
//                                 <img
//                                     style={{ padding: "11px", width: "80px", height: "70px" }}
//                                     // src={require(`../assets/image/products/${photoProps}.jpg`)}
//                                     src={require(`../assets/image/products/car.jpg`)}
//                                     className="img-fluid"
//                                     alt="notify-img" />
//                             </div>
//                             <div>
//                                 <h6>{nameProps} </h6>
//                                 <p className='m-0'>{`Price : ${priceProps}`}</p>
//                             </div>
//                         </div>
//                         <Link
//                             onClick={(e) => { setIsVisible(false) }}
//                             className='notify-cancel'>
//                             <img
//                                 src={require("../assets/image/icon/circle-x.png")}
//                                 style={{ width: "15px" }}
//                                 className="img-fluid "
//                                 alt="Cancel" />
//                         </Link>
//                     </>
//                 )}
//             </div >
//         </div>

//     )
// }
