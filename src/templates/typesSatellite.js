import PropTypes from 'prop-types';

var propTypesTemplate = {
   id: PropTypes.string.isRequired,
   displayName: PropTypes.string.isRequired,
   system_Id: PropTypes.string.isRequired,
   start: PropTypes.any.isRequired,
   radius: PropTypes.number.isRequired,
   size: PropTypes.number.isRequired,
   content: PropTypes.string.isRequired,
   settings: PropTypes.shape({gravPar: PropTypes.number.isRequired,
                              displayScale: PropTypes.number.isRequired,
                              fps: PropTypes.number.isRequired,
                              simSpeed: PropTypes.number.isRequired,
                              planetScalingExponent: PropTypes.number.isRequired,
                              planetScaleUiThreshold: PropTypes.number.isRequired}).isRequired,
   spin: PropTypes.number.isRequired,
   faction: PropTypes.string.isRequired,
   status: PropTypes.string.isRequired,
   isSelected: PropTypes.bool.isRequired,
   funcPlanetOnClick: PropTypes.func.isRequired
}

export {propTypesTemplate}
