

import {Command, CommandType} from './Proto/command_pb'
import {Operation} from './Proto/operation_pb'
import Web3 from 'web3';
import axios from 'axios';



axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['Content-Type'] = 'application/json'

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


}