<template>
    <div>
      <b-card title="Remove Liquidity" class="mb-4">
        <b-form @submit="onSubmit">
          <b-form-group id="liquidity-share-group" label="Liquidity Share" label-for="liquidity-share">
            <b-form-input id="liquidity-share" v-model="form.liquidityShare" type="number" min="0" max="100" required></b-form-input>
          </b-form-group>
  
          <b-button type="submit" variant="primary">Remove Liquidity</b-button>
        </b-form>
      </b-card>
    </div>
  </template>
  
  <script>
    import {RemoveLiquidityPayload} from '../Proto/command_pb'
    import cila from '../cila'


  export default {
    data() {
      return {
        form: {
          liquidityShare: null,
        },
      }
    },
    methods: {
      async onSubmit(evt) {
        evt.preventDefault();
        const cmd = new RemoveLiquidityPayload();
        cmd.setAmount1(this.amount);
        cmd.setAmount2(this.amount);
        await cila.sendCommand(cmd);
      }
    }
  }
  </script>