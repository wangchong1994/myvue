const payTypeOptions = [
  {
    label: '微信支付',
    value: '1',
  },
  {
    label: '支付宝',
    value: '2',
  },
  {
    label: '京东支付',
    value: '3',
  },
  {
    label: '现金支付',
    value: '4',
  },
  {
    label: '微信支付（代收）',
    value: '5',
  },
  {
    label: '支付宝支付（代收）',
    value: '6',
  },
  {
    label: '读卡器支付',
    value: '7',
  },
  {
    label: '指纹支付',
    value: '8',
  },
  {
    label: '会员卡余额支付',
    value: '9',
  },
  {
    label: '刷卡',
    value: '10',
  },
  {
    label: '银联云闪付',
    value: '11',
  },
  {
    label: '内部卡支付',
    value: '98',
  },
  {
    label: '第三方支付',
    value: '99',
  },
  {
    label: '兑换码',
    value: '100',
  },
  {
    label: '品牌商微信代收',
    value: '201',
  },
  {
    label: '品牌商支付宝代收',
    value: '202',
  },
  {
    label: '品牌商第三方代收',
    value: '203',
  },
  // '1': '微信',
  // '2': '支付宝',
  // '3': '京东支付',
  // '4': '现金支付',
  // '5': '微信支付（代收）',
  // '6': '支付宝支付（代收）',
  // '7': '读卡器支付',
  // '8': '指纹支付',
  // '9': '会员卡余额支付',
  // '10': '银联闪付',
  // '98': '内部卡支付',
  // '99': '第三方支付',
  // '100': '兑换码',
  // '201': '品牌商微信代收',
  // '202': '品牌商支付宝代收',
  // '203': '品牌商第三方代收',
];

const accountType = [
  {
    value: 1,
    label: '补货账号',
  },
  {
    value: 2,
    label: '维修账号',
  },
  {
    value: 3,
    label: '合作伙伴账号',
  },
  {
    value: 99,
    label: '管理员账号',
  },
  {
    value: 0,
    label: '其他',
  },
];

const shelfTemplates = {
  VERTICAL_3X10: 1,
  HORIZONTAL: 2,
  NO_SCREEN: 3,
  VERTICAL_5X4: 4,
};

const operatorsNameList = {
  46000: '中国移动（GSM/TD-SCDMA）',
  46001: '中国联通（GSM）',
  46002: '中国移动（GSM/TD-SCDMA）',
  46003: '中国电信（CDMA）',
  46004: '中国移动 (流量卡)',
  46005: '中国电信（CDMA）',
  46006: '中国联通（WCDMA）',
  46007: '中国移动（TD-SCDMA）',
  46008: '未知运营商',
  46009: '未知运营商',
  46010: '未知运营商',
  46011: '中国电信（FDD-LTE）',
};

