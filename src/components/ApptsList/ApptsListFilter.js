import React from 'react';
import PropTypes from 'prop-types';


const ApptsListFilter = props => {
  const array = [
    {
      id: 'all',
      rep: 'ВСЕ'
    },
    {
      id: 'active',
      rep: 'запланированные',
    },
    {
      id: 'past',
      rep: 'прошедшие',
    }
  ]

  return array.map(item => {
        return props.renderButtons(item.id, item.rep)
      })}

ApptsListFilter.propTypes = {
  filterId: PropTypes.string.isRequired,
};

function areEqual(prevProps, nextProps) {
  if (prevProps.filterId === nextProps.filterId) return true;
  else return false;
}

export default React.memo(ApptsListFilter, areEqual);