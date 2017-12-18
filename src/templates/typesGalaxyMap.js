import PropTypes from 'prop-types';

var propTypesTemplate = {
   width: PropTypes.number.isRequired,
   height: PropTypes.number.isRequired,
   mapWidth: PropTypes.number.isRequired,
   mapHeight: PropTypes.number.isRequired,
   frameDim: PropTypes.shape({leftSize: PropTypes.number.isRequired,
                              topSize: PropTypes.number.isRequired,
                              rightSize: PropTypes.number.isRequired,
                              bottomSize: PropTypes.number.isRequired}).isRequired,
   simSettings: PropTypes.shape({mapScale: PropTypes.number.isRequired,
                                 systemPositionScale: PropTypes.number.isRequired,
                                 systemPositionOffsetLeft: PropTypes.number.isRequired,
                                 systemPositionOffsetTop: PropTypes.number.isRequired,
                                 systemScale: PropTypes.number.isRequired,
                                 simSpeed: PropTypes.number.isRequired,
                                 fps: PropTypes.number.isRequired,
                                 baseStarSize: PropTypes.number.isRequired,
                                 basePlanetSize: PropTypes.number.isRequired,
                                 centerMassScalingExponent: PropTypes.number.isRequired,
                                 systemScaleUiThreshold: PropTypes.number.isRequired,
                                 planetScalingExponent: PropTypes.number.isRequired,
                                 planetRadiusScale: PropTypes.number.isRequired,
                                 planetScaleUiThreshold: PropTypes.number.isRequired}).isRequired,
   systemsList: PropTypes.array.isRequired,
   selectedPlanet: PropTypes.string.isRequired,
   funcPlanetOnClick: PropTypes.func.isRequired,
   playerFaction: PropTypes.string.isRequired,
   globalUpdate: PropTypes.bool.isRequired
}

export {propTypesTemplate}
