import React from 'react';

import './Support.scss';

const Support = () => (
  <div className="support-container">
    <div className="support-row">
      <div className="support-column">
        <div className="support-item-container">
          <a href="https://github.com/skygear-demo" target="_blank">
            <div className="support-item">
              <div className="vertical-align">
                <div className="icon sample-project" />
                <div className="content-wrapper">
                  <h2>Sample Project</h2>
                  <p className="description">
                    Get inspirations for your own applications with these samples.
                  </p>
                  <div className="linkText">
                    <span>View more on GitHub</span>
                    <div className="right-arrow" />
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className="support-column">
        <div className="support-item-container">
          <a href="https://stackoverflow.com/questions/tagged/skygear" target="_blank">
            <div className="support-item">
              <div className="vertical-align">
                <div className="icon google-group" />
                <div className="content-wrapper">
                  <h2>Stack Overflow</h2>
                  <p className="description">
                    We will answer any questions tagged with
                    skygear on Stack Overflow as soon as we can!
                  </p>
                  <div className="linkText">
                    <span>Ask questions at Stackoverflow</span>
                    <div className="right-arrow" />
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className="support-column">
        <div className="support-item-container">
          <a href="https://groups.google.com/forum/#!forum/skygear-user-group" target="_blank">
            <div className="support-item">
              <div className="vertical-align">
                <div className="icon google-group" />
                <div className="content-wrapper">
                  <h2>Google Group</h2>
                  <p className="description">
                    Connect with other developers to share tips and get guestions answered.
                  </p>
                  <div className="linkText">
                    <span>Join our Google group</span>
                    <div className="right-arrow" />
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className="support-column">
        <div className="support-item-container">
          <a href="https://skygear.signup.team/" target="_blank">
            <div className="support-item">
              <div className="vertical-align">
                <div className="icon google-group" />
                <div className="content-wrapper">
                  <h2>Slack</h2>
                  <p className="description">
                    Slack team for direct chat with Skygear Developers for support,
                    or discuss and learn from other Skygear Users.
                  </p>
                  <div className="linkText">
                    <span>Join our Slack team</span>
                    <div className="right-arrow" />
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className="support-column">
        <div className="support-item-container">
          <a href="mailto:hello@skygear.io">
            <div className="support-item">
              <div className="vertical-align">
                <div className="icon email" />
                <div className="content-wrapper">
                  <h2>Email Us</h2>
                  <p className="description">
                    Send us questions directly and we will answer ASAP.
                  </p>
                  <div className="linkText">
                    <span>Email to hello@skygear.io</span>
                    <div className="right-arrow" />
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Support;
