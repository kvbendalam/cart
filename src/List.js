import React from 'react'
import "./list.css"

function List(props) {
    return (
        <div className="flex-container">
            {props.data.map((res) => {
                console.log(res)
                return (
                    <div className="card" key={res.image} >
                        <img className="card-img-top" src={res.image} alt={res.image} />
                        <div className="card-body">
                            <h5 className="card-title">{res.title}</h5>
                            <p className="card-text">{res.colour.title}</p>
                            <p className="card-text">{res.brand}</p>
                            <p className="card-text">{res.price.final_price}/-</p>
                            <a href="#" className="btn btn-primary addTocart">Add to Cart</a>
                        </div>
                    </div>
                )
            })}
        </ div >
    )
}

export default List
