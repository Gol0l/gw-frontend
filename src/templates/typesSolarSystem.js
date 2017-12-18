import PropTypes from 'prop-types';

var propTypesTemplate = {
   id: PropTypes.string.isRequired,
   displayName: PropTypes.string.isRequired,
   top: PropTypes.number.isRequired,
   left: PropTypes.number.isRequired,
   gravPar: PropTypes.number.isRequired,
   simSettings: PropTypes.shape({scale: PropTypes.number.isRequired,
                                 fps: PropTypes.number.isRequired,
                                 simSpeed: PropTypes.number.isRequired,
                                 baseStarSize: PropTypes.number.isRequired,
                                 basePlanetSize: PropTypes.number.isRequired,
                                 centerMassScalingExponent: PropTypes.number.isRequired,
                                 systemScaleUiThreshold: PropTypes.number.isRequired,
                                 planetScalingExponent: PropTypes.number.isRequired,
                                 planetRadiusScale: PropTypes.number.isRequired,
                                 planetScaleUiThreshold: PropTypes.number.isRequired}).isRequired,
   centerMass: PropTypes.shape({ radius: PropTypes.number.isRequired,
                                 color: PropTypes.string.isRequired,
                                 coronaColor: PropTypes.string.isRequired,
                                 brightness: PropTypes.number.isRequired}).isRequired,
   planetList: PropTypes.array.isRequired,
   neighbours: PropTypes.array.isRequired,
   selectedPlanet: PropTypes.string.isRequired,
   funcPlanetOnClick: PropTypes.func.isRequired,
   funcSystemSelect: PropTypes.func.isRequired,
   globalUpdate: PropTypes.bool.isRequired
}

export {propTypesTemplate}
