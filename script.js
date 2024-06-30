const app = Vue.createApp({
    data(){
        return{
            api_key: 'ad7b75e05e8dd0be0f115e9dc85422bc',
            url_base: 'https://api.openweathermap.org/data/2.5/',
            query: '',
            weather: {}
        }
    },
    methods: {
        fetchWeather(e) {
            if (e.key == "Enter"){
                fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
                .then(res => {
                    return res.json();
                }) .then(this.setResults);
            }
        },
        setResults(results) {
            this.weather = results;
        },
        dateBuilder() {
            let d = new Date();
            let months = ["January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"];
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            let day = days[d.getDay()];
            let date = d.getDate();
            let month = months[d.getMonth()];
            let year = d.getFullYear();

            return `${day} ${date} ${month} ${year}`;
        },
        windDirection(deg) {
            let directions = ["North", "North/Northeast", "Northeast", "East/Northeast", "East", "East/Southeast", "Southeast", "South/Southeast", "South", "South/Southwest", "Southwest", "West/Southwest", "West", "West/Northwest", "Northwest", "North/Northwest"];
            let index = (Math.round(deg / 22,5, 1));
            let result = directions[index - 1];
            return result;
        },
        arrowDirection(deg) {
            let direction="transform: rotate(" + deg + "deg)";
            return direction;
        }
    }
})
app.mount('#app');

//https://api.openweathermap.org/data/2.5/weather?q=zwolle&units=metric&APPID=ad7b75e05e8dd0be0f115e9dc85422bc