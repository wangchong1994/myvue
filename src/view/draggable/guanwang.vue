
<template>
  
  <div id="main">
  <h1>Vue Draggable</h1>           
  <div class="drag">
    <h2>List 1 Draggable</h2>
      <draggable v-model="list" class="dragArea" :options="{group:{ name:'people',  pull:'clone', put:false }}">
      <div v-for="element in list">{{element.name}}</div>
      </draggable>
    <h2>List 2 Draggable</h2>
      <draggable v-model="list2" class="dragArea" :options="{group:'people'}">
      <div v-for="element in list2">{{element.name}}</div>
      </draggable>
  </div>
  
     <div class="normal">
            <h2>List 1 v-for</h2>
            <div>
                <div v-for="element in list">{{element.name}}</div>
             </div>

            <h2>List 2 v-for</h2>
            <div>
                <div v-for="element in list2">{{element.name}}</div>
            </div>
        </div>
</div>
</template>
 
<script>
  let dom = '';
  import draggable from 'vuedraggable';
  import dragglesort from './dragglesort'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        list: [{
          name: "John"
        }, {
          name: "Joao"
        }, {
          name: "Jean"
        }],
        list2: [{
          name: "Juan"
        }, {
          name: "Edgard"
        }, {
          name: "Johnson"
        }]
      }
  },
  methods: {
    add: function() {
      this.list.push({
        name: 'Juan'
      });
    },
    replace: function() {
      this.list = [{
        name: 'Edgard'
      }]
    }
  },
    components: {　　
      draggable,
    },
  }
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .normal {
  background-color: grey;
}

.drag {
  background-color: green;
}

.dragArea {
  min-height: 10px;
}
</style>