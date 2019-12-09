# Skygear Documentation Site Generator

This repo is **DEPRECATED**

The new Skygear Guides are in Gitbook at docs.skygear.io

## What was it?

This is the repository and issue trackers for Skygear Documentation Site
Generator. The guides are in markdown format at
[skygeario/guides](https://github.com/skygeario/guides).

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
      <HostName>docs.skygear.io</HostName>
      <ReplaceKeyPrefixWith>guides/</ReplaceKeyPrefixWith>
    </Redirect>
  </RoutingRule>
  <RoutingRule>
    <Condition>
      <KeyPrefixEquals>guides/get-started/</KeyPrefixEquals>
    </Condition>
    <Redirect>
      <HostName>docs.skygear.io</HostName>
      <ReplaceKeyPrefixWith>guides/intro/quickstart/</ReplaceKeyPrefixWith>
    </Redirect>
  </RoutingRule>
  <RoutingRule>
    <Condition>
      <KeyPrefixEquals>guides/quickstart/</KeyPrefixEquals>
    </Condition>
    <Redirect>
      <HostName>docs.skygear.io</HostName>
      <ReplaceKeyPrefixWith>guides/intro/quickstart/</ReplaceKeyPrefixWith>
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
                "arn:aws:s3:::docs.skygear.io/android/plugins/*",
                "arn:aws:s3:::docs.skygear.io/android/build/*"
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

## Skygear document routes and content

- `guideRoutes.js` defines the list of routes

## Spell checker

- it uses [markdown-spellcheck](https://github.com/lukeapage/node-markdown-spellcheck)
- `npm run spell-check`
- American English spelling is used.
- Exceptions are in the `.spelling` file.

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
