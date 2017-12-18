import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {propTypesTemplate} from '../templates/typesShopCard.js'


class ShopCard extends React.Component {

   constructor(props) {
      super(props);
      this.state = {};

      this.addToCart = this.addToCart.bind(this);
      this.removeFromCart = this.removeFromCart.bind(this);
   }

   addToCart() {
      if (this.props.status < 999) {
         this.props.changeCart(this.props.item.itemId, 1, this.props.item.price);
      }
   }
   removeFromCart() {
      if (this.props.status > 0) {
         this.props.changeCart(this.props.item.itemId, -1, this.props.item.price);
      }
   }

   render() {

      return (
         <div style = {{width: "100%", height: "100%", display: "flex"}}>
            <div style = {{width: "auto", height: "100%"}}>
               <img style = {{width: "auto", height: "100%"}} src = {require('../img/shopIcons/' + this.props.item.image)}/>
            </div>
            <div style = {{display: "flex", justifyContent: "center", width: "100%", flexDirection: "column", whiteSpace: "nowrap"}}>
               <div style = {{textAlign: "center"}}>{this.props.item.name}</div>
               <div style = {{textAlign: "center"}}>{this.props.item.price}</div>
            </div>
            <div style = {{width: "20%", height: "100%", marginRight: "2%", display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}>
               <div className = "themeHoverStrong" style = {{height: "35%", marginTop: "10%", lineHeight: "0em"}} onClick = {this.addToCart}>
                  <img style = {{position: "relative", top: 0, width: "100%", height: "100%"}} src = {require('../img/shopIcons/upArrow.png')}/>
               </div>
               <div style = {{height: "40%", marginTop: "-15%", marginBottom: "-15%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1em"}}>
                  {this.props.status}
               </div>
               <div className = "themeHoverStrong" style = {{height: "35%", marginBottom: "10%", lineHeight: "0em"}} onClick = {this.removeFromCart}>
                  <img style = {{position: "relative", width: "100%", height: "100%"}} src = {require('../img/shopIcons/downArrow.png')}/>
               </div>
            </div>
         </div>

      )
   }
}

ShopCard.propTypes = propTypesTemplate;
export {ShopCard};
