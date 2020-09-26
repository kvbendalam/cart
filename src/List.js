import React from 'react'
import "./list.css"

function List(props) {

    function handleChange() {
        props.onChange("1")
    }

    return (
        <div className="flex-container">
            {props.data.map((res) => {
                // console.log(res)
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
                            <p className="card-text">{res.price.final_price}/-</p>
                            <a href="#" className="btn btn-primary addTocart" onClick={handleChange}>Add to Cart</a>
                        </div>
                    </div>
                )
            })}
        </ div >
    )
}

export default List
