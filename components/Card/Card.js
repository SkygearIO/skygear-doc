import { map } from 'lodash';
import React, { PropTypes } from 'react';
import Link from '../Link';

import './Card.scss';

const Card = function (props) {
  const {
    title,
    description,
    icon,
    buttons,
    className,
  } = props;

  const buttonList = map(buttons, (perButtonInfo, perButtonIndex) => (
    <li key={`button-${perButtonIndex}`}>
      <Link to={perButtonInfo.url || '#'}>
        <span>{perButtonInfo.name}</span>
      </Link>
    </li>
  ));

  let iconImage;
  if (icon) {
    iconImage = <img src={icon} role="presentation" />;
  }

  return (
    <li className={`Card ${className}`}>
      <div className="container">
        {iconImage}
        <div className="info">
          <h3>{title}</h3>
          <span>{description}</span>
        </div>
      </div>
      <ul className="button-list">
        {buttonList}
      </ul>
    </li>
  );
};

Card.defaultProps = {
  title: '',
  description: '',
  className: '',
  icon: undefined,
  buttons: [],
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.string,
  buttons: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default Card;
