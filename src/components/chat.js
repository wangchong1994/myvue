<template>
  <div class="chat-area">
      <div v-for="(item, index) in chats" key="idnex">
        <div v-if="item.role == 1" class="left chat-row">
          <div class="icon-chat customer-srevice"></div>
          <div class="chat-text left">{{item.text}}</div>
        </div>
        <div v-if="item.role == 2" class="right chat-row">
          <div class="chat-text right">{{item.text}}</div>
          <div class="icon-chat client"></div>
        </div>
      </div>
    </div>
</template>
// 仿聊天页面
<script>
export default {
  name: 'ChatLog',
  data() {
    return {
      chats: [{
        text: 'nihao left',
        role: 1
      },
      {
        text: 'nihao right',
        role: 2
      }, {
        text: 'nihao left',
        role: 1
      },{
        text: '这是一段回复内容是一段回复内容是一段回复内容是一段',
        role: 2
      }, {
        text: 'nihao left',
        role: 1
      }],
      Content: '↵<p>来哪些变化，你需要做哪些准备？</p>↵<p><img src="http://p9.pstatp.com/large/pgc-image/RSLfJUo3CPkCAh" alt="5G商用牌照即将发放！你的手机要换吗？" /></p>↵<p>资料图：运营商已开展5G友好用户测试。中新网 吴涛 摄</p>↵<p><strong>5G商用！比原计划提前</strong></p>↵<p>&ldquo;近期发放5G商用牌照&rdquo;，这意味着5G商用牌照下发提速，因为按照此前工信部披露的消息，2019年中国进行5G试商用，2020年正式商用。</p>',
    };
  },
  components: {

  },
  methods: {

  },
};
</script>
<style lang="stylus" scoped>
.chat-area
  padding 16px
  .chat-row
    position relative
    left 0px
    padding 5px 10px
    display flex
    .icon-chat
      box-shadow 0 0 2px #666
      border-radius 16px
      width 32px
      height 32px
      position relative
      top -8px
      background-size contain
      background-repeat no-repeat
    .customer-srevice
      margin-right 10px
      background-image url('../../../../../static/images/icon_customer_srevice_76x76.png')
    .client
      margin-left 10px
      background-image url('../../../../../static/images/icon_client_76x76.png')
    .chat-text
      max-width 56vw
      font-size .8rem
      box-shadow 1px 1px 6px #666
      line-height 26px
      padding 4px
    .right
      background #4A90E2
      color #fff
      border-radius 16px 0 16px 16px 
    .left
      background #fff
      color #666
      border-radius 0 16px 16px 16px
  .right
    justify-content flex-end
</style>

