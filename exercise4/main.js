
const btn = document.querySelector(".btn");
const currentTime = document.querySelector(".current-time");

function success (position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetch ('https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat='+latitude+'&long='+longitude)
    .then((response) => {
        const result = response.json();
        return result;
    })
    .then((result) => {
        // console.log(result);
        currentTime.innerHTML = `временная зона, в которой находится пользователь: ${result.timezone} 
        <br>
        <br>
        местные дата и время: ${result.date_time_txt}`;
    })
    .catch(() => {
        alert("Возникла ошибка")
    })
}

function error () {
    currentTime.textContent = `Невозможно вывести время`;
}

btn.addEventListener('click', () => {
    
    if (!navigator.geolocation) {
        error();
    }else {
        navigator.geolocation.getCurrentPosition(success, error);
    }

})

