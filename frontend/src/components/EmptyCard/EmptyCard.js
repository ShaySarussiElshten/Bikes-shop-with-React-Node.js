import React from 'react'
import './emptyCard.css'


const EmptyCard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body cart">
                            <div className="col-sm-12 empty-cart-cls text-center"> <img src="https://i.imgur.com/dCdflKN.png" width="130" alt="..." height="130" className="img-fluid mb-4 mr-3" />
                                <h3><strong>Your Cart is Empty</strong></h3>
                                <h4>Add something to make me happy :-)</h4> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmptyCard
