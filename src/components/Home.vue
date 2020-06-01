<template>
<div>
	<div class="site-content">
		<div class="site-header">
			<div class="container">
				<a href="" class="branding">
					<!-- <img src="assets/images/icons/bizmates.png" alt="" class="logo" v-bind:style="{'width': '140px'}"> -->
					<div class="logo-type">
						<h1>Biz<b  v-bind:style="{'color':'white'}">mates</b></h1>
						<small class="site-description">No.1 ONLINE BUSINESS ENGLISH SCHOOL in Japan</small>
					</div>
				</a>
				<div class="mobile-navigation"></div>

			</div>
		</div> <!-- .site-header -->
		<div class="hero" v-bind:style="{'background-image': 'url(assets/images/japan.jpg)', 'background-color': 'red'}" >
			<div class="container">
				<form action="#" class="find-location">
					<input type="text"  v-model="query"  placeholder="Find your location...">
					<!-- <select>
						<option value="Osaka">Osaka</option>
					</select> -->
					<input type="submit" @click="searchPlace" value="Find">
				</form>
			</div>
		</div>
		<Forecast 
			:daily_weather = 'daily_weather'
			:more_details = 'more_details'
			@more-details="moreDetails"
		/>
	</div>
</div>
</template>

<script>
import Forecast from './Forecast'

	export default {
		name: 'HelloWorld',
		components: {
			Forecast
		},
		props : ['query','daily_weather', 'more_details'],
		methods: {
			searchPlace(event){
				event.preventDefault()
				this.$emit('clicked', this.query)
			}, //search place function on click
			moreDetails(value){
				this.$emit('more-details', value)
			} //more details function on click
		}
	}
</script>
<style scoped>

</style>
