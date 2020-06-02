<template>
    <div class="forecast-table">
        <div class="container">
            <div class="forecast-container">
                <div class="forecast" v-bind:class="index == 0 ? 'today': ''" :key="d.day" v-for="(d, index) in daily_weather">
                    <div> 
                        <div class="forecast-header">
                            <div class="day header-date">{{d.day}}</div>
                            <div class="date header-date" v-if="index == 0">{{d.date}}</div>
                        </div> 
                        <div class="forecast-content"  v-if="index == 0">
                            <div class="location location-md header-date">{{d.city.name}}, {{d.city.country}}</div>
                            <small class="date-time">{{convertDateTime()}}</small>
                            <div class="degree">
                                <div class="num">{{Math.round(d.details.main.temp)}}<sup>o</sup>C</div>
                                <div class="forecast-icon">
                                    <img :src='`http://openweathermap.org/img/wn/${d.details.weather[0].icon}@2x.png`' :alt="`${d.details.weather[0].main}`" width=90>
                                </div>	
                            </div>
                            <span><img src="assets/images/icon-wind.png" alt="">{{d.details.wind.speed}} km/h</span>
                            <span>{{d.details.weather[0].description.charAt(0).toUpperCase() + d.details.weather[0].description.substring(1)}}</span>
                            <span class="menu-item current-menu-item menu-item-solo"><a @click="moreDetails(d.date, d.day)">More</a></span> 
                        </div> 

                        <div class="forecast-content" v-if="index > 0">
                            <div class="forecast-icon">
                                <img :src='`http://openweathermap.org/img/wn/${d.details.weather[0].icon}@2x.png`' :alt="`${d.details.weather[0].main}`" width=90>
                            </div>
                            <div class="degree">{{Math.round(d.details.main.temp)}}<sup>o</sup>C</div>
                            <small>9: 00 AM</small><br>
                            <small>{{d.details.weather[0].description.charAt(0).toUpperCase() + d.details.weather[0].description.substring(1)}}</small>
                            <div class="more">
                                <span class="menu-item current-menu-item"><a  @click="moreDetails(d.date, d.day)">More</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal id="modalPopover" size="xl" title="OTHER DETAILS" ok-only v-model="dialog">
            <b-container fluid>
                <b-container fluid>
                    <b-row class="mb-1 text-center">
                        <b-col cols="3"><b>{{this.day}}, {{this.date}}</b></b-col>
                        <b-col><b>Sunrise: {{this.sunrise}}</b></b-col>
                        <b-col><b>Sunset: {{this.sunset}}</b></b-col>
                    </b-row><hr style="background-color: whitesmoke !important;">
                    <b-row class="justify-content-md-left" >
                        <b-col cols="3" v-bind:key="index" v-for="(i, index) in this.more_details" >
                                <b-col>
                                    <img :src='`http://openweathermap.org/img/wn/${more_details[index].details.weather[0].icon}@2x.png`' width=90>
                                </b-col>
                                <b-col><b>{{more_details[index].details.dt_txt}}</b></b-col>
                                <b-col>{{more_details[index].details.weather[0].description.charAt(0).toUpperCase() + more_details[index].details.weather[0].description.substring(1)}}</b-col>
                                <b-col>Wind: {{more_details[index].details.wind.speed}}</b-col><hr>

                                <b-col>Heat Index: {{more_details[index].details.main.feels_like}}° C</b-col>
                                <b-col>Humidity: {{more_details[index].details.main.humidity}}</b-col>
                                <b-col>Avg Temperature: {{more_details[index].details.main.temp}}° C</b-col>
                                <b-col>Max Temperature: {{more_details[index].details.main.temp_max}}° C</b-col>
                                <b-col>Min Temperature: {{more_details[index].details.main.temp_min}}° C</b-col>
                        </b-col>
                    </b-row>
                </b-container>
            </b-container>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'Forecast',
    props: ['daily_weather', 'more_details'],
    data() {
        return {
            dialog : false,
            day: '',
            date: '',
            sunrise: '',
            sunset:''
        }
    },
    methods: {
        convertDateTime(){
            let hours = new Date().getHours()
            let min = new Date().getMinutes()
            hours = (hours+24)%24; 
            var mid='am';
            if(hours==0){ 
                hours=12;
            }
            else if(hours>12){
                hours=hours%12;
                mid='pm';
            }
            return hours+':'+min+' '+mid
        }, //convert time to 12 hour format
        unixConvertion(unix_timestamp){
            let date = new Date(unix_timestamp * 1000);
            let hours = date.getHours();
            let type = ''
            if(hours > 12){
                type = ' PM'
                hours = hours - 12;
            }
            else{
                type = ' AM'
            }
            let minutes = "0" + date.getMinutes();
            return hours + ':' + minutes.substr(-2) + type;
        },
        convertDateTimeUnix(date){
            return new Date(date)
        },
        moreDetails(date, day){
            this.$emit('more-details', date)
            this.day = day
            this.date = date
            this.dialog = true
            this.sunrise= this.unixConvertion(this.more_details[0].city.sunrise),
            this.sunset= this.unixConvertion(this.more_details[0].city.sunset)
    
        } //toggle more details
    }   
}
</script>

<style>
    .modal-content{
        background-color: #1e202b  !important;
        color: whitesmoke !important;
    }
    table {
        table-layout: fixed;
        width: 100%;  
    }
    td{
        text-align: center;
    }
    a{
        cursor: pointer;
    }
    .date-time {
        font-size : 13px !important;
    }
    .location-md{
        font-size: 30px !important;
    }
    .more{
        margin-top: 27px;
        text-decoration: underline;
    }
    .menu-item-solo{
        text-decoration: underline;
    }

    .modal {
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(179, 178, 178, 0.4); /* Black w/ opacity */
    }

        /* Modal Content/Box */
    .modal-content {
        background-color: #1e2029;
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 85%; /* Could be more or less, depending on screen size */
    }

        /* The Close Button */
    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover, .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }
    .header{
        background-color: rgb(59, 58, 58);
        color: whitesmoke !important;
        font-weight: bold;
        padding: 5px 5px 5px 5px;
    }
    .modal-body{
        margin: 5px 50px 15px 25px;
    }
    .btn{
        background-color: teal;
        border: turquoise;
        border-radius: 3px;
        margin-top: 5px;
        padding: 4px 4px 4px 4px;
        color: whitesmoke;
        align: right;
    }
    .header-date{
        color: whitesmoke !important;
    }
    hr{
        border-color:#656565 !important;
    }
</style>