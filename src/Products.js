import React, { useEffect } from 'react'
import List from "./List"

function Products(props) {
    const [list, setList] = React.useState([])
    const [filters, setFilters] = React.useState([])
    const [price, setPrice] = React.useState([])
    const [color, setColor] = React.useState([])
    const [brand, setBrand] = React.useState([])

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
            console.log(element.type)
            if (element.type === "PRICE") {
                setPrice([element.values])
                console.log(element.values)
            } else if (element.type === "BRAND") {
                console.log([element.values])
                setBrand(element.values)
            } else if (element.type === "COLOUR") {
                console.log(element.values)
                setColor([element.values])
            }

        });
    }

    useEffect(() => {
        getFilters()
        getProducts()
    }, [])



    return (
        <div>
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">Logo</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <form class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>
                    <p class="username">{props.location.state.username}</p>
                </nav>
            </div>

            <div class="row ">
                <div class="col-sm-2 col-md-2 col-lg-2 ">
                    <div marginLeft>
                        {price.map((res) => {
                            return (
                                <div>
                                    <p>Filters</p>
                                    <div>
                                        <div class="dropdown">
                                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Select Price
                                             </button>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                {res.map((price) => {
                                                    return (
                                                        <option>{price.displayValue}</option>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <p class="h5 totMargin">Select Colors Below</p>
                                        {color.map((res) => {
                                            return (
                                                <div>
                                                    {res.map((color) => {
                                                        return (
                                                            <div>
                                                                <input type="checkbox" value={color.title} />
                                                                <label class="form-check-label" for="exampleCheck1">{color.title}</label>
                                                            </div>

                                                        )
                                                    })}
                                                </div>
                                            )
                                        })}
                                    </div>


                                    <div>
                                        <p class="h5 totMargin">Select Brands Below</p>
                                        {brand.map((res) => {
                                            return (
                                                <div>
                                                    <input type="checkbox" value={res.value}></input>
                                                    <label for="vehicle1">{res.title}</label>
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>
                <div class="col-sm-10 col-md-10 col-lg-10">
                    <List data={list}></List>
                </div>
            </div>
        </div >
    )
}

export default Products
