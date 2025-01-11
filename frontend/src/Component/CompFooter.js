import React from 'react'
let skills = [
    "HTML", "CSS", "Javascript",
    "bootstrap", "Node.js", "Express.js",
    "MongoDB", "Socket.io", "SVN"
    , "AWS", "GIT",
]
export const CompFooter = () => {
    return (
        <footer style={{ height: "170px" }}>
            <div className='d-flex justify-content-between p-1 bg-black'>
                <div>
                    <h5 style={{ color: "white" }}>About me</h5>
                    <p className='m-1'>hi,Seshairam from kodambakkam.I have 6 month of experience on React.js and my skills are:</p>
                    <div className="row">
                        {skills.map((item, index) => {
                            return (
                                <div key={index} className='col-4 pt-1'>{item}</div>
                            )
                        })}
                    </div>
                </div>
                <div className='d-flex flex-column justify-content-end p-2'>
                    <a style={{ color: "#6F6F6F" }} href="https://github.com/SESHAIRAM"><i className="fa-brands fa-github m-06"></i> github.com/seshairam</a>
                    <a style={{ color: "#6F6F6F" }} href="https://www.linkedin.com/in/seshairam/"><i className="fa-brands fa-linkedin m-06"></i>linkedin.com/seshairam</a>
                </div>
            </div>

        </footer>
    )
}
