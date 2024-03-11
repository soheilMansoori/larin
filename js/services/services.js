const searchParams = new URLSearchParams(window.location.search);
const page = searchParams.get('page') || "1";
const pageSize = "6"


const nextPageBtn = $.getElementById('next-page-btn');
const prevPageBtn = $.getElementById('prev-page-btn');
const currentPage = $.getElementById('current-page');
const allPages = $.getElementById('all-pages');
let hasNextPage = false;
let hasPrevPage = false;


// get all services whit pagination
(() => {
    fetch(`http://localhost:4000/services?_page=${page}&_per_page=${pageSize}`)
        .then(res => res.json())
        .then(services => {
            renderServicesToDom(services.data)
            pagination(services.pages)
            hasNextPage = services.next
            hasPrevPage = services.prev

        })
        .catch(error => console.log(error.message));
})();

// render services to DOM
function renderServicesToDom(servicesArray) {
    const servicesWrapper = $.getElementById('services-wrapper');
    servicesArray.forEach(service => {
        servicesWrapper.insertAdjacentHTML('afterbegin', `
        <div
        class="bg-white p-6 rounded-3xl leading-8 transform hover:-translate-y-1 duration-300 transition-transform cursor-pointer">
        <div class="w-16 mb-4">
            <img src="../${service.img}" alt="">
        </div>

        <div class="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M13.98 5.31999L10.77 8.52999L8.79999 10.49C7.96999 11.32 7.96999 12.67 8.79999 13.5L13.98 18.68C14.66 19.36 15.82 18.87 15.82 17.92V12.31V6.07999C15.82 5.11999 14.66 4.63999 13.98 5.31999Z"
                    fill="#b9a158" />
            </svg>
            <a href="#">
                <h2 class="font-YekanBakh-ExtraBold text-base mr-1">${service.title}</h2>
            </a>
        </div>
        <div>
            <p>
                ${service.description}
            </p>
        </div>
    </div>
        `);
    });
}


// pagination
function pagination(pages) {
    allPages.innerHTML = pages;
    currentPage.innerHTML = page;
};

// go to next page
function nextPage() {
    hasNextPage && (window.location.href = `/pages/services/services.html?page=${+page + 1}`);
};

// go to prev page 
function prevPage() {
    hasPrevPage && (window.location.href = `/pages/services/services.html?page=${+page - 1}`);
};

// event handlers
nextPageBtn.addEventListener('click', nextPage);
prevPageBtn.addEventListener('click', prevPage);