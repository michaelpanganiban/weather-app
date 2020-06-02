<template>
	<div class="site-content">
		<div class="site-header">
			<div class="container">
				<a href="" class="branding">
					<div class="logo-type">
						<h1>Biz<b  v-bind:style="{'color':'white'}">mates</b></h1>
						<small class="site-description">No.1 ONLINE BUSINESS ENGLISH SCHOOL in Japan</small>
					</div>
				</a>
				<div class="mobile-navigation"></div>
			</div>
		</div>
		<div class="hero" v-bind:style="{'background-image': 'url(assets/images/japan.jpg)', 'background-color': 'red'}" >
			<div class="container">
				<form action="#" class="find-location">
					<input type="text"  v-model="query"  placeholder="Find your location...">
					<input type="submit" @click="searchPlace" value="Find">
				</form>
			</div>
		</div>
		<Forecast 
			:daily_weather = 'daily_weather'
			:more_details = 'more_details'
			@more-details="moreDetails"
		/><hr>
		<div class="container" >
			<h2 class="section-title">{{this.query}} -</h2><h3> Tourist Destinations</h3>
			<div class="row" > 
				<div class="col-md-6">
					<ul class="arrow-list" >
						<li v-for="(item, i) in places_list"
								:key="i"
						><a href="#">{{places_list[i].name}} | {{places_list[i].location.formattedAddress[0]}}</a></li>
						
					</ul>
				</div>
				<div class="col-md-6">
					<PlaceInformation
						:map_options = "map_options"
						:options = "options"
					/>
				</div>
			</div>
		</div><br>
	</div>
</template>

<script>
import Forecast from './Forecast'
import PlaceInformation from './PlaceInformation'

	export default {
		name: 'Home',
		components: {
			Forecast,
			PlaceInformation
		},
		props : ['query','daily_weather', 'more_details', 'map_options', 'options', 'places_list'],
		methods: {
			searchPlace(event){
				event.preventDefault()
				this.$emit('clicked', this.query)
			}, //search place function on click
			moreDetails(value){
				this.$emit('more-details', value)
			}, //more details function on click
			
		},
		
	}
</script>
<style scoped>
	.site-header{
		background-color:#1e202b !important;
	}
	.site-content{
		background-color:#1e202b !important;
		color: whitesmoke !important;
	}
</style>
