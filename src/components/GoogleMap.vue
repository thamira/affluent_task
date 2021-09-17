<template>
  <div>
    <GmapMap
      :center='center'
      :zoom='12'
      style='width:100%;  height: 400px;'
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      />
    </GmapMap>   
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  props: ['center'],
  data() {
    return {
      markers: [],
    }
  }, 
  methods: {
    geolocate: function() {
      // this.center = {
      //   lat: position.coords.latitude,
      //   lng: position.coords.longitude,
      // };
    },    
  }, 
}
</script>