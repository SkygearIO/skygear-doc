import marked from 'marked';

require('prismjs');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-c');
require('prismjs/components/prism-go');
require('prismjs/components/prism-groovy');
require('prismjs/components/prism-ini');
require('prismjs/components/prism-java');
require('prismjs/components/prism-objectivec');
require('prismjs/components/prism-python');

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

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const renderer = new marked.Renderer();
renderer.code = function(code, lang, escaped) {
  let syntax;
  if (lang) {
    lang = lang.toLowerCase();
    syntax = Syntaxes[lang];
  }
  if (!syntax) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return `<pre><code class="language-${escape(lang, true)}">`
    + Prism.highlight(code, syntax)
    + `</code></pre>`;
};

export default renderer;
