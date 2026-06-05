import { AppRegistry } from 'react-native';
import App from '../App';

AppRegistry.registerComponent('Rapiclave', () => App);
AppRegistry.runApplication('Rapiclave', {
  rootTag: document.getElementById('root')!,
});
