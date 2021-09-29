<template>
  <div id="app">
    <div ref="cesium" id="cesiumContainer"></div>
  </div>
</template>

<script>
const Cesium = require('cesium')
// import Cesium from 'cesium'
import 'cesium/Source/Widgets/widgets.css'
export default {
  name: 'App',
  data() {
    return {
      msg: 'hello',
      showRoterView: true,
    }
  },
  provide() {
    return {
      reloadRouterView: this.reLoad,
    }
  },
  mounted() {
    setTimeout(() => {
      this.initCesium()
    })
  },
  methods: {
    reLoad() {
      this.showRoterView = false
      setTimeout(() => {
        this.showRoterView = true
      })
    },
    initCesium() {
      let viewerOption = {
        geocoder: false, // 地理位置搜索控件
        homeButton: false, // 首页跳转控件
        sceneModePicker: false, // 2D,3D和Columbus View切换控件
        baseLayerPicker: false, // 三维地图底图切换控件
        navigationHelpButton: false, // 帮助提示控件
        animation: false, // 视图动画播放速度控件
        timeline: false, // 时间轴控件
        fullscreenButton: false, // 全屏控件
        infoBox: false, // 点击显示窗口控件
        selectionIndicator: false, // 实体对象选择框控件
        scene3DOnly: true, // 仅3D渲染，节省GPU内存
        // terrainProvider: Cesium.createWorldTerrain({
        //   requestWaterMask: true,
        // }),
      }
      // let entities
      Cesium.Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyYzA3MTIxZS03MWI2LTRhODAtYTc4MS0xNWQ0YTExZDY5YjQiLCJpZCI6Njg1NjgsImlhdCI6MTYzMjcxMjIyNn0.i1p7Nwkl2d2b9rSje_Cxy3TkRZPKL2VqR7SePwB13eo'
      // const viewer = new Cesium.Viewer('cesiumContainer', viewerOption)
      // Cesium.GeoJsonDataSource.load('/xian/x.json', {clampToGround: true}).then(dataSource => {
      //   viewer.dataSources.add(dataSource)
      //   entities = dataSource.entities.values 
      //   console.log(entities.length)
      //    for (var i = 0; i < entities.length;i++) {
      //      if(i == 0) console.log(entities[0])
      //       var entity = entities[i];
      //       // 赋随机颜色
      //       var color=Cesium.Color.fromRandom({alpha: 0.7});
      //       entity.polygon.fill = true;
      //       entity.polygon.material = color;
      //       entity.polygon.outline = true;
      //       entity.polygon.extrudedHeight = entity.properties.height
      //       entity.polygon.outlineColor = Cesium.Color.RED;
      //   }

      // })  

    










      var viewer = new Cesium.Viewer('cesiumContainer', {
        ...viewerOption,
        terrainProvider: Cesium.createWorldTerrain(), //加入地形
      })
      // viewer.imageryLayers.addImageryProvider(
      //   new Cesium.ArcGisMapServerImageryProvider({
      //     url:
      //       "http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer",
      //   })
      // );


      var palaceTileset = new Cesium.Cesium3DTileset({      url: "/xia/tileset.json",    });    
      let ents =  viewer.scene.primitives.add(palaceTileset);   
      
      ents.readyPromise
      .then(function (tileset) { 
          var cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center);
          var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
          var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0);
          var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
          tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
        tileset.style = new Cesium.Cesium3DTileStyle({
          color : {
              conditions : [
                  ["${Floor} >= 300", "rgba(45, 0, 75, 0.5)"],
                  ["${Floor} >= 200", "rgb(102, 71, 151)"],
                  ["${Floor} >= 100", "rgb(170, 162, 204)"],
                  ["${Floor} >= 50", "rgb(224, 226, 238)"],
                  ["${Floor} >= 25", "rgb(252, 230, 200)"],
                  ["${Floor} >= 10", "rgb(248, 176, 87)"],
                  ["${Floor} >= 5", "rgb(198, 106, 11)"],
                  ["true", "rgb(127, 59, 8)"]
              ]
          }
      })      

      viewer.flyTo(ents)
        // viewer.scene.primitives.add(tileset);     
        // setColor(tileset)   
        // viewer.zoomTo(  tileset,new Cesium.HeadingPitchRange(0.5,-0.2, tileset.boundingSphere.radius * 1.0  ));
        // var boundingSphere = tileset.boundingSphere;
        // var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
        // var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
        // var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
        // var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
        // tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
     }).otherwise(function (error) {        console.log(error);      });

      
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)

      // Add Cesium OSM buildings to the scene as our example 3D Tileset.
      // var osmBuildingsTileset = Cesium.createOsmBuildings()  //加载cesuum osm 建筑到屏幕 作为3d titleset例子
      // viewer.scene.primitives.add(osmBuildingsTileset)

      // Set the initial camera to look at Seattle
      // viewer.scene.camera.setView({
      //   destination: Cesium.Cartesian3.fromDegrees(108.960384, 34.30514, 370),
      //   orientation: {
      //     heading: Cesium.Math.toRadians(10),
      //     pitch: Cesium.Math.toRadians(-10),
      //   },
      // })
      handler.setInputAction((e) => {
        var pick = viewer.scene.pick(e.position);
        console.log(e , pick);
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)


       let position = Cesium.Cartesian3.fromDegrees(108.960384, 34.30514,0)
       let hpRoll = new Cesium.HeadingPitchRoll()
       let fixedFrameTransforms =  Cesium.Transforms.localFrameToFixedFrameGenerator('north', 'west');

      let carPrimitive = viewer.scene.primitives.add(Cesium.Model.fromGltf({
            url: '../Apps/SampleData/models/CesiumMilkTruck/CesiumMilkTruck-kmc.glb',
            modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(position, hpRoll, Cesium.Ellipsoid.WGS84, fixedFrameTransforms),
            minimumPixelSize:128
        }));


      // Styling functions

      // Color by material checks for null values since not all
      // buildings have the material property.
      function colorByMaterial() {
        osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
          defines: {
            material: "${feature['building:material']}",
          },
          color: {
            conditions: [
              ['${material} === null', "color('white')"],
              ["${material} === 'glass'", "color('skyblue', 0.5)"],
              ["${material} === 'concrete'", "color('grey')"],
              ["${material} === 'brick'", "color('indianred')"],
              ["${material} === 'stone'", "color('lightslategrey')"],
              ["${material} === 'metal'", "color('lightgrey')"],
              ["${material} === 'steel'", "color('lightsteelblue')"],
              ['true', "color('white')"], // This is the else case
            ],
          },
        })
      }

      function highlightAllResidentialBuildings() {
        osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
          color: {
            conditions: [
              ["${feature['building']} === 'apartments' || ${feature['building']} === 'residential'", "color('cyan', 0.9)"],
              [true, "color('white')"],
            ],
          },
        })
      }

      function showByBuildingType(buildingType) {
        switch (buildingType) {
          case 'office':
            osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
              show: "${feature['building']} === 'office'",
            })
            break
          case 'apartments':
            osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
              show: "${feature['building']} === 'apartments'",
            })
            break
          default:
            break
        }
      }
       
      function setColor(ents) {
        let entities = ents.entities.values
        console.log(entities)
      }

      // Color the buildings based on their distance from a selected central location
      function colorByDistanceToCoordinate(pickedLatitude, pickedLongitude) {
        osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
          defines: {
            distance: "distance(vec2(${feature['cesium#longitude']}, ${feature['cesium#latitude']}), vec2(" + pickedLongitude + ',' + pickedLatitude + '))',
          },
          color: {
            conditions: [
              ['${distance} > 0.014', "color('blue')"],
              ['${distance} > 0.010', "color('green')"],
              ['${distance} > 0.006', "color('yellow')"],
              ['${distance} > 0.0001', "color('red')"],
              ['true', "color('white')"],
            ],
          },
        })
      }

      // When dropdown option is not "Color By Distance To Selected Location",
      // remove the left click input event for selecting a central location
      function removeCoordinatePickingOnLeftClick() {
        document.querySelector('.infoPanel').style.visibility = 'hidden'
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
      }

      // Add event listeners to dropdown menu options
      // document.querySelector('.infoPanel').style.visibility = 'hidden'
      return
      var menu = document.getElementById('dropdown')

      menu.options[0].onselect = function () {
        removeCoordinatePickingOnLeftClick()
        colorByMaterial()
      }

      menu.options[1].onselect = function () {
        // Default to Space Needle as the central location
        colorByDistanceToCoordinate(47.62051, -122.34931)
        document.querySelector('.infoPanel').style.visibility = 'visible'
        // Add left click input to select a building to and extract its coordinates
        handler.setInputAction(function (movement) {
          viewer.selectedEntity = undefined
          var pickedBuilding = viewer.scene.pick(movement.position)
          if (pickedBuilding) {
            var pickedLatitude = pickedBuilding.getProperty('cesium#latitude')
            var pickedLongitude = pickedBuilding.getProperty('cesium#longitude')
            colorByDistanceToCoordinate(pickedLatitude, pickedLongitude)
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
      }

      menu.options[2].onselect = function () {
        removeCoordinatePickingOnLeftClick()
        highlightAllResidentialBuildings()
      }

      menu.options[3].onselect = function () {
        removeCoordinatePickingOnLeftClick()
        showByBuildingType('office')
      }

      menu.options[4].onselect = function () {
        removeCoordinatePickingOnLeftClick()
        showByBuildingType('apartments')
      }

      menu.onchange = function () {
        Sandcastle.reset()
        var item = menu.options[menu.selectedIndex]
        if (item && typeof item.onselect === 'function') {
          item.onselect()
        }
      }

      colorByMaterial()
    },
  },
}
</script>

<style lang='less'>
body {
  margin: 0;
  padding: 0;
}
#app,
#cesiumContainer {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  overflow: hidden;
  /* background: #18295a; */
  /* background: url(~@/assets/img/conbg.png) no-repeat; */
  /* background-size: 100% 100%; */
}
</style>

