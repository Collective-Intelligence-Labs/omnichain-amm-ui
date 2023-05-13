<!-- views/AddLiquidity.vue -->
<template>
    <div>
      <b-card title="Add Liquidity" class="mb-4">
        <b-form @submit="onSubmit">
          <b-form-group label="Token 1:">
            <b-form-select v-model="token1" :options="tokens"></b-form-select>
          </b-form-group>
          <b-form-group label="Amount:">
            <b-form-input v-model="amount1" type="number" step="0.01"></b-form-input>
          </b-form-group>
          <b-form-group label="Token 2:">
            <b-form-select v-model="token2" :options="tokens"></b-form-select>
          </b-form-group>
          <b-form-group label="Amount:">
            <b-form-input v-model="amount2" type="number" step="0.01"></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Add Liquidity</b-button>
        </b-form>
      </b-card>
    </div>
  </template>
  
  <script>
    //import protobuf from 'protobufjs';
    //import operation from '../Proto/operation_pb'
    import {Command, AddLiquidityPayload, CommandType} from '../Proto/command_pb'
    import {Operation} from '../Proto/operation_pb'
    import Web3 from 'web3';

  export default {
    name: 'AddLiquidity',
    data() {
      return {
        aggregateId: null,
        token1: null,
        token2: null,
        amount1: null,
        amount2: null,
        tokens: ['Token A', 'Token B', 'Token C'] // Replace with actual tokens
      }
    },
   
    methods: {
    async onSubmit(evt) {
        evt.preventDefault();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        //const payload = 'Hello, World!';

        const web3 = new Web3(window.ethereum);
        
        const cmd = new AddLiquidityPayload();
        cmd.setAmount1(this.amount1);
        cmd.setAmount2(this.amount2);
        console.log(cmd);
        const payloadBuffer = cmd.serializeBinary();
        

        const payloadHex ='0x' + Array.from(payloadBuffer)
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
        console.log(payloadHex);
        const signature = await web3.eth.personal.sign(payloadHex, account, '');
        console.log(signature);

        const command = new Command();
        command.setAggregateId(this.aggregateId);
        command.setCmdSignature(signature);
        command.setCmdType(CommandType.AddLiquidity);
        command.setCmdPayload(cmd.serializeBinary());
        const operation = new Operation();
        operation.setRouterId('my-router');
        operation.setCommandsList([command]);
        console.log(operation.toObject());
        
      }
    },
    mounted(){
       
    }
  }
  </script>
  