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
  container: 'guide-search-widget',
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
    this.onSuggestionsClearRequested =
      this.onSuggestionsClearRequested.bind(this);
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

        this.setState({
          suggestions: sections.map((eachSection) => ({
            ...eachSection,
            suggestions: suggestionMap[eachSection.id],
          })),
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

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  getSectionSuggestions(section) {
    return section.suggestions;
  }

  getSuggestionValue(suggestion) {
    return suggestion.title;
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
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
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
      />
    );
  }
}

export default GuideSearchWidget;
