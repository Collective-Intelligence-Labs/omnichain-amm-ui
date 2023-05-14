<template>
    <div>
     <!-- Create Market Form -->
     <b-form @submit="onCreateMarket">
      <b-form-group label="Token 1">
        <b-form-select v-model="newMarket.token1" :options="tokenOptions"></b-form-select>
      </b-form-group>
      <b-form-group label="Token 2">
        <b-form-select v-model="newMarket.token2" :options="tokenOptions"></b-form-select>
      </b-form-group>
      <b-form-group label="Token 1 Balance">
        <b-form-input v-model="newMarket.token1Balance" type="number"></b-form-input>
      </b-form-group>
      <b-form-group label="Token 2 Balance">
        <b-form-input v-model="newMarket.token2Balance" type="number"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Create Market</b-button>
    </b-form>

      <b-card title="Market Listing" class="mb-4">
        <b-table striped hover :items="marketList" :fields="tableFields"></b-table>
      </b-card>
    </div>
  </template>

<script>
 import axios from 'axios';

export default {
  data() {
    return {
    newMarket: {
      token1: null,
      token2: null,
      token1Balance: 0,
      token2Balance: 0
    },
    tokenOptions: ['Token A', 'Token B', 'Token C'], 
      marketList: [],
      tableFields: [
        { key: 'id', label: 'ID' },
        { key: 'owner', label: 'Owner' },
        { key: 'asset1.symbol', label: 'Asset 1 Symbol' },
        { key: 'asset1.value', label: 'Asset 1 Value' },
        { key: 'asset2.symbol', label: 'Asset 2 Symbol' },
        { key: 'asset2.value', label: 'Asset 2 Value' }
      ]
    };
  },
  mounted() {
    this.fetchMarketItems();
    this.fetchAvailableTokens();
  },
  methods: {
    async fetchMarketItems() {
      try {
        // Make an API call to fetch the market items from the server
        const response = await axios('/markets');
        this.marketList = response;
      } catch (error) {
        console.error('Error fetching market items:', error);
      }
    },
    async fetchAvailableTokens() {
        
    }
  }
};
</script>