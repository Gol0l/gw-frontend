import PropTypes from 'prop-types';

var propTypesTemplate = {
   left: PropTypes.number.isRequired,
   top: PropTypes.number.isRequired,
   minLeft: PropTypes.any.isRequired,
   minTop: PropTypes.any.isRequired,
   maxLeft: PropTypes.any.isRequired,
   maxTop: PropTypes.any.isRequired,
   returnShiftedPosition: PropTypes.func.isRequired,
   content: PropTypes.node.isRequired,
}

export {propTypesTemplate}
