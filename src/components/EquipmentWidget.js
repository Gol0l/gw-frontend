import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Shop} from './Shop.js';
import {InpShop} from '../inpclasses/InpShop.js';
import {Inventory} from './Inventory.js';
import {InpInventory} from '../inpclasses/InpInventory.js';
import {FooterBar} from './FooterBar.js';
import {InpFooterBar} from '../inpclasses/InpFooterBar.js';


class EquipmentWidget extends React.Component {

   constructor(props) {
      super(props);
      this.state = ({shopOpen: false});
      this.changeShopState = this.changeShopState.bind(this);
   }

   changeShopState() {
      var currentState = this.state.shopOpen;
      this.setState({shopOpen: !currentState});
   }
   render() {
      var width = window.screen.width * (window.innerWidth / window.screen.width)**(1 / 2) * (1 / 4);
      var height = window.screen.height * (window.innerHeight / window.screen.height)**(1 / 2) * (2 / 5);
      var barHeight = 40;

      var shopElement = (this.state.shopOpen) ? <div  style = {{position: "absolute", width: width * 0.8, height: height, bottom: 2 + barHeight, right: "0.0%"}}
                                                   className = "themeTextDefault">
                                                <Inventory inp = {new InpInventory({shopItems: this.props.inp.shopItems,
                                                                                    playerInventory: this.props.inp.playerInfo.inventory,
                                                                                    sizeOfRow: 2,
                                                                                    sizeOfColumn: 5 * (35 / 65)})} />
                                                <Shop inp = {new InpShop({ shopItems: this.props.inp.shopItems,
                                                                           sizeOfRow: 2,
                                                                           sizeOfColumn: 5,
                                                                           returnTransactions: this.props.inp.shopProcessTransactions,
                                                                           userBalance: this.props.inp.playerInfo.balance})} />
                                                </div> : <div></div>;
      return (
         <div>
            <div style = {{position: "absolute", right: "0.0%", bottom: 2, height: barHeight, width: width}}>
               <FooterBar inp = {new InpFooterBar({playerInfo: this.props.inp.playerInfo,
                                                   handleShopClicked: this.changeShopState})} />
            </div>
               {shopElement}
         </div>
      )
   }
}

export {EquipmentWidget};
