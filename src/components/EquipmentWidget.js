import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Shop} from './Shop.js';
import {InpShop} from '../inpclasses/InpShop.js';
import {Inventory} from './Inventory.js';
import {InpInventory} from '../inpclasses/InpInventory.js';


class EquipmentWidget extends React.Component {

   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div  style = {{position: "absolute", width: "40vh", height: "40vh", bottom: "0.8%", right: "0.1%"}}
               className = "themeTextDefault">
            <Inventory inp = {new InpInventory({inventoryItems: this.props.inp.inventoryItems,
                                                sizeOfRow: 2,
                                                sizeOfColumn: 5 * (35 / 65)})} />
            <Shop inp = {new InpShop({ shopItems: this.props.inp.shopItems,
                                       sizeOfRow: 2,
                                       sizeOfColumn: 5,
                                       returnTransactions: this.props.inp.shopProcessTransactions,
                                       userBalance: this.props.inp.userBalance})} />
         </div>
      )
   }
}

export {EquipmentWidget};
