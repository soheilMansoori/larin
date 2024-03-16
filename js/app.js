const $ = document

///////////////////// got to top btn  start ///////////////////////////
const goTopButton = $.getElementById('go-top-button')
// console.log('goTopButton ', goTopButton);

window.addEventListener("scroll", () => {
    // console.log('scroll position', window.scrollY);
    if (window.scrollY > 500) {
        return goTopButton.classList.remove("hidden");
    }
    goTopButton.classList.add("hidden");

}, false);
///////////////////// got to top btn  end ///////////////////////////

// check the is user browser supports service worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register('../../serviceWorker.js')
        .then(register => console.log('serviceWorker register successfully => ', register))
        .catch(error => console.log('not supported serviceWorker', error));
}


/////////////////// show user name in navbar ////////////////// 
const { username , token } = JSON.parse(localStorage.getItem('user')) || {};
const userNameButtons = $.querySelectorAll('.user-name-btn');

userNameButtons.forEach(element => {
    if (token) {
        element.innerHTML = username;
        element.href = '#'
    } else {
        element.innerHTML = 'ورود | ثبت نام';
    }
});