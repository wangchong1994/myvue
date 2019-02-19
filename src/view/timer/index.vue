<template>
  <div>
  <div   class="pop-up">
      <div class="pop-light"></div>
      <div class="pop-congratulation"></div>
      <div  class="pop-box" @click.stop="">
        <div class="pop-tips-getvoucher">获得一张礼券</div>
        <div class="pop-tips-to-user">时间有限，赶快去使用吧</div>
        <div v-if="isdated" class="pop-time">已到期</div>
        <div v-else class="pop-time">还有
          <span class="pop-time-unit">
              <span class="pop-time-data">{{days}}</span>天
              <span class="pop-time-data">{{hours}}</span>时
              <span class="pop-time-data">{{minutes}}</span>分
              <span class="pop-time-data">{{seconds}}</span>秒
          </span>到期 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {

  name: 'index',

  data() {
    return {
      futureTime: moment(new Date().getTime() + 10000), // 券有效期倒计时
      now: moment(new Date().getTime()),
      isdated: false, // 券是否过期 
    };
  },
  methods: {
    formatNum(num) {
      return `0${num}`.substr(-2);
    },
  },
  computed: {
    days() {
      return this.formatNum(this.futureTime.diff(this.now, 'day'));
    },
    hours() {
      const tmpDaysHours = this.days * 24;
      return this.formatNum(this.futureTime.diff(this.now, 'hour') - tmpDaysHours);
    },
    minutes() {
      const tmpDaysMinute = this.days * 24 * 60;
      const tmpHoursMinute = this.hours * 60;
      return this.formatNum(this.futureTime.diff(this.now, 'minute') - tmpDaysMinute - tmpHoursMinute);
    },
    seconds() {
      const tmpDaysSeconds = this.days * 24 * 60 * 60;
      const tmpHoursSeconds = this.hours * 60 * 60;
      const tmpMinutesSeconds = this.minutes * 60;
      return this.formatNum(this.futureTime.diff(this.now, 'second') - tmpDaysSeconds - tmpHoursSeconds - tmpMinutesSeconds);
    },
    diffTime() {
      return `${this.days}:${this.hours}:${this.minutes}:${this.seconds}`;
    },
  },
  mounted() {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      if (this.futureTime <= now ) {
        this.isdated = true;
        clearInterval(timer);
      }
      this.now = moment(now);
    }, 1000);
  }
};
</script>

<style lang="stylus" scoped>
  .pop-up {
  position: fixed;
  top: 0;
  height: 100vh;
  width:100vw;
  background: rgba(0,0,0,0.8);
  z-index: 20;
  .pop-box {
    height: 257px;
    width: 277px;
    position: absolute ;
    top: 28vh;
    left: 50vw;
    margin-left: -138.5px;
    border: #feecc8 solid 2px;
    border-radius: 4px;
    .pop-tips-getvoucher{
      color: rgb(231,51,43);
      margin: 10px auto;
      width: fit-content;
      margin-top: 40px;
      font-size: 1.3rem;
      font-weight: 500;
    }
    .pop-tips-to-user{
      margin: 10px auto;
      width: fit-content;
      color: rgb(233,87,56);
      font-size: 1rem;
    }
    .pop-time{
      height: 30px;
      margin: 30px auto;
      width: fit-content;
      color: #b3b3b3;
      .pop-time-unit{
        color:rgb(211,146,75);
        font-size: 1rem;
        .pop-time-data{
          background: rgb(254,236,200);
          color: rgb(240,90,6);
          padding: 6px 4px;
          border-radius: 2px;
          margin: 0 1px;
        }
      }
    }
    .pop-button{
      height: 48.5px;
      width: 148px;
      margin: 25px auto;
    }
}
}
</style>
