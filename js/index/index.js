const $ = document;

// header section start

// img slider in header 
let swiper = new Swiper(".mySwiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

// header section end


// services section start 

// get all services from server
(() => {
    fetch('http://localhost:4000/services')
        .then(res => res.json())
        .then(data => {
            // console.log('services => ', data)
            renderServicesToDom(data.reverse())
        })
        .catch(error => console.log(error.message))
})();

// renderServicesToDom
function renderServicesToDom(servicesArray) {
    // get services wrapper element from DOM
    const servicesWrapper = $.getElementById('services-wrapper')
    // console.log('servicesWrapper => ', servicesWrapper);

    servicesArray.forEach(item => {
        servicesWrapper.insertAdjacentHTML('afterbegin', `
    <div
        class="bg-white p-6 rounded-3xl leading-8 transform hover:-translate-y-1 duration-300 transition-transform cursor-pointer">
        <div class="w-16 mb-4">
            <img src="${item.img}" alt="">
        </div>

        <div class="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M13.98 5.31999L10.77 8.52999L8.79999 10.49C7.96999 11.32 7.96999 12.67 8.79999 13.5L13.98 18.68C14.66 19.36 15.82 18.87 15.82 17.92V12.31V6.07999C15.82 5.11999 14.66 4.63999 13.98 5.31999Z"
                    fill="#b9a158" />
            </svg>
            <a href="#">
                <h2 class="font-YekanBakh-ExtraBold text-base mr-1">${item.title}</h2>
            </a>
        </div>
        <div>
            <p>
                ${item.description}
            </p>
        </div>
    </div>
        `)
    });
}

// services section end