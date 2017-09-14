import React, { Component, PropTypes } from 'react';

import Header from '../../components/Header/Header';

import prScreenshot from '../../static/assets/contribute/pr-screenshot.png';

import { guideEditBaseUrl } from '../../config';
import { getWindow } from '../../utils/browserProxy';

import './style.scss';

export const LocalStorageKey = 'contribute-do-not-show-again';

class ContributePage extends Component {
  constructor(props) {
    super(props);

    this.onRedirectButtonClick = this.onRedirectButtonClick.bind(this);
    this.onDoNotShowAgainToggleValueChange
      = this.onDoNotShowAgainToggleValueChange.bind(this);

    // restore do not show again button state
    this.state = {
      doNotShowAgain: getWindow().localStorage.getItem(LocalStorageKey) === 'true',
    };
  }

  componentWillMount() {
    const { router } = this.props;
    const { query } = router.location;

    if (!query || !query.file) {
      router.replace('/');
      return;
    }

    this.setState({
      redirectFilePath: query.file,
    });
  }

  onRedirectButtonClick() {
    const { doNotShowAgain, redirectFilePath } = this.state;

    const Window = getWindow();
    Window.localStorage.setItem(LocalStorageKey, doNotShowAgain);
    Window.location = `${guideEditBaseUrl}${redirectFilePath}`;
  }

  onDoNotShowAgainToggleValueChange(event) {
    this.setState({
      doNotShowAgain: event.target.checked,
    });
  }

  render() {
    return (
      <section className="contribute-page">
        <Header />
        <div className="wrapper">
          <div className="content">
            <h1>Contributing to the Skygear guides</h1>
            <h2>Thanks for your ♥ for Skygear</h2>
            <hr />
            <p>
              You're seeing this page most probably because you want to make edit
              to the Skygear doc. We're thrilled to have your input!
            </p>
            <p>There's a few things you need to know:</p>
            <ol>
              <li>
                We use Github to organise the Skygear guides in Markdown format.
              </li>
              <li>
                You can make direct edits to the guides on GitHub. We'll direct
                you to the Markdown file of the guide you're currently visiting.
              </li>
              <li>
                <span>
                  When you're done editing, submit a Pull Request at the bottom
                  of the page.
                </span>
                <img src={prScreenshot} alt="Pull Request Screen Shot" />
              </li>
              <li>
                Our editor will review your Pull Request with 2 days. He will
                notify you the status of the PR after the review.
              </li>
              <li>
                If you have any suggestion for the guides but it's too complex
                for quick edit,&nbsp;
                <a
                  href="https://github.com/SkygearIO/guides/issues/new"
                  target="_blank"
                >
                  open an issue
                </a>
                &nbsp;instead.
              </li>
            </ol>
            <p>Thanks again for contributing!</p>
            <button onClick={this.onRedirectButtonClick}>
              Make Changes Now
            </button>
            <div className="input-group">
              <input
                type="checkbox"
                id="do-not-show-again"
                onChange={this.onDoNotShowAgainToggleValueChange}
                checked={this.state.doNotShowAgain}
              />
              <label htmlFor="do-not-show-again">
                Don't show this page again next time.
              </label>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

ContributePage.propTypes = {
  router: PropTypes.object,
};

export default ContributePage;
