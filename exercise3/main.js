
const btn = document.querySelector(".btn");
const sizes = document.querySelector(".screen-size");
const geolocate = document.querySelector(".coordinates");


btn.addEventListener('click', () => {
    sizes.innerHTML = `Ширина экрана пользователя: ${window.screen.width} <br> <br> Высота экрана пользователя: ${window.screen.height}`;
    if (!navigator.geolocation) {
        error();
    }else {
        navigator.geolocation.getCurrentPosition(success, error);
      }

})

function success (position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    geolocate.innerHTML = `Координаты пользователя: <br><br> Широта: ${latitude} ° <br> <br> Долгота: ${longitude} °`;
}

function error () {
    geolocate.textContent = `Невозможно получить ваше местоположение`;
  }