
const btn = document.querySelector(".btn");
const iconOne = document.querySelector(".btn__icon-one");
const iconTw0 = document.querySelector(".btn__icon-two");

btn.addEventListener('click', () => {
    if (getComputedStyle(iconOne).display != 'none'){
        iconOne.className = "btn__icon-one btn__icon--hide";
        iconTw0.className = "btn__icon-two";
    }else {
        iconOne.className = "btn__icon-one";
        iconTw0.className = "btn__icon-two btn__icon--hide";
    }
})