<!-- views/AddLiquidity.vue -->
<template>
    <div>
      <b-card title="Add Liquidity" class="mb-4">
        <b-form @submit="onSubmit">
            {{ account }}
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
    import {AddLiquidityPayload} from '../Proto/command_pb'

    import cila from '../cila'


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
    async created() {
        this.tokens = await cila.getTokens();
        this.market = await cila.getMarket();
    },
    methods: {
    async onSubmit(evt) {
        evt.preventDefault();
        const cmd = new AddLiquidityPayload();
        cmd.setAmount1(this.amount1);
        cmd.setAmount2(this.amount2);
        await cila.sendCommand(cmd);
      }
    }
  }
  </script>
  