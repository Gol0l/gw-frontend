import PropTypes from 'prop-types';

var propTypesTemplate = {
   shopItems: PropTypes.array.isRequired,
   sizeOfRow: PropTypes.number.isRequired,
   sizeOfColumn: PropTypes.number.isRequired,
   returnTransactions: PropTypes.func.isRequired,
   userBalance: PropTypes.number.isRequired
}

export {propTypesTemplate}
