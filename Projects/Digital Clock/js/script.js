//.............. JavaScript Code for Dogital Clock ....................//

function displayTime() {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let time = new Date();
    let year = time.getFullYear();
    let date = time.getDate();
    let timezone = time.getTimezoneOffset();
    let day = days[time.getDay()];
    let hour = time.getHours();
    let minutes = time.getMinutes();
    let second = time.getSeconds();
    am_pm = 'AM';

    if (hour >= 12) {
        hour = hour - 12;
        am_pm = 'PM'
    }
    if (hour == 0) {
        hour = 12;
        am_pm = 'AM';
    }

    hour = hour < 10 ? "0" + hour : hour;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    second = second < 10 ? "0" + second : second;

    timezone = (timezone / 60) * (-1);

    let month = time.getMonth();
    month = months[month];

    document.getElementById('display_clock').innerHTML = `<h1>${hour} : ${minutes} : ${second} ${am_pm}</h1>`;
    document.getElementById('display_days_date').innerHTML = `<h6>GMT+${timezone} ${day} Date: ${date} ${month} ${year}</h6>`;
}

displayTime();
setInterval(displayTime, 1000);