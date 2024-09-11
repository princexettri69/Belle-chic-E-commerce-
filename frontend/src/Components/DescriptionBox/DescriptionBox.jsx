import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews(150)</div>
            </div>
            <div className="descriptionbox-description">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam aperiam corporis id velit odit quod asperiores ratione aliquam ab quis corrupti fugiat recusandae officiis, voluptatem unde at non blanditiis. Nisi.</p>
            </div>
        </div>
    )
}

export default DescriptionBox