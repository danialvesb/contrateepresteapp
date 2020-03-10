import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Menu from './src/Menu';
import Navigator from './src/Navigator';


AppRegistry.registerComponent(appName, () => Navigator);
