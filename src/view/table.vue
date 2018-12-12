<template>
	<div>
	<YpTerminalTransferModal v-model="showTransfer"
                             :current="selectedTerminals"
                             :render-format="renderTransferItem"
                             :disabled-selection="selectedTerminals"
                             :extraParams="extraParams"
                             @on-load="handleDataLoad"
                             ref="transferModal"
                             @on-confirm="handleConfirmBinding">
    </YpTerminalTransferModal>
	</div>
</template>
<script>
export default {
  name: 'table',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>