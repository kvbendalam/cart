import React, { useEffect } from 'react'
import List from "./List"
import "./products.css"
import amazon from "./amazon.png"

function Products(props) {
    const [list, setList] = React.useState([])
    const [filters, setFilters] = React.useState([])
    const [price, setPrice] = React.useState([])
    const [color, setColor] = React.useState([])
    const [brand, setBrand] = React.useState([])
    const [cart, setCart] = React.useState(0)
    const [selectedPrice, setSelectedPrice] = React.useState("Min")

    function getProducts() {
        const listUrl = "https://xebiascart.herokuapp.com/products"
        fetch(listUrl).then(resp => resp.json())
            .then(data => {
                setList(data)
            })
    }

    function getFilters() {
        const filterUrl = "https://xebiascart.herokuapp.com/filters"
        fetch(filterUrl).then(resp => resp.json())
            .then(data => {
                setFilters(data)
                individualFilters(data)
            })
    }

    function individualFilters(data) {
        data.forEach(element => {
            if (element.type === "PRICE") {
                setPrice([element.values])
            } else if (element.type === "BRAND") {
                setBrand(element.values)
            } else if (element.type === "COLOUR") {
                setColor([element.values])
            }

        });
    }

    var colorArr = []
    function handleColor(e) {
        list.forEach((res) => {
            if (res.colour.title === e.target.value) {
                colorArr.push(res)
                setList(colorArr)
            }
        })
    }

    var brandArr = []
    function handleBrand(e) {
        list.forEach((res) => {
            if (res.brand === e.target.value) {
                brandArr.push(res)
                setList(brandArr)
            }
        })
    }


    useEffect(() => {
        getFilters()
        getProducts()
    }, [])

    function handleSearch(event) {
        event.preventDefault();
        let searchTerm = event.target.value;
        const searchUrl = "https://xebiascart.herokuapp.com/products?title=" + searchTerm;
        fetch(searchUrl).then(resp => resp.json())
            .then(data => {
                setList(data)
            })
    }

    function handleCart(newValue) {
        console.log(newValue)
        let res = cart + Number(newValue);
        setCart(res)
    }


    return (
        <div>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <img src={amazon} className="amazon" alt="amazon" />
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form type="submit" className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2 search" type="search" onChange={handleSearch} placeholder="Search" aria-label="Search" />
                        </form>
                    </div>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                    </link>
                    <i class="fa fa-shopping-cart" style={{ fontSize: "20px", marginBottom: "17px", marginRight: "10px" }}>
                        <span>{cart}</span>
                    </i>
                    <p className="username">{localStorage.getItem("username")} </p>
                </nav>
            </div>

            <div className="row ">
                <div className="col-sm-2 col-md-2 col-lg-2 ">
                    <div>
                        {price.map((res) => {
                            return (
                                <div>
                                    <div className="totMargin">
                                        <p className="h5">Select Prices Below</p>
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {selectedPrice}
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                {res.map((price) => {
                                                    return (
                                                        <option key={price.displayValue}>{price.displayValue}</option>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="totMargin">
                                        <p className="h5">Select Colors Below</p>
                                        {color.map((res) => {
                                            return (
                                                <div>
                                                    {res.map((color) => {
                                                        return (
                                                            <div key={color.title}>
                                                                <input type="checkbox" value={color.title} name="color" onChange={e => handleColor(e)} />
                                                                <label className="form-check-label" >{color.title}</label>
                                                            </div>

                                                        )
                                                    })}
                                                </div>
                                            )
                                        })}
                                    </div>


                                    <div className="totMargin">
                                        <p className="h5">Select Brands Below</p>
                                        {brand.map((res) => {
                                            return (
                                                <div>
                                                    <input type="checkbox" onChange={e => handleBrand(e)} value={res.value}></input>
                                                    <label >{res.title}</label>
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="col-sm-10 col-md-10 col-lg-10">
                    <List data={list} onChange={handleCart}></List>
                </div>
            </div>
        </div >
    )
}

export default Products
