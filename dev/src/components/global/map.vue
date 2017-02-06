<template lang="html">
<div id="map-canvas"></div>
</template>

<script>
import * as actions from 'vuex/actions'
import $ from 'jquery'
export default {
  vuex: {
    getters: {
      count: state => state.index.count,
    },
    actions
  },
  components: {
  },
  data() {
    return {
    }
  },
  props: {
    exist: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
      default: "I don't known this instruction"
    }
  },
  methods: {
  },
  computed: {
  },
  route: {
  },
  created () {
  },
  ready () {
// if HTML DOM Element that contains the map is found...
    if (document.getElementById('map-canvas')){

      //google map custom marker icon - .png fallback for IE11
      var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
      var $marker_url = ( is_internetExplorer11 ) ? 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3393/rs-icon-location.png' : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3393/rs-icon-location.svg';

      var $marker_url2 = ( is_internetExplorer11 ) ? 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3393/rs-griffin-location.png' : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3393/rs-griffin-location.svg';

      var locations = [
          ['<div>HomeTown<div>', 30.2415155,120.1673281, 1],
          ['ShangHai', 31.2231337,120.9162718, 1],
          ['BeiJing', 39.9385466,116.1172682, 1],
          ['XiNing', 36.6183053,101.6362278, 1],
          ['XiAn', 34.2590616,108.6870148, 1],
          ['GuiLing', 25.4174375,110.2355031, 1],
          ['HangKong', 22.3590985,113.8606689, 1],
          ['XiaMen', 24.4791331,117.9691197, 1],
          ['Manchester', 53.4721635,-2.3636682, 1],
          ['London', 53.4721635,-2.3636682, 1],
          ['Edinburgh', 55.9410457,-3.2754231,, 1],
          ['Rome', 43.7494503,11.247294, 1],
          ['Florence', 41.909986,12.3959127, 1],
          ['Venice', 45.4053211,12.1015556, 1],
          ['Milan', 45.4627124,9.1076922, 1],

        ];

      //define the basic color of your map, plus a value for saturation and brightness
      var  $main_color = '#020327',
          $saturation= -20,
          $brightness= -1;

      //we define here the style of the map
      var style= [
        {
          //set saturation for the labels on the map
          elementType: "labels",
          stylers: [
            {saturation: $saturation}
          ]
        },
          { //poi stands for point of interest - don't show these lables on the map
          featureType: "poi",
          elementType: "labels",
          stylers: [
            {visibility: "on"}
          ]
        },
        {
          //don't show highways lables on the map
              featureType: 'road.highway',
              elementType: 'labels',
              stylers: [
                  {visibility: "on"}
              ]
          },
        {
          //don't show local road lables on the map
          featureType: "road.local",
          elementType: "labels.icon",
          stylers: [
            {visibility: "on"}
          ]
        },
        {
          //don't show arterial road lables on the map
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [
            {visibility: "off"}
          ]
        },
        {
          //don't show road lables on the map
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [
            {visibility: "off"}
          ]
        },
        //style different elements on the map
        {
          featureType: "transit",
          elementType: "geometry.fill",
          stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
          ]
        },
        {
          featureType: "poi",
          elementType: "geometry.fill",
          stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
          ]
        },
        {
          featureType: "poi.government",
          elementType: "geometry.fill",
          stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
          ]
        },
        {
          featureType: "poi.sport_complex",
          elementType: "geometry.fill",
          stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
          ]
        },
        {
          featureType: "poi.attraction",
          elementType: "geometry.fill",
          stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
          ]
        },
        {
          featureType: "poi.business",
          elementType: "geometry.fill",
          stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
          ]
        },
        {
          featureType: "transit",
          elementType: "geometry.fill",
          stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
          ]
        },
        {
          featureType: "transit.station",
          elementType: "geometry.fill",
          stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
          ]
        },
        {
          featureType: "landscape",
          stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
          ]

        },
        {
          featureType: "road",
          elementType: "geometry.fill",
          stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: $brightness },
            { saturation: $saturation }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            { hue: $main_color },
            { visibility: "on" },
            { lightness: -20 },
            { saturation: $saturation }
          ]
        }
      ];

        var map = new google.maps.Map(document.getElementById('map-canvas'), {
          zoom: 12,
        panControl: false,
    //    zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
          center: new google.maps.LatLng(42.046863, -87.689456),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          scrollwheel: false,
          styles: style,
        });


        var infowindow = new google.maps.InfoWindow({
          maxWidth: 300
        });

        var marker, i;
        var markers = new Array();

        for (i = 0; i < locations.length; i++) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
    //        icon: $marker_url,
            icon: locations[i][4],
          });

          markers.push(marker);

          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent(locations[i][0]);
              infowindow.open(map, marker);
            }
          })(marker, i));
        }

        function AutoCenter() {
          //  Create a new viewpoint bound
          var bounds = new google.maps.LatLngBounds();
          //  Go through each...
          $.each(markers, function (index, marker) {
          bounds.extend(marker.position);
          });
          //  Fit these bounds to the map
          map.fitBounds(bounds);
        }
        AutoCenter();

    }
  },
  beforeDestroy () {
  }
}
</script>

<style lang="css" scoped>

html, body {
  height: 100%;
}
#map-canvas{
  height: 100%;
  width: 100%;
}
</style>
