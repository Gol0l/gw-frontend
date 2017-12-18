import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {propTypesTemplate} from '../templates/typesInventoryCard.js'


class InventoryCard extends React.Component {

   constructor(props) {
      super(props);
   }


   render() {

      return (
         <div style = {{width: "100%", height: "100%", display: "flex"}}>
            <div style = {{width: "auto", height: "100%"}}>
               <img style = {{width: "auto", height: "100%"}} src = {require('../img/shopIcons/' + this.props.item.image)}/>
            </div>
            <div style = {{display: "flex", justifyContent: "center", width: "100%", flexDirection: "column", whiteSpace: "nowrap"}}>
               <div style = {{textAlign: "center"}}>{this.props.item.name}</div>
            </div>
            <div style = {{width: "20%", height: "100%", marginRight: "2%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1em"}}>
               {this.props.amount}
            </div>
         </div>

      )
   }
}

InventoryCard.propTypes = propTypesTemplate;
export {InventoryCard};
