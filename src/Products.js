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
            {/* {JSON.stringify(props.location.state.username)} */}
            {price.map((res) => {
                // console.log(res)
                return (
                    <div>
                        <p key={res.key} > {res.displayValue}</p>
                    </div>
                )

            })}

            {/* <List data={list}></List> */}
        </div >
    )
}

export default Products
