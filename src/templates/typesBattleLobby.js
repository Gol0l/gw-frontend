import PropTypes from 'prop-types';

var propTypesTemplate = {
   battleParticipants: PropTypes.array.isRequired,
   waitingProgress: PropTypes.number.isRequired,
   status: PropTypes.string.isRequired,
   maxPlayers: PropTypes.number.isRequired
}

export {propTypesTemplate}
