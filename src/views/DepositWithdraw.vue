<template>
    <div>
        <b-card title="Token Balances" class="mb-4">
  <b-table :items="balances" striped hover>
    <template #cell(asset)="row">
      {{ row.item.asset }}
    </template>
    <template #cell(balance)="row">
      {{ row.item.balance }}
    </template>
    <template #cell(account)="row">
      {{ row.item.account }}
    </template>
    <template #cell(daoId)="row">
      {{ row.item.daoId }}
    </template>
  </b-table>
</b-card>

      <b-card title="Deposit/Withdraw Tokens" class="mb-4">
        <b-form>
          <b-form-group id="token-group" label="Token" label-for="token">
            <b-form-select id="token" v-model="form.token" :options="tokens" required></b-form-select>
          </b-form-group>
  
          <b-form-group id="amount-group" label="Amount" label-for="amount">
            <b-form-input id="amount" v-model="form.amount" type="number" required></b-form-input>
          </b-form-group>
  
          <b-button variant="primary" @click="deposit">Deposit</b-button>
          <b-button variant="danger" @click="withdraw">Withdraw</b-button>
        </b-form>
      </b-card>
    </div>
  </template>
  
  <script>
import {DepositFundsPayload, WithdrawFundsPayload} from '../Proto/command_pb'

import cila from '../cila'


  export default {
    data() {
      return {
        form: {
          token: null,
          amount: null
        },
        tokens: ['Token A', 'Token B', 'Token C'], // You'll need to populate this array with actual data.
        balances: [
      { asset: 'Token A', balance: 100, account: 'Account A', daoId: 'DAO ID A' },
      { asset: 'Token B', balance: 200, account: 'Account B', daoId: 'DAO ID B' },
      { asset: 'Token C', balance: 300, account: 'Account C', daoId: 'DAO ID C' }
    ] // Replace with your actual token balances
      }
    },
    methods: {
      async deposit() {
        const cmd = new DepositFundsPayload();
        cmd.setAmount1(this.amount);
        cmd.setAmount2(this.amount);
        await cila.sendCommand(cmd);
      },
      async withdraw() {
        const cmd = new WithdrawFundsPayload();
        cmd.setAmount1(this.amount);
        cmd.setAmount2(this.amount);
        await cila.sendCommand(cmd);
      }
    },
    async created() {
        this.balances = await cila.getBalances();
        this.tokens = await cila.getTokens();
    }
  }
  </script>
  