<template>
    <b-container fluid>
        <gmaps-map :options="map_options">
            <gmaps-marker
                v-for="(item, i) in options"
                :key="i"
                :position="options[i]"
            />
        </gmaps-map>
    </b-container>
</template>

<script>
import { gmapsMap, gmapsMarker } from 'x5-gmaps'
export default {
    name: 'PlaceInformation',
    components: {
        gmapsMap, 
        gmapsMarker
    },
    props: ['map_options', 'options']
}
</script>

<style lang="stylus" scoped>

</style>