import 'react-native-url-polyfill/auto';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://SEU_IP_DA_MAQUINA_WIFI:8090')

export default pb;