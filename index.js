/* eslint import/first: "off" */

/**
 * @format
 */

// Polyfills
Object.entriesTypeSafe = Object.entries;

import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
