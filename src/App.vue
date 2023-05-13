<!-- App.vue -->
<template>
  <div id="app">
    <b-navbar toggleable="lg">
      <b-navbar-brand href="#">Omnichain AMM DEX {{account}}</b-navbar-brand>
 
        <b-navbar-nav>
          <b-nav-item href="/swap" class="nav-item-fancy">Swap</b-nav-item>
          <b-nav-item href="/add-liquidity" class="nav-item-fancy">Add Liquidity</b-nav-item>
          <b-nav-item href="/remove-liquidity" class="nav-item-fancy">Remove Liquidity</b-nav-item>
          <b-nav-item href="/deposit-withdraw" class="nav-item-fancy">Deposit/Withdraw Funds</b-nav-item>
    
        </b-navbar-nav>

    </b-navbar>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import globalData from './globals';

export default {
  data(){
    return {
      account: null
    }
  },
  async mounted(){
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    this.account = accounts[0];
    globalData.account = this.account;
  }
}

</script>