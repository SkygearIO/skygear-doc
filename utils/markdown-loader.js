/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const url = require('url');

const MarkdownIt = require('markdown-it');
const MarkdownItContainer = require('markdown-it-container');
const MarkdownItAnchor = require('markdown-it-anchor');
const MarkdownItTOC = require('markdown-it-table-of-contents');
const MarkdownItLinkAttributer = require('./markdown-link-attributer');
const hljs = require('highlight.js');
const fm = require('front-matter');

function isInternalLink(urlString) {
  const urlObject = url.parse(urlString);
  return (
    !urlObject ||
    !urlObject.hostname ||
    urlObject.hostname === 'localhost' ||
    urlObject.hostname === 'docs.skygear.io' ||
    urlObject.hostname === 'docs-staging.skygear.io'
  );
}

function isGithubLink(urlString) {
  const urlObject = url.parse(urlString);
  return (
    urlObject &&
    urlObject.hostname &&
    urlObject.hostname === 'github.com'
  );
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) { console.error(err.stack); } // eslint-disable-line no-console
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) { console.error(err.stack); } // eslint-disable-line no-console

    return '';
  },
})
.use(MarkdownItContainer, 'note')
.use(MarkdownItContainer, 'tips')
.use(MarkdownItContainer, 'caution')
.use(MarkdownItContainer, 'advanced')
.use(MarkdownItContainer, 'todo', {
  render(tokens, idx) {
    if (tokens[idx].nesting === 1) {
      return '<div class="todo"><p>This guide is a work-in-progress and may contain incomplete info or even errors. Please help <a href="https://github.com/SkygearIO/skygear-doc/issues">contribute</a>, or <a href="https://docs.skygear.io/support/">contact support</a> if you need further helps. Here are a list of info / todos which might help you before this guide is polished.</p>\n';
    }
    return '</div>\n';
  },
})
.use(MarkdownItTOC, { includeLevel: [2] })
.use(MarkdownItAnchor)
.use(MarkdownItLinkAttributer, {
  attributes: [
    {
      key: 'class',
      value: (token) => {
        const href = token.attrGet('href');
        if (href && isGithubLink(href)) {
          return 'github';
        }
        return null;
      },
    },
    {
      key: 'class',
      value: (token) => {
        const href = token.attrGet('href');
        if (href && !isInternalLink(href)) {
          return 'external';
        }
        return null;
      },
    },
    {
      key: 'target',
      value: (token) => {
        const href = token.attrGet('href');
        if (href && !isInternalLink(href)) {
          return '_blank';
        }
        return null;
      },
    },
  ],
});


function displayLanuageName(language) {
  const displayNames = {
    javascript: 'JavaScript',
    java: 'Java',
    'obj-c': 'Objective-C',
    python: 'Python',
    swift: 'Swift',
    kotlin: 'Kotlin',
  };
  return displayNames[language];
}

function getTokenLangName(tokens, idx) {
  if (idx < 0 || idx >= tokens.length || tokens[idx].type !== 'fence') {
    return null;
  }
  const token = tokens[idx];
  const info = token.info ? md.utils.unescapeAll(token.info).trim() : '';
  if (!info) {
    return null;
  }
  return info.split(/\s+/g)[0];
}

function checkForCodeSwitcher(tokens, idx) {
  let isInCodeSwitcher = false;
  let isFirstLanguage = false;

  const previousTokenLangName = getTokenLangName(tokens, idx - 1);
  const currentTokenLangName = getTokenLangName(tokens, idx);
  const nextTokenLangName = getTokenLangName(tokens, idx + 1);

  if (currentTokenLangName) {
    if (previousTokenLangName && previousTokenLangName !== currentTokenLangName) {
      isInCodeSwitcher = true;
    } else if (nextTokenLangName && nextTokenLangName !== currentTokenLangName) {
      isInCodeSwitcher = true;
      isFirstLanguage = true;
    }
  }
  return {
    isInCodeSwitcher,
    isFirstLanguage,
    currentLanguage: currentTokenLangName,
  };
}

// generate code switcher for consecutive different-language fenced codes
const defaultFenceRender = md.renderer.rules.fence;
md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
  // IMPORTANT: currently only supporting two languages
  const {
    isInCodeSwitcher,
    isFirstLanguage,
    currentLanguage,
  } = checkForCodeSwitcher(tokens, idx);

  if (!isInCodeSwitcher) {
    // do nothing if code switcher is not necessary
    return defaultFenceRender(tokens, idx, options, env, slf);
  }

  let result = '';

  if (isFirstLanguage) {
    // opening HTML tags for code switcher
    result += '<form><div class="code-switcher">';
  }

  result += `
    <input
      type="radio"
      name="lang"
      id="switcher-${idx}-${currentLanguage}"
      ${isFirstLanguage ? 'checked' : ''}
    />
    <label for="switcher-${idx}-${currentLanguage}">
      ${displayLanuageName(currentLanguage)}
    </label>
    <div class="body">${defaultFenceRender(tokens, idx, options, env, slf)}</div>
  `;

  if (!isFirstLanguage) {
    // closing HTML tags for code switcher
    result += '</div></form>';
  }

  return result;
};

module.exports = function markdownLoader(source) {
  this.cacheable();

  const frontmatter = fm(source);
  frontmatter.attributes.html = md.render(frontmatter.body);

  return `module.exports = ${JSON.stringify(frontmatter.attributes)};`;
};
