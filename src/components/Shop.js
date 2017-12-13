import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {ShopCard} from './ShopCard.js';
import {InpShopCard} from '../inpclasses/InpShopCard.js';


class Shop extends React.Component {

   constructor(props) {
      super(props);
      var cart = {};
      for (var i = 0; i < this.props.inp.shopItems.length; i++) {
         cart[this.props.inp.shopItems[i].itemId] = 0;
      }
      this.state = {cart: cart,
                    virtualBalance: this.props.inp.userBalance};

      this.changeCart = this.changeCart.bind(this);
      this.checkout = this.checkout.bind(this);
      this.resetCart = this.resetCart.bind(this);
   }

   changeCart(itemId, change, price) {
      if (this.state.virtualBalance >= change * price) {
         var cart = this.state.cart;
         cart[itemId] += change;
         var virtualBalance = this.state.virtualBalance;
         virtualBalance -= change * price;
         this.setState({cart: cart, virtualBalance: virtualBalance});

      }
   }

   checkout() {
      this.props.inp.returnTransactions(this.state.cart);
      this.resetCart();
   }

   resetCart() {
      var cart = {};
      for (var i = 0; i < this.props.inp.shopItems.length; i++) {
         cart[this.props.inp.shopItems[i].itemId] = 0;
      }
      this.setState({cart: cart, virtualBalance: this.props.inp.userBalance});
      console.log("reset cart");
   }

   render() {
      const shopItems = this.props.inp.shopItems;
      const sizeOfRow = this.props.inp.sizeOfRow;
      const sizeOfColumn = this.props.inp.sizeOfColumn;
      var cardList = [];
      var rowList = [];
      var row = [];
      for (var i = 0; i < shopItems.length; i++) {
         var card = <ShopCard id = {shopItems[i].itemId} inp = {new InpShopCard({item: shopItems[i], status: this.state.cart[shopItems[i].itemId],
                                                      changeCart: this.changeCart})} />;

         row.push(<div  style = {{height: "100%", width: (96.0 / sizeOfRow).toString() + "%", marginRight: "2%"}}
                        className = "themeHoverDefault noPadding themeBorderDefault themeTextDefault"> {card} </div>);

         if (row.length == sizeOfRow || i == shopItems.length - 1) {
            rowList.push(<div id = {i} style = {{  display: "flex", justifyContent: "flex-start",
                                                   width: "98%", height: (91.0 / sizeOfColumn).toString() + "%", marginTop: "2%", marginLeft: "2%"}}> {row} </div>);
            row = [];
         }
      }


      return (
         <div  style = {{  position: "relative", top: "0%", width: "100%", height: "65%", fontSize: "0.9em"}}
               className = "themeShadowDefault themeBackgroundGreyDarkNoHover noPadding">
            <div  style = {{position: "relative", width: "100%", height: "90%", overflowX: "hidden", overflowY: "auto", paddingBottom: 0}}
                  className = "scrollbar">
               {rowList}
               <div style = {{width: "100%", height: "2%"}}></div>
            </div>
            <div style = {{height: "10%", borderStyle: "none", borderTopStyle: "solid", borderWidth: "2px", backgroundColor: "rgba(60, 60, 60, 0.4)",
                           display: "flex", justifyContent: "flex-end", alignItems: "center"}}
                  className = "themeBorderDefault themeTextDefault">
                  <div style = {{marginRight: "auto", marginLeft: "2%", fontSize: "1.2em"}}>
                     {this.state.virtualBalance}
                  </div>
                  <div style = {{height: "100%", marginRight: "2%"}} className = "themeHoverStrong" onClick = {this.resetCart}>
                     <img style = {{width: "auto", height: "100%"}} src = {require('../img/shopIcons/cross.png')}/>
                  </div>
                  <div style = {{height: "100%", marginRight: "2%"}} className = "themeHoverStrong" onClick = {this.checkout}>
                     <img style = {{width: "auto", height: "100%"}} src = {require('../img/shopIcons/checkmark.png')}/>
                  </div>
            </div>
         </div>



      )
   }
}

export {Shop};
