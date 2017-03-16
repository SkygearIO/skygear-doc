import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

import './GuideSearchWidget.scss';

// AutosuggestTheme defines what className will be assigned to
// components under Autosuggest
const AutosuggestTheme = {
  container: 'guide-search-widget',
  input: 'search-input',
  suggestionsContainer: 'suggestion-container',
  suggestionsContainerOpen: 'suggestion-container-open',
  suggestionsList: 'suggestion-list',
  suggestion: 'suggestion-list-item',
  suggestionHighlighted: 'suggestion-list-item-highlighted',
};

const MaxSuggestionCount = 4;

class GuideSearchWidget extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);

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
    // FIXME: Replace it with the real algoria search API
    if (value.length === 0) {
      return;
    }

    setTimeout(() => {
      const { suggestions } = this.state;
      suggestions.push({ value });

      this.setState({
        suggestions: suggestions.slice(-MaxSuggestionCount),
      });
    }, 300);
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  getSuggestionValue({ value }) {
    return value;
  }

  renderSuggestion(suggestion) {
    return <span>{suggestion.value}</span>;
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
