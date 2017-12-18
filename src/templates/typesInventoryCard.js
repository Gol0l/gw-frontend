import PropTypes from 'prop-types';

var propTypesTemplate = {
   item: PropTypes.shape({ image: PropTypes.string.isRequired,
                           name: PropTypes.string.isRequired,
                           itemId: PropTypes.string.isRequired,
                           price: PropTypes.number.isRequired}).isRequired,
   amount: PropTypes.number.isRequired
}

export {propTypesTemplate}
