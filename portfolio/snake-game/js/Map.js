class Map {
  constructor() {
    let mapEl = document.createElement('div');
    mapEl.className = 'map';
    document.body.appendChild(mapEl);
    this.mapEl = mapEl; // 其它地方需要用到地图宽高，因此把 DOM 对象绑定到实例属性
  }
}
