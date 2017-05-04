import React from 'react';
import { Link } from 'react-router';

import Footer from '../../components/Footer/Footer';

import GuideIcon from '../../static/images/guides-icon.png';
import ApiReferenceIcon from '../../static/images/api-ref.png';
import SupportIcon from '../../static/images/support.png';

import './style.scss';

const NavButton = ({ to, icon, text, linkText }) => (
  <div className="nav-button">
    <div className="buttons-background-fill">
      <div className="landing-button-container">
        <Link to={to}>
          <div className="landing-button">
            <div className="relative-container">
              <img src={icon} role="presentation" />
              <h2>{text}</h2>
              <div className="linkText">
                <span>{linkText}</span>
                <div className="landing-button-arrow" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  </div>
);

const NavButtons = () => (
  <div className="nav-buttons">
    <div className="nav-button-row">
      <NavButton
        to="/guides/"
        text="Guides"
        linkText="View the guides"
        icon={GuideIcon}
      />
      <NavButton
        to="/api-reference/"
        text="API Reference"
        linkText="View the API Reference"
        icon={ApiReferenceIcon}
      />
      <NavButton
        to="/support/"
        text="Need Help?"
        linkText="Sample projects / Support"
        icon={SupportIcon}
      />
    </div>
  </div>
);

const ContributingItem = ({ title, url }) => (
  <li className="contributing-item">
    <a href={url}>{title}</a>
  </li>
);

const Contributing = () => (
  <div className="contributing-container">
    <div className="contributing-content-wrapper">
      <div className="contributing-content">
        <div className="contributing-title">
          <p className="contributing-title-text">Contributing</p>
        </div>
        <ul className="contributing-items">
          <ContributingItem
            title="How to contribute"
            url="https://github.com/SkygearIO/skygear-server#how-to-contribute"
          />
          <ContributingItem
            title="GitHub"
            url="https://github.com/skygeario/skygear-server"
          />
          <ContributingItem
            title="Releases"
            url="https://github.com/SkygearIO/skygear-server/releases"
          />
        </ul>
      </div>
    </div>
  </div>
);

export default () => (
  <div className="landing">
    <div className="banner">
      <div className="banner-bg">

        <div className="landing-header">
          <Link to="/" className="logo-anchor" />
        </div>

        <div className="quick-start">
          <h1>Documentation</h1>
          <p className="quick-start-hint">New to Skygear?</p>
          <Link
            className="quick-start-button"
            to="/guides/intro/quickstart/ios/"
          >
            Quick Start
          </Link>
        </div>

        <NavButtons />
      </div>
    </div>

    <Contributing />
    <Footer />
  </div>
);
