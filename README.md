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
Push to `production` branch to deploy to [http://docs.skygear.io](http://docs.skygear.io)


## Update content
- All contents are defined in markdown files in **content** folder
  - The markdown format follows [GitHub's recommendation](https://guides.github.com/features/mastering-markdown/)
  - The code block would have syntax highlight if declared the language used.
  - Currently supported languages:
    `bash`, `css`, `go`, `gradle`, `groovy`, `html`,
    `ini`, `java`, `javascript`, `js`, `objc`, `python`
- To link a specific content to a route, update / create a new JSON files in **routes** folder
- To update side menu, update JSON files in **menus** folder


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

## Style Guide for JS Docs
- Two spaces per indent
- Use `console.error(error)` instead of `console.log(err)`
- Use <brackets> for parts that require user to fill in
