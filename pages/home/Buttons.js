import React from 'react';
import { Link } from 'react-router';
import './Buttons.scss';

import GuideIcon from '../../static/images/guides-icon.png';
import ApiReferenceIcon from '../../static/images/api-ref.png';
import SupportIcon from '../../static/images/support.png';

const Buttons = () => (
  <div className="buttons-wrapper">
    <div className="buttons-row">
      <div className="buttons-column">
        <div className="buttons-background-fill">
          <div className="landing-button-container">
            <Link to="/guides">
              <div className="landing-button">
                <div className="relative-container">
                  <img src={GuideIcon} role="presentation" />
                  <h2>Guides</h2>
                  <div className="linkText">
                    <span>View the guides</span>
                    <div className="landing-button-arrow" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="buttons-column">
        <div className="buttons-background-fill">
          <div className="landing-button-container">
            <Link to="/api-reference">
              <div className="landing-button">
                <div className="relative-container">
                  <img src={ApiReferenceIcon} role="presentation" />
                  <h2>API Reference</h2>
                  <div className="linkText">
                    <span>View the API Reference</span>
                    <div className="landing-button-arrow" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="buttons-column">
        <div className="buttons-background-fill">
          <div className="landing-button-container">
            <div className="landing-button">
              <div className="relative-container">
                <img src={SupportIcon} role="presentation" />
                <h2>Support</h2>
                <div className="linkText">
                  <span>Get support</span>
                  <div className="landing-button-arrow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Buttons;
