<!-- views/TokenSwap.vue -->
<template>
    <div>
      <b-card title="Swap Tokens" class="mb-4">
        <b-form @submit="onSubmit">
          <b-form-group label="From:">
            <b-form-select v-model="fromToken" :options="tokens"></b-form-select>
          </b-form-group>
          <b-form-group label="Amount:">
            <b-form-input v-model="amount" type="number" step="0.01"></b-form-input>
          </b-form-group>
          <b-form-group label="To:">
            <b-form-select v-model="toToken" :options="tokens"></b-form-select>
          </b-form-group>
          <b-button type="submit" variant="primary">Swap</b-button>
        </b-form>
      </b-card>
    </div>
  </template>
  
  <script>
    import {SwapTokensPayload} from '../Proto/command_pb'
    import cila from '@/cila';
    

    export default {
      name: 'TokenSwap',
      data() {
        return {
          fromToken: null,
          toToken: null,
          amount: null,
          
          tokens: ["ETH" , "OP"], // Replace with actual tokens
        }
      },
      async created() {
        this.tokens = await cila.getTokens();
    },
      methods: {
        async onSubmit(evt) {
          evt.preventDefault();
          const cmd = new SwapTokensPayload();
          cmd.setAmount1(this.amount);
          cmd.setAmount2(this.amount);
          await cila.sendCommand(cmd);
        }
      }
  }
  </script>
  