

import {Command, CommandType} from './Proto/command_pb'
import {Operation} from './Proto/operation_pb'
import Web3 from 'web3';
import axios from 'axios';



axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['Content-Type'] = 'application/json'

const MARKET_ID = "MARKET_ID_HERE";

export default {

    
    async sendCommand(cmd){

        axios.defaults.baseURL = 'http://localhost:5025/';

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        const web3 = new Web3(window.ethereum);
        
        const payloadBuffer = cmd.serializeBinary();
        

        const payloadHex ='0x' + Array.from(payloadBuffer)
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
        const signature = await web3.eth.personal.sign(payloadHex, account, '');
 

        const command = new Command();
        command.setAggregateId(this.aggregateId);
        command.setCmdSignature(signature);
        command.setCmdType(CommandType.AddLiquidity);
        command.setCmdPayload(cmd.serializeBinary());
        const operation = new Operation();
        operation.setRouterId('my-router');
        operation.setCommandsList([command]);
        console.log(operation.toObject());
        
        try {
          const response = await axios.post('/route', operation.serializeBinary());
          console.log(response);
        } catch (error) {
          console.error(error);
        }
    },

    async getBalances(){
        try {
            axios.defaults.baseURL = 'http://localhost:5276/api';
            const accountId = await this.getCurrentAccount();
            const response = await axios.get(`/balances/${accountId}`);
            return response.data;
          } catch (error) {
            console.error('Error fetching market items:', error);
          }
    },

    async getTokens(){
        try {
            axios.defaults.baseURL = 'http://localhost:5276/api';
            const response = await axios.get(`/chains/tokens`);
            return response.data;
          } catch (error) {
            console.error('Error fetching market items:', error);
          }
    },

    async getMarket(){
        try {
            axios.defaults.baseURL = 'http://localhost:5276/api';
            const response = await axios.get(`/markets/${MARKET_ID}`);
            return response.data;
          } catch (error) {
            console.error('Error fetching market items:', error);
          }
    },

    async getCurrentAccount(){
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return accounts[0];
    }


}