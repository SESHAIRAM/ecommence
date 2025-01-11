import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Validations } from '../Common/Validations';
import { CompErrorMsg } from '../Component/CompErrorMsg';
import { CompFooter } from '../Component/CompFooter';

export const Home = () => {

    const [startinit, setStartinit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [notify, setNotify] = useState(false);

    const ctlProduct = useRef([]);
    const ctlNotify = useRef({})

    function initiControl() {
        let products = [
            {
                category: "Dress",
                categoryprice: "Stylish, comfortable, versatile, fashionable, trendy dress.",
                product: [
                    {
                        name: "shirt",
                        price: "100",
                        photo: "women-shirt"
                    },
                    {
                        name: "boy dress",
                        price: "300",
                        photo: "casual-boy-dress"
                    },
                    {
                        name: "silky-frock",
                        price: "250",
                        photo: "green-frock"
                    },
                    {
                        name: " Red saree",
                        price: "600",
                        photo: "Traditional-saree"
                    },
                    {
                        name: "Baby Dress",
                        price: "400",
                        photo: "Traditional-Baby-Boy-Dress"
                    },
                    {
                        name: "Red saree",
                        price: "1200",
                        photo: "Traditional-red-saree"
                    },
                    {
                        name: "Mens casual dress",
                        price: "300",
                        photo: "mens-casual-dress"
                    },
                    {
                        name: "kids white shut",
                        price: "2.5k",
                        photo: "kid-white-shut"
                    },
                    {
                        name: "Kids casual dress",
                        price: "350",
                        photo: "kid-casual-dress"
                    },
                    {
                        name: " Full back kids shut",
                        price: "5.5k",
                        photo: "full-back-kid-shut"
                    },
                    {
                        name: "Boy kids traditional dress",
                        price: "1.5k",
                        photo: "boy-Traditional-dress"
                    },
                    {
                        name: "Baby dress",
                        price: "1200",
                        photo: "baby-dress"
                    },
                ]
            },
            {
                category: "Smart phones",
                categoryprice: "Latest smartphone with advanced features for seamless performance.",
                product: [
                    {
                        name: "Onthing phone 2",
                        price: "60k",
                        photo: "onthing-phone2"
                    },
                    {
                        name: "iphone",
                        price: "70k",
                        photo: "iphone"
                    },
                    {
                        name: "Onthing phone 1",
                        price: "30k",
                        photo: "onthing-phone1"
                    },
                    {
                        name: " Redmi",
                        price: "20k",
                        photo: "redmi"
                    },
                    {
                        name: "Onthing Phone 2a",
                        price: "25k",
                        photo: "onthing-phone2a"
                    },
                    {
                        name: "Oneplus",
                        price: "40k",
                        photo: "oneplus"
                    }, {
                        name: "Wiko phone",
                        price: "15k",
                        photo: "wiko"
                    },
                    {
                        name: "Oppo reno r",
                        price: "80k",
                        photo: "oppo-reno-6"
                    },
                    {
                        name: "Redmi note 11 pro",
                        price: "45k",
                        photo: "redmi-note-11-pro"
                    },
                    {
                        name: "Lava agni phone ",
                        price: "25k",
                        photo: "lava-agni-phone"
                    },
                    {
                        name: "T angxi phone",
                        price: "55k",
                        photo: "t-angxi-phone"
                    },
                    {
                        name: "Vivo phone",
                        price: "40k",
                        photo: "vivo-yellow"
                    },

                ]
            },
            {
                category: "Toys",
                categoryprice: "Fun, safe, and educational toys for kids of all ages.",
                product: [
                    {
                        name: "Wood Toy",
                        price: "500",
                        photo: "wood-toy"
                    },
                    {
                        name: "Jerry",
                        price: "200",
                        photo: "jerry-toy"
                    },
                    {
                        name: "Teddy",
                        price: "250",
                        photo: "teddy"
                    },
                    {
                        name: "Kid toy",
                        price: "300",
                        photo: "child-toy"
                    },
                    {
                        name: "Track toy",
                        price: "1.5k",
                        photo: "track-toy"
                    },
                    {
                        name: "Dinosaurs toy",
                        price: "200",
                        photo: "dinosaurs"
                    },
                    {
                        name: "Ambulance",
                        price: "1.5k",
                        photo: "ambulance"
                    },
                    {
                        name: "Horse",
                        price: "2000",
                        photo: "horse"
                    },
                    {
                        name: "Car",
                        price: "270",
                        photo: "car"
                    },
                    {
                        name: "Baby shark",
                        price: "400",
                        photo: "baby-shark"
                    },
                    {
                        name: "Drums",
                        price: "1.5k",
                        photo: "drums"
                    },
                    {
                        name: "Tower Puzzle",
                        price: "200",
                        photo: "tower-puzzle"
                    },
                ]
            },
        ]
        ctlProduct.current = products;

        setStartRender(true);
        setStartinit(false);
    }

    function handleButtonClick(name, price, photo) {
        ctlNotify.current.name = name;
        ctlNotify.current.price = price;
        ctlNotify.current.photo = photo;
        console.log(ctlNotify.current);
        setNotify(true);
    }

    useEffect(() => {
        if (notify) {
            const closeNotify = setInterval(() => {
                setNotify(false);
            }, 2000);

            return () => clearInterval(closeNotify);
        }
    }, [notify]);

    useEffect(() => {
        if (startinit) {
            initiControl();
        }
    }, [startinit]);

    return (
        <>
            {startRender && (
                <>
                    <div className="page-wrapper">
                        <CompErrorMsg
                            nameProps={ctlNotify.current.name}
                            priceProps={ctlNotify.current.price}
                            photoProps={ctlNotify.current.photo}
                            bool={notify}
                        />
                        <div className="row">
                            <div className="col-md-12">
                                {ctlProduct.current.map((item, index) => {
                                    return (
                                        <div key={index} className='bg-white'>
                                            <h3 className='pt-1'>{item.category}</h3>
                                            <p className='pb-0'>{item.categoryprice}</p>
                                            <div className="row p-2">
                                                {
                                                    item.product.map((prod, l_index) => {
                                                        return (
                                                            <div
                                                                key={l_index + "-" + item.category}
                                                                className='col-sm-2 product-details d-flex justify-content-between align-items-center flex-column p-1 mb-1 m-auto'>
                                                                <div className='image-container'>
                                                                    <div className='spinner'></div>
                                                                    <img
                                                                        id={l_index + "-" + item.category + "-img"}
                                                                        className='product-img'
                                                                        onLoad={(e) => {
                                                                            e.target.closest('.image-container').querySelector('.spinner').style.display = 'none';
                                                                            e.target.classList.add('loaded');
                                                                        }}
                                                                        src={require(`../assets/image/products/${prod.photo}.jpg`)}
                                                                        alt="product" />
                                                                </div>
                                                                <div className='d-flex justify-content-between pl-2 pr-2 w-100'>
                                                                    <div>
                                                                        <h5 className='pt-2 prouct-name'>{prod.name.length > 8 ? (prod.name.slice(0, 8) + "...") : prod.name}</h5>
                                                                        <p>{`Price : ${prod.price}`}</p>
                                                                    </div>
                                                                    <div style={{ margin: " auto 5px" }}>
                                                                        <button
                                                                            id={l_index + "-" + item.category}
                                                                            className="btn btn-warning scale-up product-btn-size"
                                                                            onClick={(e) => { handleButtonClick(prod.name, prod.price, prod.photo); }}
                                                                        >
                                                                            Add to Cart
                                                                        </button>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                            </div>
                                        </div >
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <CompFooter />
                </>
            )}
        </>
    )
}
