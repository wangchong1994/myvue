<template>
  <div>
    <div class="dragula" ref="navDraggle">
      <div v-for="(item, index) in cooperateTypeList" :key="item.value" :title-index="index">{{item.name}}</div>
    </div>
    <Button @click="result">look result</Button>
  </div>
</template>

<script>
import dragula from 'dragula';
export default {
  name: '',
  data() {
    return {
      cooperateTypeList: [{
        name: '固定租金',
        value: '0',
      },
      {
        name: '销售分成',
        value: '1',
      },
      {
        name: '免费',
        value: '2',
      }],
    };
  },
  components: {

  },
  methods: {
    result() {
      console.log("cooperateTypeList", this.cooperateTypeList);
    },
    /* eslint-disable */
    initdragula() {
      this.drakesTitle = dragula([this.$refs.navDraggle],
      {
        direction: 'horizontal',
        invalid: (el, target) => {
          return el.classList.contains('new-nav-btn');
        }
      });
      let dragIndex = null;
      let dragEndIndex = null;
      this.$nextTick(() => {
        this.drakesTitle.on('drag', (el) => {
          $(el).addClass('dragula-title-class');
          dragIndex = $(el).index();
        }).on('dragend', (el) => {
          $('.dragula-title-class').removeClass('dragula-title-class');
        })
        .on('drop', (_el, _target, _source, _sibling) => {
              const el = $(_el),
                    target = $(_target),
                    source = $(_source),
                    sibling = $(_sibling);
              let fromIndex = Number(el.attr('title-index'));
              let toIndex = sibling.attr('title-index');
              const toLast = toIndex === undefined;
              const dragElement = this.cooperateTypeList.splice(fromIndex, 1)[0];
              // 移到最后
              if(toLast) {
                toIndex = this.cooperateTypeList.length;
                this.cooperateTypeList.push(dragElement);
                if(fromIndex == this.activeIndex) {
                  this.activeIndex = toIndex;
                } else if (toIndex == this.activeIndex) {
                  this.activeIndex = fromIndex;
                }
                console.log('this.activeIndex', this.activeIndex);
                return;
              }
              toIndex = Number(toIndex);
              if(fromIndex > toIndex) {
                // 右移到左
                if(fromIndex == this.activeIndex) {
                  this.activeIndex = toIndex;
                } else if (toIndex == this.activeIndex) {
                  this.activeIndex = fromIndex;
                }
              } else {
                // 左移到右 这时toIndex 比实际的index要大一不知道为什么
                if(fromIndex == this.activeIndex) {
                  this.activeIndex = toIndex - 1;
                } else if (toIndex - 1 == this.activeIndex) {
                  this.activeIndex = fromIndex;
                }
              }
              const to = fromIndex > toIndex ? toIndex : parseInt(toIndex, 10) - 1;
              this.cooperateTypeList.splice(to, 0, dragElement);
        })
      })
    }
  },
  mounted() {
    this.initdragula();
  }
};
</script>
<style lang="stylus" scoped>
  .dragula
    display flex
    div
      width fit-content
      background red
      margin-left 20px
</style>
<style lang="stylus">
.gu-mirror {
  position: absolute;
  &.dragula {
    position: relative;
  }
}

</style>