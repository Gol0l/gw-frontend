import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {InventoryCard} from './InventoryCard.js';
import {InpInventoryCard} from '../inpclasses/InpInventoryCard.js';


class Inventory extends React.Component {

   constructor(props) {
      super(props);
   }

   render() {
      const inventoryItems = this.props.inp.inventoryItems;
      const sizeOfRow = this.props.inp.sizeOfRow;
      const sizeOfColumn = this.props.inp.sizeOfColumn;
      var cardList = [];
      var rowList = [];
      var row = [];
      for (var i = 0; i < inventoryItems.length; i++) {
         var card = <InventoryCard id = {inventoryItems[i].itemId} inp = {new InpInventoryCard({item: inventoryItems[i]})} />;

         row.push(<div  style = {{height: "100%", width: (96.0 / sizeOfRow).toString() + "%", marginRight: "2%"}}
                        className = "themeHoverDefault noPadding themeBorderDefault themeTextDefault"> {card} </div>);

         if (row.length == sizeOfRow || i == inventoryItems.length - 1) {
            rowList.push(<div id = {i} style = {{  display: "flex", justifyContent: "flex-start",
                                                   width: "98%", height: (91.0 / sizeOfColumn).toString() + "%", marginTop: "2%", marginLeft: "2%"}}> {row} </div>);
            row = [];
         }
      }


      return (
         <div  style = {{  position: "relative", top: "0%", right: "1%", width: "100%", height: "35%",
                           backgroundColor: "rgba(20, 20, 20, 0.4)", fontSize: "0.9em"}}
               className = "themeShadowDefault">
            <div  style = {{position: "relative", width: "100%", height: "90%", overflowX: "hidden", overflowY: "auto", paddingBottom: 0}}
                  className = "scrollbar">
               {rowList}
               <div style = {{width: "100%", height: "2%"}}></div>
            </div>
            <div style = {{height: "8px", borderStyle: "none", borderTopStyle: "double", borderWidth: "2px", backgroundColor: "rgba(60, 60, 60, 0.4)"}} className = "themeBorderDefault">
            </div>
         </div>



      )
   }
}

export {Inventory};
