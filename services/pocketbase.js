import 'react-native-url-polyfill/auto';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://10.118.139.130:8090')

export default pb;