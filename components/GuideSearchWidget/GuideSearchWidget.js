import _ from 'lodash';
import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import algoliasearch from 'algoliasearch';

import GuideSearchItem from './GuideSearchItem';

import { algoliaApplicationID, algoliaSearchApiKey } from '../../config';

import './GuideSearchWidget.scss';

// AutosuggestTheme defines what className will be assigned to
// components under Autosuggest
const AutosuggestTheme = {
  container: 'guide-search-widget',
  input: 'search-input',
  inputOpen: 'search-input-active',
  inputFocused: 'search-input-active',
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
    this.onSuggestionsFetchRequested
      = _.debounce(this.onSuggestionsFetchRequested.bind(this), 300);
    this.onSuggestionsClearRequested =
      this.onSuggestionsClearRequested.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);

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

        this.setState({
          suggestions: guides.hits,
        });
      });
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  getSuggestionValue(suggestion) {
    return suggestion.title;
  }

  renderSuggestion(suggestion) {
    return <GuideSearchItem item={suggestion} />;
  }

  render() {
    const { value, suggestions } = this.state;
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={{
          value: value,
          onChange: this.onChange,
        }}
        theme={AutosuggestTheme}
      />
    );
  }
}

export default GuideSearchWidget;
