# Skygear Documentation Site

## Development
```
git submodule update --init
npm install
npm start
```


## Build
```
git submodule update --init
npm install
npm run build
```


## Deployment
Push to `production` branch to deploy to [http://docs.skygear.io](http://docs.skygear.io)


## Updating content
For pages that fit into a side menu + content structure are defined in separate files inside 3 directories:

- `routes/` contains JSON files for mappings between the URL, side navigation menu and a content document
- `menus/` contains JSON files for each page's side navigation menu
- `content/` contains markdown files for each page's content
  - The markdown format follows [GitHub's recommendation](https://guides.github.com/features/mastering-markdown/)
  - The code block would have syntax highlight if declared the language used.
  - Currently supported languages:
    `bash`, `css`, `go`, `gradle`, `groovy`, `html`,
    `ini`, `java`, `javascript`, `js`, `objc`, `python`

Other pages are inside the `pages/` directory where the structure mirrors the URL:
- `/pages/js/guide/install-sdk.js` is a react component that maps to
the URL `docs.skygear.io/js/guide/install-sdk`
- pages such as `not-found` and `coming-soon` also resides in this directory.

## Spell checker

- `npm install -g markdown-spellcheck`
- `mdspell -r --en-us -n '**/*.md' '!**/node_modules/**/*.md'`
- American English spelling is used.
- Exceptions are in the `.spelling` file.


## Folder Structure
```
.
├── /build/            # The folder for compiled output
├── /content/          # The folder for site content in markdown format
├── /components/       # React components
├── /lib/              # Libraries and utilities
├── /menus/            # The folder for menu definition in JSON format
├── /node_modules/     # 3rd-party libraries and utilities
├── /pages/            # React.js-based web pages
├── /routes/           # The folder for mapping content to routes
├── /static/           # Static files such as favicon.ico etc.
├── /test/             # Unit and integration tests
├── /tools/            # Build automation scripts and utilities
│── app.js             # The main JavaScript file (entry point)
│── config.js          # Website configuration / settings
│── package.json       # Dev dependencies and NPM scripts
└── README.md          # Project overview
```

## Style Guide

- Use You to refer to the reader
- Include external link (e.g. webpack) as necessary but not to be repetitive
- Avoid starting a sentence with a verb
- Notice the difference between a method and a function, e.g. `skygear.loginWithProvider` is a method
- Start heading at `h2` (`h1` is for page title from route), and all `h2` has to be as sub-menu item
- Use &lt;brackets> for parts that require user to fill in
- Sample user input should be highlighted. (Refer to getting started for JS new project yeoman terminal dump as example)
- Code inline comment should only be used for simple remarks. Long descriptions should be written as separate paragraphs
- Use noun phrases (or gerund) for titles, e.g. Logging in, User authentication, Saving record, Tips
- While there are spelling check for paragraphs, there are none for code. Therefore please double check the spellings in code blocks
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
