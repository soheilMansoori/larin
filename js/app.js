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