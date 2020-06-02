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
        <div id="myModal" class="modal" v-if="dialog" >
            <div class="modal-content" >
                <div class="header">
                    OTHER DETAILS 
                </div><hr>
                <br>
                <div class="modal-body">
                    <p style="color: white;"><b>{{this.day}}, {{this.date}}</b></p>
                    <ul>
                        <li>Sunrise: {{this.sunrise}}</li>
                        <li>Sunset: {{this.sunset}}</li>
                        <hr>
                    </ul>
                    <table style="overflow: auto;">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Heat Index</th>
                                <th>Temperature</th>
                                <th>Max Temperature</th>
                                <th>Min Temperature</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-bind:key="index" v-for="(i, index) in more_details">
                                <td v-if="index > 0">{{more_details[index].details.dt_txt}}</td>
                                <td v-if="index > 0">{{more_details[index].details.main.feels_like}}</td>
                                <td v-if="index > 0">{{more_details[index].details.main.temp}}° C</td>
                                <td v-if="index > 0">{{more_details[index].details.main.temp_max}}° C</td>
                                <td v-if="index > 0">{{more_details[index].details.main.temp_min}}° C</td>
                            </tr>
                        </tbody>
                    </table>
                </div><hr>
                <div>
                    <button class="btn" @click="dialog = false">Close</button>
                </div>
            </div>
        </div>
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
        moreDetails(date, day){
            this.$emit('more-details', date)
            this.day = day
            this.date = date
            this.dialog = true
            console.log(this.more_details)
            this.sunrise= this.convertDateTime(this.more_details[1].city.sunrise),
            this.sunset= this.convertDateTime(this.more_details[1].city.sunset)
        } //toggle more details
    }   
}
</script>

<style>
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
        color: whitesmoke;
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
        color: whitesmoke;
    }
</style>