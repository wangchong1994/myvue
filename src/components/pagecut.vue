<template>
  <p style="margin:0 2px" v-if="batchdata.FailBarCodeList.length !== 0" 
    v-for="(row, rIndex) in Math.ceil(batchdata.FailBarCodeList  / 3)">
      <span v-for="(el, index) in batchdata.FailBarCodeLrIndex*3, rIndex*3 +3)">
        {{el}};
      </span>
    </p>
</template>
