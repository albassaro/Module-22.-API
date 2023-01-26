    const wsUri = "wss://ws.ifelse.io";

    const textInput = document.querySelector(".message--text");
    const btnSend = document.querySelector(".btn--send");
    const btnLocation = document.querySelector(".btn--location");
    const outputMessage = document.querySelector(".messages--display");

    let socket = new WebSocket(wsUri);
    // Функция для создания соединения и отправки данных на сервер (condition нужен чтобы не выводить ответное сообщение при гео-локации)
    function wsSocket(message,condition){
        socket.onopen = (evt) => {
            console.log("Соединение установлено!");
        };

        socket.onmessage = (evt) => {
            if(condition === "hide"){
                console.log("Сообщение, отправленное с сервера: " + evt.data);
                console.log("Вывод в сообщения не произведен");
            }else{
                // Получение значения от сервера и его вывод в чат
                displayMessage(evt.data, "server");
                console.log("Сообщение, отправленное с сервера: " + evt.data);
                console.log("Вывод ответа в сообщения произведен");
            }
            
        };

        socket.onclose = function (evt) {
            console.log("соединение закрыто браузером");
        };

        socket.onerror = function (evt) {
            outputMessage.innerHTML = "Ошибка!" + evt.reason;
        };

        console.log("Запрос,отправленный на сервер: " + message);
        socket.send(message);
            
    }

    function displayMessage(inputMsge, source) {
        let newElem = document.createElement("p");
        if (source === "user") {
            newElem.className = "messages--right";
            console.log("Сообщение, введенное пользователем: " + inputMsge);
        } else {
            newElem.className = "messages--left";
        }
        newElem.innerHTML = inputMsge;
        outputMessage.appendChild(newElem);
        
    }
    // Вывод сообщения пользователя и отправка данных на сервер
    btnSend.addEventListener("click", () => {
        let mesOne = textInput.value;
        displayMessage(mesOne, "user");
        wsSocket(mesOne,"visible");
        
    });

    // Получение координат пользователя и вывод в чат сообщения + отправка ссылки на сервер с сокрытием последуюшего сообщения от него
    function success (position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        let fullLink = `https://www.openstreetmap.org/#map=${latitude}/${longitude}`;
        
        let newLink = document.createElement("p");
        newLink.className = "messages--right"
        newLink.innerHTML = `<a href = ${fullLink} class = "geoloc--link" target = "_blank">Гео-локация пользователя</a>`;
        outputMessage.appendChild(newLink);
        // Вызов функции отправки данных на сервер с доп параметром для скрытия ответа
        wsSocket(fullLink,"hide");
    }
    
    function error () {
        console.log("ошибка в гео-локации");
    }

    // Запрос на получение геолокации при клике на кнопку
    btnLocation.addEventListener("click", () => {
        if (!navigator.geolocation) {
            error();
        }else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    })

