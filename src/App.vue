<template>
  <div id="app">
    <Home 
          v-bind:query = "query" 
          :daily_weather = "daily_weather"
          :more_details= "more_details"
          @clicked="searchNewPlace"
          @more-details="moreDetails"
    />
  </div>
</template> 

<script>
  import Home from './components/Home.vue'
  import Vue from 'vue'
  export default {
    name: 'App',
    components: {
      Home
    },
    data (){
      return {
        api_key : 'f30c9b776d93635dee1f2dd0677b1a6f',
        base_url: 'https://api.openweathermap.org/data/2.5/',
        weather: {},
        error: '',
        query: 'Osaka',
        dates: [],
        daily_weather: [],
        more_details: [],
      }
    },
    created(){
      this.fetchData()
    },
    methods:{
      searchNewPlace(value){
        this.query = value
        this.fetchData()
      }, //event click function for searching new place
      moreDetails(value){
        Vue.set(this.more_details,0, [])
        let temp_index = 0
        for(let i = 0; i < this.weather.list.length; i++){
          if(this.converDate(this.weather.list[i].dt_txt) == value){
            temp_index++
            let temp = {
              'details': this.weather.list[i],
              'city': this.weather.city
            }
            Vue.set(this.more_details,temp_index, temp)
          }
        }
      }, //event click function for fetching details for the modal
      fetchData () {
        fetch(`${this.base_url}forecast?q=${this.query}&units=metric&APPID=${this.api_key}`)
        .then(res => {
          return res.json()
        })
        .then(this.manageResults)
        .catch(e => {
          console.log(e)
        })
      }, //fetching of data from the API
      manageResults(results) {
        this.weather = results
        this.dates = this.manageDate()
        this.daily_weather = this.getNearestTimeOfTheDay()
      }, //manage results from different functions
      getNearestTimeOfTheDay(){
        let nearest_date, nearest_diff = Infinity
        let date_array = []
        let d = new Date()
        let current_date = d.getDate()+ ' ' + this.months(parseInt(d.getMonth()))
        for(let j = 0; j < this.dates.length; j++){
          for(let i = 0; i < this.weather.cnt; i++){
            if(current_date == this.converDate(this.weather.list[i].dt_txt)){
              let d = new Date()
              let time = this.convertDateTime(this.weather.list[i].dt_txt)
              let cur_time = (d.getHours())
              let diff = Math.abs(cur_time - time[0])
              if(diff < nearest_diff){
                nearest_diff = diff
                nearest_date = {
                  'time' : time[1],
                  'date' : this.dates[j].dates,
                  'details': this.weather.list[i],
                  'day' : this.dates[j].days,
                  'city': this.weather.city,
                }
              }
            }
            else if(this.converDate(this.weather.list[i].dt_txt) == this.dates[j].dates){
              let time = this.convertDateTime(this.weather.list[i].dt_txt)
              if(time[0] == 9){
                nearest_date = {
                  'time' : time[1],
                  'date' : this.dates[j].dates,
                  'details': this.weather.list[i],
                  'day' : this.dates[j].days,
                  'city': this.weather.city,
                }
              }
            }
          }
          date_array.push(nearest_date)
        }
        return date_array
      }, //returns the nearest time of the day from the time list for initial rendering of data on the page
      converDate(dt){
        let d = new Date(dt)
        return d.getDate() +' '+ this.months(parseInt(d.getMonth()))
      }, //converTdate for converting dates
      convertDateTime(dt){
        let d = new Date(dt)
        return Array(d.getHours(), d.getHours() +':'+ d.getMinutes()+':'+d.getSeconds())
      }, //convertion of time to get the hours and format time
      manageDate(){
        let array_dates = []
        for(let i = 0; i < 5; i++) {
          let currentDate = new Date();
          currentDate.setDate(currentDate.getDate() + i);
          array_dates.push({
                              'dates': currentDate.getDate() + " " + this.months(currentDate.getMonth()),
                              'days': this.days(currentDate.getDay())
          });
        }
        return array_dates
      }, //get the first 5 days 
      months(index) {
          let month = new Array();
          month[0] = "January";
          month[1] = "February";
          month[2] = "March";
          month[3] = "April";
          month[4] = "May";
          month[5] = "June";
          month[6] = "July";
          month[7] = "August";
          month[8] = "September";
          month[9] = "October";
          month[10] = "November";
          month[11] = "December";

          return month[index];
      }, //returns the month 
      days(index) {
          let weekdays = new Array(7);
          weekdays[0] = "Sunday";
          weekdays[1] = "Monday";
          weekdays[2] = "Tuesday";
          weekdays[3] = "Wednesday";
          weekdays[4] = "Thursday";
          weekdays[5] = "Friday";
          weekdays[6] = "Saturday";

          return weekdays[index];
      } //returns the day
    },
  }
</script>

<style>

</style>
