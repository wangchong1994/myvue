<template>
  <DatePicker v-model="data"
              type="daterange"
              :options="dateOptions"
              :placeholder="placeholder"
              @on-change="handleChange"
              @on-clear="handleClear"
              v-on="$listeners"
              v-bind="$attrs">
  </DatePicker>
</template>
<script>
export default {
  name: 'ypDateRangePicker',
  props: {
    default: {
      type: String,
    },
    value: {
      type: [Array, String, Object, Number],
    },
    parser: {
      type: Function,
    },
    formatter: {
      type: Function,
    },
    // 可选shortcuts, 前7天 15天 30天 近7天 15天 30天 和本日 本周 本月 昨日 上周 上月
    presets: {
      type: Array,
    },
    // future / pass / function
    allow: {
      type: [String, Function],
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
  },
  watch: {
    value: {
      handler(nv) {
        this.data = nv;
      },
      deep: true,
    },
  },
  data() {
    return {
      data: [],
      dateOptions: {
        shortcuts: this.getShortCuts(),
        disabledDate: (v) => {
          const type = typeof this.allow;
          if (type === 'string') {
            if (this.allow === 'future') {
              return this.$moment() > this.$moment(v);
            } else if (this.allow === 'todayAndFuture') {
              return this.$moment() > this.$moment(v).add(1, 'days');
            } else if (this.allow === 'history') {
              return this.$moment().subtract(1, 'days') < this.$moment(v);
            } else if (this.allow === 'lastMonthExcludeToday') {
              return this.$moment(v) < this.$moment().subtract(32, 'days')
                      || this.$moment().subtract(1, 'days') <= this.$moment(v);
            }
            return this.$moment() < this.$moment(v);
          } else if (type === 'function') {
            return this.allow(v);
          }
          return false;
        },
      },
    };
  },
  computed: {
  },
  created() {
    if (this.default) {
      // 默认值，并提交更改
      this.data = this.getPresets(this.default);
      this.formatOutput(this.data);
    } else {
      this.data = this.parser ? this.parser(this.value) : this.$lodash.cloneDeep(this.value);
    }
    // 第一次并不会触发on-change
    this.$emit('on-change', this.data);
  },
  methods: {
    getShortCuts() {
      let options = [];
      if (this.presets) {
        options = this.presets.map(e => ({
          text: e,
          value: () => this.getPresets(e),
        }));
      }
      return options;
    },
    getPresets(dateRange) {
      switch (dateRange) {
        case '前7天':
          return this.getPreDateRange(7);
        case '前15天':
          return this.getPreDateRange(15);
        case '前30天':
          return this.getPreDateRange(30);
        case '近7天':
          return this.getPreDateRange(7, true);
        case '近15天':
          return this.getPreDateRange(15, true);
        case '近30天':
          return this.getPreDateRange(30, true);
        case '本日':
          return [this.$moment().format('YYYY-MM-DD'), this.$moment().format('YYYY-MM-DD')];
        case '本周':
          return [
            (this.$moment() > this.$moment().day(1) ? this.$moment().day(1) : this.$moment()).format('YYYY-MM-DD'),
            this.$moment().format('YYYY-MM-DD'),
          ];
        case '本月':
          return [this.$moment().format('YYYY-MM-01'), this.$moment().format('YYYY-MM-DD')];
        case '昨日':
          return [
            this.$moment().subtract(1, 'days').format('YYYY-MM-DD'),
            this.$moment().subtract(1, 'days').format('YYYY-MM-DD'),
          ];
        case '上周':
          return [
            this.$moment().subtract(1, 'weeks').day(1).format('YYYY-MM-DD'),
            this.$moment().day(0).format('YYYY-MM-DD'),
          ];
        case '上月':
          return [
            this.$moment().subtract(1, 'months').format('YYYY-MM-01'),
            this.$moment().subtract(1, 'months').endOf('months').format('YYYY-MM-DD'),
          ];
        case '明天':
          return [
            this.$moment().add(1, 'days').format('YYYY-MM-DD'),
            this.$moment().add(1, 'days').format('YYYY-MM-DD'),
          ];
        case '下周':
          return [
            this.$moment().add(1, 'weeks').day(1).format('YYYY-MM-DD'),
            this.$moment().add(2, 'weeks').day(0).format('YYYY-MM-DD'),
          ];
        case '下个月':
          return [
            this.$moment().add(1, 'months').format('YYYY-MM-01'),
            this.$moment().add(1, 'months').endOf('months').format('YYYY-MM-DD'),
          ];
        default:
          return '';
      }
    },
    // include 表示包含今日
    getPreDateRange(daysBefore, include) {
      const temp = include ? daysBefore - 1 : daysBefore;
      return [
        this.$moment().subtract(temp, 'days').format('YYYY-MM-DD'),
        include ? this.$moment().format('YYYY-MM-DD') : this.$moment().subtract(1, 'days').format('YYYY-MM-DD'),
      ];
    },
    formatOutput(v) {
      let newValue = null;
      if (this.formatter) {
        newValue = this.formatter(v);
      } else if (this.$lodash.isArray(v)) {
        newValue = this.$lodash.every(v, Boolean) ? [
          this.$moment(v[0]).format('YYYY-MM-DD'),
          this.$moment(v[1]).format('YYYY-MM-DD'),
        ].join(' - ') : '';
      } else {
        newValue = v;
      }
      this.$emit('update:value', newValue);
    },
    handleChange(v) {
      this.formatOutput(v);
    },
    handleClear() {
      this.formatOutput('');
    },
  },
};
</script>
