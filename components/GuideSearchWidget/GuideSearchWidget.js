import _ from 'lodash';
import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import algoliasearch from 'algoliasearch';

import GuideSearchItem from './GuideSearchItem';

import { algoliaApplicationID, algoliaSearchApiKey } from '../../config';

import algoliaLogo from '../../static/images/icn-search-by-algolia.svg';

import './GuideSearchWidget.scss';

// AutosuggestTheme defines what className will be assigned to
// components under Autosuggest
const AutosuggestTheme = {
  input: 'search-input',
  inputOpen: 'search-input-active',
  inputFocused: 'search-input-active',
  sectionContainer: 'suggestion-section-container',
  sectionTitle: 'suggestion-section-title',
  suggestionsContainer: 'suggestion-container',
  suggestionsContainerOpen: 'suggestion-container-open',
  suggestionsList: 'suggestion-list',
  suggestion: 'suggestion-list-item',
  suggestionHighlighted: 'suggestion-list-item-highlighted',
};

const MaxSuggestionCount = 5;

class GuideSearchWidget extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSuggestionsFetchRequested
      = _.debounce(this.onSuggestionsFetchRequested.bind(this), 300);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.getSectionSuggestions = this.getSectionSuggestions.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSectionTitle = this.renderSectionTitle.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.renderSuggestionsContainer = this.renderSuggestionsContainer.bind(this);

    const algoliaClient = algoliasearch(algoliaApplicationID, algoliaSearchApiKey);
    this.algoliaIndex = algoliaClient.initIndex('guides');

    this.state = {
      value: '',
      suggestions: [],
    };
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue,
    });
  }

  onKeyDown(event) {
    if (event.keyCode === 13) {
      // enter key
      this.onSuggestionsFetchRequested(this.state);
    }
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      noResults: false,
    });

    if (value.length === 0) {
      this.setState({
        suggestions: [],
      });
      return;
    }

    this.algoliaIndex.search(
      value,
      { hitsPerPage: MaxSuggestionCount },
      (err, guides) => {
        if (err) {
          console.error('Failed to search', err); // eslint-disable-line
          return;
        }

        const sections = [];
        const suggestionMap = {};

        guides.hits.forEach((eachGuide) => {
          const guideSection = eachGuide.meta.section;
          if (!suggestionMap[guideSection.id]) {
            sections.push(guideSection);
            suggestionMap[guideSection.id] = [];
          }

          suggestionMap[guideSection.id].push(eachGuide);
        });

        const suggestions = sections.map((eachSection) => ({
          ...eachSection,
          suggestions: suggestionMap[eachSection.id],
        }));

        this.setState({
          noResults: suggestions.length === 0,
          suggestions,
        });
      });
  }

  onSuggestionSelected(event, { suggestion }) {
    const { url } = suggestion;
    if (!url) {
      console.error('Failed to get the url of search item'); // eslint-disable-line
      return;
    }

    try {
      window.location = url;
    } catch (e) {
      // skip heading to the url
    }
  }

  getSectionSuggestions(section) {
    return section.suggestions;
  }

  getSuggestionValue(suggestion) {
    return suggestion.title;
  }

  renderEmptyState() {
    if (!this.state.noResults) {
      return null;
    }

    return (
      <div className="guide-search-empty">
        <span>Sorry, no results found. Try different keywords?</span>
        <img src={algoliaLogo} alt="Search by Algolia" />
      </div>
    );
  }

  renderSectionTitle(section) {
    return section.name;
  }

  renderSuggestion(suggestion) {
    return <GuideSearchItem item={suggestion} />;
  }

  renderSuggestionsContainer({ containerProps, children }) {
    return (
      <div {...containerProps}>
        <div className="suggestion-container-header">Guides</div>
        <div className="suggestion-container-content">
          {children}
        </div>
        <div className="suggestion-container-footer">
          <img src={algoliaLogo} alt="Search by Algolia" />
        </div>
      </div>
    );
  }

  render() {
    const { value, suggestions } = this.state;
    return (
      <section className="guide-search-widget">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSectionSuggestions={this.getSectionSuggestions}
          getSuggestionValue={this.getSuggestionValue}
          renderSectionTitle={this.renderSectionTitle}
          renderSuggestion={this.renderSuggestion}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
          inputProps={{
            value: value,
            onChange: this.onChange,
            onKeyDown: this.onKeyDown,
            placeholder: 'Search',
          }}
          theme={AutosuggestTheme}
          multiSection
          alwaysRenderSuggestions
        />
        {this.renderEmptyState()}
      </section>
    );
  }
}

export default GuideSearchWidget;
