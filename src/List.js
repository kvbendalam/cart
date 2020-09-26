import React from 'react'
import "./list.css"

function List(props) {

    function handleChange() {
        props.onChange("1")
    }

    return (
        <div className="flex-container">
            {props.data.map((res) => {
                return (
                    <div className="card" key={res.image} >
                        <img className="card-img-top" src={res.image} alt={res.image} />
                        <div className="card-body">
                            <h5 className="card-title">{res.title}</h5>
                            <div class="row">
                                <div class="col-lg-6 col-md-6 col-sm-6">
                                    <p className="card-text" style={{ color: res.colour.title }}>{res.colour.title}</p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6">
                                    <p className="card-text">{res.brand}</p>
                                </div>
                            </div>
                            <p className="card-text"><b>Rs.{res.price.final_price} </b><strike>{res.price.mrp}</strike>{res.discount > 0 ? (res.discount + "%") : ''}</p>
                            <button className="btn btn-primary addTocart" onClick={handleChange}>Add to Cart</button>
                        </div>
                    </div>
                )
            })}
        </ div >
    )
}

export default List
