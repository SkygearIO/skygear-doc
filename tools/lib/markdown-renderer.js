/* global Prism */

require('prismjs');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-c');
require('prismjs/components/prism-go');
require('prismjs/components/prism-groovy');
require('prismjs/components/prism-ini');
require('prismjs/components/prism-java');
require('prismjs/components/prism-objectivec');
require('prismjs/components/prism-python');

function trimEmptyLineAtStartAndEnd(code) {
  const isStartWithNewLine = code.substr(0, 1) === '\n';
  const isEndWithNewLine = code.substr(-1) === '\n';
  if (isStartWithNewLine && isEndWithNewLine) {
    return code.slice(1, -1);
  }
  if (isStartWithNewLine) {
    return code.substr(1);
  }
  return code.slice(0, -1);
}

const Syntaxes = {
  'bash': Prism.languages.bash,
  'css': Prism.languages.css,
  'go': Prism.languages.go,
  'gradle': Prism.languages.groovy,
  'groovy': Prism.languages.groovy,
  'html': Prism.languages.html,
  'ini': Prism.languages.ini,
  'java': Prism.languages.java,
  'javascript': Prism.languages.javascript,
  'js': Prism.languages.javascript,
  'objc': Prism.languages.objectivec,
  'obj-c': Prism.languages.objectivec,
  'objectivec': Prism.languages.objectivec,
  'objective-c': Prism.languages.objectivec,
  'python': Prism.languages.python,
  'shell': Prism.languages.bash,
};

const remarkableConfig = {
  html: true,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  linkify: false,
  typographer: false,
  highlight: function(code, _lang) {
    let syntax;
    let lang = _lang;
    if (lang) {
      lang = lang.toLowerCase();
      syntax = Syntaxes[lang];
    }

    const trimmedCode = trimEmptyLineAtStartAndEnd(code);
    if (!syntax) {
      return trimmedCode;
    }
    return Prism.highlight(trimmedCode, syntax);
  },
};

export default remarkableConfig;
