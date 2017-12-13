import React, { Component } from 'react';
import ReactDOM from 'react-dom';



class InventoryCard extends React.Component {

   constructor(props) {
      super(props);
   }


   render() {

      return (
         <div style = {{width: "100%", height: "100%", display: "flex"}}>
            <div style = {{width: "auto", height: "100%"}}>
               <img style = {{width: "auto", height: "100%"}} src = {require('../img/shopIcons/' + this.props.inp.item.image)}/>
            </div>
            <div style = {{display: "flex", justifyContent: "center", width: "100%", flexDirection: "column", whiteSpace: "nowrap"}}>
               <div style = {{textAlign: "center"}}>{this.props.inp.item.name}</div>
            </div>
            <div style = {{width: "20%", height: "100%", marginRight: "2%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1em"}}>
               {this.props.inp.amount}
            </div>
         </div>

      )
   }
}

export {InventoryCard};
