import React from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import './style.scss';

const SupportItem = ({
  url,
  title,
  description,
  iconClassName,
  linkText
}) => (
  <div className="support-item">
    <div className="support-item-container">
      <a href={url} target="_blank">
        <div className="support-item-box">
          <div className="vertical-align">
            <div className={`icon ${iconClassName}`} />
            <div className="content-wrapper">
              <h2>{title}</h2>
              <p className="description">{description}</p>
              <div className="linkText">
                <span>{linkText}</span>
                <div className="right-arrow" />
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
);

export default () => (
  <div className="support-page">
    <Header />
    <div className="support-container">
      <div className="support-content">
        <div className="support-items">
          <SupportItem
            url="https://github.com/skygear-demo"
            title="Sample Project"
            description={
              "Get inspirations for your own applications with these samples."
            }
            iconClassName="sample-project"
            linkText="View more on GitHub"
          />
          <SupportItem
            url="https://stackoverflow.com/questions/tagged/skygear"
            title="Stack Overflow"
            description={
              "We will answer any questions tagged with" +
              "skygear on Stack Overflow as soon as we can!"
            }
            iconClassName="stackoverflow"
            linkText="Ask questions at Stackoverflow"
          />
          <SupportItem
            url="https://groups.google.com/forum/#!forum/skygear-user-group"
            title="Google Group"
            description={
              "Connect with other developers to share tips and get " +
              "guestions answered."
            }
            iconClassName="google-group"
            linkText="Join our Google Group"
          />
          <SupportItem
            url="https://skygear.signup.team/"
            title="Slack"
            description={
              "Slack team for direct chat with Skygear Developers " +
              "for support, or discuss and learn from other Skygear Users."
            }
            iconClassName="slack"
            linkText="Join our Slack team"
          />
          <SupportItem
            url="mailto:hello@skygear.io"
            title="Email Us"
            description="Send us questions directly and we will answer ASAP."
            iconClassName="email"
            linkText="Email to hello@skygear.io"
          />
        </div>
      </div>

      <Footer />
    </div>
  </div>
);