module.exports = {
  methods: {
    getDate(time) {
      const text = time ? this.$moment.unix(time).format('YYYY-MM-DD HH:mm:ss') : '';
      return text;
    },
    getDateYMD(time) {
      const text = time ? this.$moment.unix(time).format('YYYY-MM-DD') : '';
      return text;
    },
    getDateShort(time) {
      const text = time ? this.$moment.unix(time).format('YYYY/M/D') : '';
      return text;
    },
    getDatetTime(time) {
      const text = time ? this.$moment.unix(time).format('HH:mm:ss') : '';
      return text;
    },
    parseToFixed(val, divisor, fixed) {
      const value = parseFloat((val / divisor).toFixed(fixed));
      return value;
    },
    parseToFixedText(val, divisor, fixed) {
      const value = (val / divisor).toFixed(fixed);
      return value;
    },
    /* eslint-disable */
    accSub(arg1, arg2) {
      //解决js浮点数减法bug
      var r1, r2, m, n;
      try {
        r1 = arg1.toString().split('.')[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.toString().split('.')[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
      n = r1 >= r2 ? r1 : r2;
      return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    accAdd(arg1, arg2) {
      //解决js浮点数加法bug
      var r1, r2, m, c;
      try {
        r1 = arg1.toString().split('.')[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.toString().split('.')[1].length;
      } catch (e) {
        r2 = 0;
      }
      c = Math.abs(r1 - r2);
      m = Math.pow(10, Math.max(r1, r2));
      if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
          arg1 = Number(arg1.toString().replace('.', ''));
          arg2 = Number(arg2.toString().replace('.', '')) * cm;
        } else {
          arg1 = Number(arg1.toString().replace('.', '')) * cm;
          arg2 = Number(arg2.toString().replace('.', ''));
        }
      } else {
        arg1 = Number(arg1.toString().replace('.', ''));
        arg2 = Number(arg2.toString().replace('.', ''));
      }
      return (arg1 + arg2) / m;
    },
    /* eslint-enable */
    // 通过路由信息选择调用仓库列表的创建框
    routerCreateModal() {
      const { modal } = this.$route.params;
      if (!modal) {
        return;
      }
      Object.keys(modal).forEach((key) => {
        this[key] = modal[key];
      });
    },
    refresh(key) {
      this.$refs[key].reset();
    },
    getStatus(value) {
      const attr = {
        text: '锁定',
        type: 'error',
        color: 'red',
      };
      if (value === 1) {
        attr.text = '正常';
        attr.type = 'primary';
        attr.color = 'blue';
      }
      return attr;
    },
    getTableColImg(h, src) {
      const oImg = h('img', {
        attrs: {
          src,
        },
        style: {
          width: '60px',
          height: '60px',
        },
        on: {
          click: () => {
            window.open(src);
          },
        },
      });
      return oImg;
    },
    getWindowDate(time) {
      if (!time) {
        return '-';
      }
      const text = time ? this.$moment(time).format('YYYY-MM-DD HH:mm:ss') : '';
      return text;
    },
    colSortChange(column, formName, refName) {
      if (column.order === 'normal') {
        return;
      }
      this[formName].sort = `${column.key}|${column.order}`;
      if (refName) {
        this.$refs[refName].getList();
      }
    },
    formatTimeRange(timerange) {
      return `${this.$moment.unix(timerange.start).format('YYYY-MM-DD HH:mm:ss')}-${this.$moment.unix(timerange.end).format('YYYY-MM-DD HH:mm:ss')}`;
    },
    /* eslint-disable no-underscore-dangle */
    filterTable(list, list2, field, field2) {
      const newList = [];
      list.forEach((obj) => {
        const newObj = this.$lodash.cloneDeep(obj);
        list2.some((obj2) => {
          if (obj[field] === obj2[field2]) {
            newObj._disabled = true;
            return true;
          }
          newObj._disabled = false;
          return false;
        });
        newList.push(newObj);
      });
      return newList;
    },
    /* eslint-enable no-underscore-dangle */
    // 格式化金额
    formatPrice(price) {
      const tmpPrice = (Math.round((price || 0) * 100) / 100).toFixed(2);
      return `${window.params.CurrencySymbol}${tmpPrice}`;
    },
    // 格式化金额 单位转换：分转换成元
    formatPriceDivide(price) {
      const tmpPrice = (Math.round(price || 0) / 100).toFixed(2);
      return `${window.params.CurrencySymbol}${tmpPrice}`;
    },
    // 转义支付类型（注意：在orderManagement/PageOrderList有个选择支付方式的，看看那里是否需要加）
    getPayType(payType) {
      const exist = payTypeOptions.find(e => parseInt(e.value, 10) === parseInt(payType, 10));
      if (exist) {
        return exist.label;
      }
      return '未知';
    },
    // 转换货柜型号
    formatCabinetName(value) {
      let text = value;
      switch (value) {
        case 'A':
          text = 'I';
          break;
        case 'B':
          text = 'II';
          break;
        case 'C':
          text = 'III';
          break;
        case 'D':
          text = 'IV';
          break;
        case 'E':
          text = 'V';
          break;
        case 'F':
          text = 'VI';
          break;
        default:
          break;
      }
      return text;
    },
  },
  computeds: {
    dateRangeOption() {
      const range = {
        shortcuts: [
          {
            text: '前七天',
            value() {
              const start = new Date();
              const end = new Date();
              start.setTime(start.getTime() - (3600 * 1000 * 24 * 7));
              return [start, end];
            },
          },
          {
            text: '前三十天',
            value() {
              const start = new Date();
              const end = new Date();
              start.setTime(start.getTime() - (3600 * 1000 * 24 * 30));
              return [start, end];
            },
          },
          {
            text: '本月',
            value: () => {
              const start = this.$moment()
                .startOf('month')
                .format('YYYY-MM-DD');
              const end = this.$moment()
                .endOf('month')
                .format('YYYY-MM-DD');
              return [start, end];
            },
          },
          {
            text: '上个月',
            value: () => {
              const lastMonth = this.$moment().add(-1, 'month');
              const start = lastMonth.startOf('month').format('YYYY-MM-DD');
              const end = lastMonth.endOf('month').format('YYYY-MM-DD');
              return [start, end];
            },
          },
        ],
      };
      return range;
    },
  },
  globals: {
    payTypeOptions,
    accountType,
    shelfTemplates,
    operatorsNameList,
  },
};
