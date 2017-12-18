import PropTypes from 'prop-types';

var propTypesTemplate = {
   shopItems: PropTypes.array.isRequired,
   playerInventory: PropTypes.object.isRequired,
   sizeOfRow: PropTypes.number.isRequired,
   sizeOfColumn: PropTypes.number.isRequired
}

export {propTypesTemplate}
