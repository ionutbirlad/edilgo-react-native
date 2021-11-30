# EdilGo mobile app ![CircleCI](https://img.shields.io/github/v/tag/ionutbirlad/edilgo-react-native?label=version&sort=date)

This is a beta version of the EdilGo single page application replicated for mobile devices using React Native and Ignite boilerplate structure.

Currently includes:

- React Native
- React Navigation
- MobX State Tree
- TypeScript

## Quick Start

The app project's structure will look similar to this:

```
ignite-project
├── app
│   ├── components
│   ├── i18n
│   ├── utils
│   ├── models
│   ├── navigators
│   ├── screens
│   ├── services
│   ├── theme
│   ├── app.tsx
├── storybook
│   ├── views
│   ├── index.ts
│   ├── storybook-registry.ts
│   ├── storybook.ts
│   ├── toggle-storybook.tsx
├── test
│   ├── __snapshots__
│   ├── storyshots.test.ts.snap
│   ├── mock-i18n.ts
│   ├── mock-reactotron.ts
│   ├── setup.ts
│   ├── storyshots.test.ts
├── README.md
├── android
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── keystores
│   └── settings.gradle
├── ignite
│   ├── ignite.json
│   └── plugins
├── index.js
├── ios
│   ├── IgniteProject
│   ├── IgniteProject-tvOS
│   ├── IgniteProject-tvOSTests
│   ├── IgniteProject.xcodeproj
│   └── IgniteProjectTests
├── .env
└── package.json

```

### ./app directory

Inside the project there is also the `app` directory. This is a directory you would normally have to create when using vanilla React Native.

The inside of the src directory looks similar to the following:

```
app
│── components
│── i18n
├── models
├── navigators
├── screens
├── services
├── theme
├── utils
└── app.tsx
```

**components**
This is where React components live. Each component will have a directory containing the `.tsx` file, along with a story file, and optionally `.presets`, and `.props` files for larger components. The app will come with some commonly used components like Button.

**i18n**
This is where translations live since we are using `react-native-i18n`.

**models**
This is where app's models live. Each model has a directory which will contain the `mobx-state-tree` model file, test file, and any other supporting files like actions, types, etc.

**navigators**
This is where `react-navigation` navigators live.

**screens**
This is where screen components live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**services**
Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**theme**
Here lives the theme for the application, including spacing, colors, and typography.

**utils**
This is the place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc.

**app.tsx** This is the entry point to the app. This is where we will find the main App component which renders the rest of the application.

### ./ignite directory

The `ignite` directory stores all things Ignite, including CLI and boilerplate items (plugins and examples).

### ./storybook directory

This is where stories will be registered and where the Storybook configs will live.

### ./test directory

This directory will hold Jest configs and mocks, as well as [storyshots](https://github.com/storybooks/storybook/tree/master/addons/storyshots) test file. This is a file that contains the snapshots of all the component storybooks.

## Running Storybook

From the command line in the app's root directory, enter `yarn run storybook`
This starts up the storybook server and opens a story navigator in your browser. With the app
running, choose Toggle Storybook from the developer menu to switch to Storybook; you can then
use the story navigator in your browser to change stories.

## Running e2e tests

Read [e2e setup instructions](./e2e/README.md).
