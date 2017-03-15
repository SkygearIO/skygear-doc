/* eslint-disable no-param-reassign */

// Ref. https://github.com/crookedneighbor/markdown-it-link-attributes/blob/7e83cca/index.js

const defaultRender
  = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);

const markdownLinkAttributer = (md, config = {}) => {
  const attributes = config.attributes || [];
  const render = md.renderer.rules.link_open || defaultRender;

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    attributes.forEach(({ key, value }) => {
      let attributeValue;
      if (typeof value === 'function') {
        attributeValue = value(token);
      } else {
        attributeValue = value;
      }

      if (attributeValue) {
        token.attrJoin(key, attributeValue);
      }
    });

    return render(tokens, idx, options, env, self);
  };
};

module.exports = markdownLinkAttributer;
