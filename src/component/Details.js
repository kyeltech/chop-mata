import React, { Component } from 'react';
import {ProductConsumer} from '../Context'
import {Link } from 'react-router-dom'
import {ButtonContainer} from './Button'


class Details extends Component {
    render() {
        return (
         <ProductConsumer>
             {value => {
                 const {id, company,img, info,price,title,inCart} =
                 value.detailProduct;
                 return(
                     <div className="container py-5">
                         {/* title */}
                         <div className="row">
                        <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                            <h1>{title}</h1>
                        </div>
                         </div>
                         {/* end title */}
                         {/* Chopping Image */}
                         <div className="row">
                             <div className="col-10 mx-autocol-md-6 my-3">
                                 <img src={img} className="fluid" alt="chopping" />    
                             </div>
                             {/* chopping info text */}
                             <div className="col-10 mx-autocol-md-6 my-3 text capitalize" >
                                  <h3> model: {title}</h3>
                                  <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                      made by:<span className="text-uppercase">{company}</span>
                                  </h4>
                                  <h4 className="text-blue">
                                      <strong> 
                                          price: <span>
                                              $
                                          </span>
                                          {price}
                                      </strong>
                                      </h4>
                                      <span className="text-capitalize font-weight-bold mt-3 mb-0">some info about the making</span>
                                      <p className="text-muted lead">{info}</p>
                                     {/* buttons container */}
                                     <div>
                                        <Link to="/">
                                            <ButtonContainer>
                                                back to chop
                                            </ButtonContainer>
                                        </Link>
                                        <ButtonContainer 
                                        cart    
                                        disabled={inCart ? true : false}
                                        onClick={()=>{
                                            value.addToCart(id); 
                                            value.openModal(id);
                                        }}>

                                            {inCart ? "inCart" : "add to Cart"}
                                        </ButtonContainer>
                                     </div>
                             </div>
                         </div>
                     </div>
                 )
             }}

         </ProductConsumer>
        );
    }
}

export default Details;