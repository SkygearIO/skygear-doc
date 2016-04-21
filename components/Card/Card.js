import { map } from 'lodash';
import React, { Component } from 'react';
import Link from '../Link';

import './Card.scss';

class Card extends Component {
  render() {
    const {
      title,
      description,
      icon,
      buttons,
      className
    } = this.props;

    let buttonList = map(buttons, (perButtonInfo, perButtonIndex) => {
      return (
        <li key={'button-' + perButtonIndex}>
          <Link to={perButtonInfo.url || '#'}>
            <span>{perButtonInfo.name}</span>
          </Link>
        </li>
      );
    });

    let iconImage;
    if (icon) {
      iconImage = <img src={icon} />;
    }

    return (
      <li className={'Card ' + className}>
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
  }
}

Card.defaultProps = {
  title: '',
  description: '',
  className: '',
  icon: undefined,
  buttons: []
};

export default Card;