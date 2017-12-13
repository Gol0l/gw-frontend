import React, { Component } from 'react';
import ReactDOM from 'react-dom';



class FooterBar extends React.Component {

   constructor(props) {
      super(props);
   }


   render() {

      return (
         <div  style = {{width: "100%", height: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}
               className = "themeBorderDefault themeTextDefault themeShadowDefault themeBackgroundGreyDarkNoHover noPadding">

               <div style = {{marginLeft: "3%", fontSize: "20px"}}>
                  <div>
                     userRank userName
                  </div>
               </div>
               <div  style = {{marginRight: "3%"}}
                     className = "themeBackgroundDefault themeBorderDefault themeShadowDefault"
                     onClick = {this.props.inp.handleShopClicked}>
                     Shop
               </div>

         </div>

      )
   }
}

export {FooterBar};
