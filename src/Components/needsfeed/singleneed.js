import React from 'react';



const SingleNeed = ({ need }) => {

    return (
        <div>
                <div className="need-text">Need Type: {need.needType}</div>
                <div className="need-text">Description: {need.needDescription}</div>
                <div className="need-text">Exchange Type: {need.exchangeType}</div>
                <div className="need-text">Exchange Description: {need.exchangeDescription}</div>
          
        </div>
    )
}

export default SingleNeed; 