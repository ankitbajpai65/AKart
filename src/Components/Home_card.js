import React from 'react'

const Home_card = () => {
    return (
        <div className="container-fluid sections">
            <div className="sections_subDiv row d-flex
                justify-content-evenly align-items-center">
                <div className="col-3 card_home">Men</div>
                <div className="col-3 card_home">Women</div>
                <div className="col-3 card_home">Accessories</div>
            </div>
        </div>
    )
}

export default Home_card;