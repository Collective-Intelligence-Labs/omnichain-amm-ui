import { createRouter, createWebHistory } from 'vue-router'
import TokenSwap from './views/TokenSwap.vue'
import AddLiquidity from './views/AddLiquidity.vue'
import RemoveLiquidity from './views/RemoveLiquidity.vue'
import DepositWithdraw from './views/DepositWithdraw.vue'
//import MarketListing from './views/MarketListing.vue'

const routes = [
  {
    path: '/swap',
    name: 'TokenSwap',
    component: TokenSwap
  },
  {
    path: '/add-liquidity',
    name: 'AddLiquidity',
    component: AddLiquidity
  },
  {
    path: '/remove-liquidity',
    name: 'RemoveLiquidity',
    component: RemoveLiquidity
  },
  {
    path: '/deposit-withdraw',
    name: 'DepositWithdraw',
    component: DepositWithdraw
  },
  /*{
    path: '/markets',
    name: 'MarketListing',
    component: MarketListing
  }, */
  {
    path: '/:catchAll(.*)',
    redirect: '/swap'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router