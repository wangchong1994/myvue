export default class BaiduMap {
  constructor(mapId, inputId, vue) {
    this.mapId = mapId;
    this.inputId = inputId;
    this.Vue = vue;
    this.init().then();
  }

  mountMap(ak) {
    return new Promise(function (resolve, reject) {
      window.init = function () {
        resolve(BMap);
      };
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'http://api.map.baidu.com/api?v=2.0&ak=' + ak + '&callback=init';
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async init() {
    const BMap = await this.mountMap('1WSoTCTBG3GPMxenWNp9RuoKjhjNVtTC');
    this.map = new BMap.Map(this.mapId); // 创建Map实例
    // 自动获取当前地址
    const geolocation = new BMap.Geolocation();
    // 因为百度自己获取的当前位置不准确， 所以去掉了
    // geolocation.getCurrentPosition(
    //   (r) => {
    //       if (geolocation.getStatus() === BMAP_STATUS_SUCCESS) {
    //           const point = new BMap.Point(r.point.lng, r.point.lat)
    //           const mk = new BMap.Marker(point);
    //           this.map.addOverlay(mk);
    //           this.map.centerAndZoom(point, 15);
    //           this.getSurrounding(point);
    //       } else {
    //         const point = new BMap.Point(116.404, 39.915); // 创建点坐标
    //         this.map.centerAndZoom(point, 15);
    //         this.getSurrounding(point);
    //       }
    //   },
    //   { enableHighAccuracy: true },
    // );
    this.addPluginToMap();
  }

  addPluginToMap() {
    // 定位控件
    this.map.addControl(new BMap.NavigationControl({ type: BMAP_NAVIGATION_CONTROL_ZOOM }));
    const h5Location = new BMap.GeolocationControl();
    this.map.addControl(h5Location);
    h5Location.addEventListener('locationSuccess', (e) => {
      this.getSurrounding(e.point);
    });

    // 给地图添加点击事件
    this.geocoder = new BMap.Geocoder({ poiRadius: 1000 });
    this.map.addEventListener('click', (e) => {
      this.geocoder.getLocation(e.point, (rs) => {
        this.map.clearOverlays();
        this.map.addOverlay(new BMap.Marker(rs.point));
        this.getSurrounding(rs.point);
      });
    });
  }

  setPlace(value) {
    this.map.clearOverlays(); // 清除地图上所有覆盖物
    const local = new BMap.LocalSearch(this.map, { // 智能搜索
      onSearchComplete: (results) => {
        const userLocation = results.getPoi(0).point; // 获取第一个智能搜索的结果
        this.geocoder.getLocation(userLocation, (rs) => {
          this.Vue.$emit('surrounding-change', rs);
        });
        this.map.centerAndZoom(userLocation, 15);
        this.map.addOverlay(new BMap.Marker(userLocation)); // 添加标注
      },
    });
    local.search(value);
  }

  setPoint(value) {
    console.log('value', value);
    const point = new BMap.Point(value.x, value.y)
    const mk = new BMap.Marker(point);
    this.map.addOverlay(mk);
    this.map.centerAndZoom(point, 15);
    this.getSurrounding(point);
  }

  getSurrounding(point) {
    this.geocoder.getLocation(point, (rs) => {
      this.Vue.$emit('surrounding-change', rs);
    });
  }

  getCurrent(value) {
    const point = new BMap.Point(value.x, value.y);
    this.geocoder.getLocation(point, (rs) => {
      console.log('point', point);
    });
  }
}
