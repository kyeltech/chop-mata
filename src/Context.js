import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data'

const ProductContext = React.createContext();
// Provider
// whenever we create a context provider we are creating two things the consumer and the provider
// consumer
class ProductProvider extends Component {
state = {
products: [],
// will delete the storeProducts and set the product to an  empty array first
detailProduct: detailProduct,
cart : [],
modalOpen : false,
modalProduct : detailProduct,
cartSubTotal: 0,
cartTax: 0,
cartTotal: 10
};
componentDidMount() {
    this.setProducts() ;
}
setProducts = () => {
let tempProducts = [];
storeProducts.forEach(item => {
    const singleItem = {...item};
    tempProducts = [...tempProducts,singleItem];
})

this.setState(() => {
    return {products:tempProducts}
})
}
getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
};

handleDetail = (id) => { 
const product = this.getItem(id);
this.setState(() => {
    return{ deetailProduct : product }
})
};
addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1; 
    const price = product.price;
    product.total  = price;
    this.setState(() => { 
        return { products:tempProducts, cart:  [...this.state.cart,product] };
    }, () => {
     this.addTotals();
    }
    );
};
    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return{modalProduct:product, modalOpen:true}
        });
    }
        // anytime we click on the icon we are calling on modalProduct
        closeModal = () => {
            this.setState(() => {
                return {modalOpen:false}
            });
        };
    

//   in my addToCart method i have my item destructed and called, i have my count price changed and once you click on the cart icon for the items it adds item to cart
// and the icon then have the inCart text outputted


// tester = () => {
//     console.log('state product :', this.state.products[0].inCart);
//     console.log('Data products :', storeProducts[0].inCart);
// //  am setting up the tester for testing purposes only(the result is positive)
//     const tempProducts = [...this.state.products];
//     tempProducts[0].inCart = true
//     // turning the first product in data from false to true
//     this.setState(() => {
//         return {product:tempProducts}
//     }, () => {
//     console.log('state product :', this.state.products[0].inCart);
//     console.log('Data products :', storeProducts[0].inCart);
//         // callback function
//     }) 
// }
increment = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id ===id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count  + 1;
    product.total = product.total * product.count;

    this.setState(
        () => {
            return { cart:[...tempCart] };
        },
        ()=> {
            this.addTotals();
        })
};
decrement = id => {
  let tempCart = [...this.state.cart];
  const selectedProduct= tempCart.find(item => item.id === id);

  const index = tempCart.indexOf(selectedProduct);
  const product = tempCart[index]

  product.count = product.count - 1;
if(product.price === 0) {
    this.removeItem(id)
} else {
    product.total = product.count * product.price;
    this.setState(
        () => {
            return { cart:[...tempCart] };
        },
        ()=> {
            this.addTotals();
        })
}
};
removeItem = id => {
   let tempProducts = [...this.state.products];
   let tempCart = [...this.state.cart];

tempCart = tempCart.filter(item => item.id !== id);

   const index = tempProducts.indexOf(this.getItem(id));
   let removedProduct = tempProducts[index];
   removedProduct.inCart = false;
   removedProduct.count = 0;
   removedProduct.total = 0;

   this.setState(
       () => {
           return {
               cart: [...tempCart],
               products: [...tempProducts]
           };
       },
       ()=> {
           this.addTotals();
       }
   )

};
clearCart = () => {
 this.setState(() => {
     return {cart:[]}
 }, () =>{
this.setProducts();
this.addTotals();

 });
};
addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item =>(subTotal += item.total))
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2))
    const total = subTotal + tax
    this.setState(() => {
        return {
            cartSubTotal:subTotal,
            cartTax:tax,
            cartTotal:total
        }
    })
}



render() {
return (
<ProductContext.Provider 
value={{
...this.state, 
handleDetail: this.handleDetail,
addToCart: this.addToCart,
openModal: this.openModal,
closeModal: this.closeModal,
increment:this.increment,
decrement: this.decrement,
removeItem: this.removeItem,
clearCart: this.clearCart
}}>
{/* <button onClick={this.tester}>test me</button> */}
{/* here is button use for testing */}
{this.props.children}
</ProductContext.Provider>
);
}
}
const ProductConsumer = ProductContext.Consumer;


export   {ProductProvider, ProductConsumer};
