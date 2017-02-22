# Skygear Documentation Site

## Development
```
git submodule init
git submodule update
npm install
npm start
```

## Build
```
npm install
npm run build
```


## Deployment

- Push to `production` branch to deploy to
  [https://docs.skygear.io](https://docs.skygear.io)

- run the following command on your local dev machine to ensure it pass the
  CI server's requirement:

  ```
  npm run lint
  npm run test
  npm run spell-check
  npm run build release
  ```

Files in the `public/` folder will be deployed. The Webpack build creates the bundled js in this folder.

Please add the following S3 redirection rule on the deployment S3 bucket for legacy purpose

```
<RoutingRules>
  <RoutingRule>
    <Condition>
      <KeyPrefixEquals>guide/</KeyPrefixEquals>
    </Condition>
    <Redirect>
      <ReplaceKeyPrefixWith>guides/</ReplaceKeyPrefixWith>
    </Redirect>
  </RoutingRule>
  <RoutingRule>
    <Condition>
      <KeyPrefixEquals>guides/get-started/</KeyPrefixEquals>
    </Condition>
    <Redirect>
      <ReplaceKeyPrefixWith>guides/quickstart/</ReplaceKeyPrefixWith>
    </Redirect>
  </RoutingRule>
</RoutingRules>
```

To allow replacement of all files upon deployment such that the Android SDK API docs are not removed,
please set the following S3 IAM policy:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListAllMyBuckets"
            ],
            "Resource": "arn:aws:s3:::*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket",
                "s3:GetBucketLocation"
            ],
            "Resource": "arn:aws:s3:::docs.skygear.io"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:GetObject",
                "s3:GetObjectAcl",
                "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3:::docs.skygear.io/*"
        },
        {
            "Sid": "DisallowAllS3ActionsInApiFolder",
            "Effect": "Deny",
            "Action": [
                "s3:*"
            ],
            "Resource": [
                "arn:aws:s3:::docs.skygear.io/android/reference/*",
                "arn:aws:s3:::docs.skygear.io/android/plugins/*"
            ]
        }
    ]
}
```

## React Static Boilerplate

The site is built using the [react static boilerplate](https://github.com/kriasoft/react-static-boilerplate). You can refer to its documentation for how routes are created.

## Content parser

- Markdown parser: [markdown-it](https://github.com/markdown-it/markdown-it)
- Syntax highlighting: [highlight.js](https://highlightjs.org)

Please refer to `utils/markdown-loader.js` for how it is parsed.

## Creating alert boxes

You can use the following syntax in a markdown file to create an "Advanced" box:

```
::: advanced

Some advanced usage

:::
```

Besides `advanced`, you can also use `todo`, `note`, `tips` and `caution`.

`todo` is a special type of box to warn users the section is a WIP. It should
always include a bullet points list of todo items.

## Creating code switcher (e.g. Objective-C vs Swift)

Any two consecuting fenced code blocks of different languages will be combined
as a code switcher, e.g.

    ``` objectivec
    some Objective-C code
    ```

    ``` swift
    some swift code
    ```

Note: Currently it only supports two languages; the behaviour will be unexpected
if there are more consecutive different language fenced code blocks.
You can insert paragraphs and text between the codes to avoid this.

## Skygear document routes and content

- `guideRoutes.js` defines the list of routes

## Spell checker

- it uses [markdown-spellcheck](https://github.com/lukeapage/node-markdown-spellcheck)
- `npm run spell-check`
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
