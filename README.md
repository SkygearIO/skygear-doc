# Skygear Documentation Site

## Development
```
npm install
npm start
```


## Build
```
npm install
npm run build
```


## Deployment

- Push to `production` branch to deploy to [https://docs.skygear.io](https://docs.skygear.io)
- Push to `restructure` branch to deploy to [http://docs-staging.skygear.io](http://docs-staging.skygear.io)

Files in the `public/` folder will be deployed. The Webpack build creates the bundled js in this folder.

## React Static Boilerplate

The site is built using the [react static boilerplate](https://github.com/kriasoft/react-static-boilerplate). You can refer to its documentation for how routes are created.

## Content parser

- Markdown parser: [markdown-it](https://github.com/markdown-it/markdown-it)
- Syntax highlighting: [highlight.js](https://highlightjs.org)

Please refer to `utils/markdown-loader.js` for how it is parsed.

## Skygear document routes and content

- `guideRoutes.js` defines the list of routes

## Spell checker

- `npm install -g markdown-spellcheck`
- `mdspell -r --en-us -n 'content/**/*.md'`
- American English spelling is used.
- Exceptions are in the `.spelling` file.


## Style Guide

- Use You to refer to the reader
- Include external link (e.g. webpack) as necessary but not to be repetitive
- Links used in the markdown can be all placed at the bottom of the file
- Avoid starting a sentence with a verb
- Notice the difference between a method and a function, e.g. `skygear.loginWithProvider` is a method
- Start heading at `h2` (`h1` is for page title from route), and all `h2` has to be as sub-menu item
- Use &lt;brackets> for parts that require user to fill in
- Sample user input should be highlighted. (Refer to getting started for JS new project yeoman terminal dump as example)
- Code inline comment should only be used for simple remarks. Long descriptions should be written as separate paragraphs
- While there are spelling check for paragraphs, there are none for code. Therefore please double check the spellings in code blocks
- Use terms consistently especially in titles. Don't shorten words - readers will be confused
- Avoid saying too much about the server in each of the SDK doc, because:
  1. it will be repetitive
  2. technically those descriptions are not directly related to the SDK itself

  Instead you can link to the relevant section in the server doc.
  However talking about server behavior in each of the SDK is necessary although it is repetitive
  e.g. in Users & Auth, you need to talk about Skygear not allowing duplicated usernames

## Style Guide for JS Docs
- Two spaces per indent
- Use `console.error(error)` instead of `console.log(err)`
- all object properties should be quoted
- use ES6 syntax, ES5 syntax will be added later as code tab switching is enabled

### Directory Layout

```shell
.
├── /components/                # Shared or generic UI components
│   ├── /Button/                # Button component
│   ├── /Layout/                # Website layout component
│   ├── /Link  /                # Link component to be used instead of <a>
│   └── /...                    # etc.
├── /core/                      # Core framework
│   ├── /history.js             # Handles client-side navigation
│   ├── /router.js              # Handles routing and data fetching
│   └── /store.js               # Application state manager (Redux)
├── /node_modules/              # 3rd-party libraries and utilities
├── /pages/                     # React components for web pages
│   ├── /about/                 # About page
│   ├── /error/                 # Error page
│   ├── /home/                  # Home page
│   └── /...                    # etc.
├── /public/                    # Static files such as favicon.ico etc.
│   ├── /dist/                  # The folder for compiled output
│   ├── favicon.ico             # Application icon to be displayed in bookmarks
│   ├── robots.txt              # Instructions for search engine crawlers
│   └── /...                    # etc.
├── /test/                      # Unit and integration tests
├── /utils/                     # Utility and helper classes
│── main.js                     # React application entry point
│── package.json                # The list of project dependencies and NPM scripts
│── routes.json                 # This list of application routes
│── run.js                      # Build automation script, e.g. `node run build`
└── webpack.config.js           # Bundling and optimization settings for Webpack
```
