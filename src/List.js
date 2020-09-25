import React from 'react'
import "./list.css"

function List(props) {
    return (
        <div class="flex-container">
            {props.data.map((res) => {
                return (
                    <div className="card">
                        <img src={res.image} alt={res.image} />
                        <div className="container">
                            <p><b>{res.title}</b></p>
                            <p>{res.brand}</p>
                            <p>{res.colour.title}</p>
                            <p>Rs {res.price.final_price}/-</p>
                            <button>Add to Cart</button>
                        </div>
                    </div>
                )
            })}
        </ div >
    )
}

export default List
