const searchParams = new URLSearchParams(window.location.search);
const page = searchParams.get('page') || "1";
const pageSize = "4";

const nextPageBtn = $.getElementById('next-page-btn');
const prevPageBtn = $.getElementById('prev-page-btn');
const currentPage = $.getElementById('current-page');
const allPages = $.getElementById('all-pages');
let hasNextPage = false;
let hasPrevPage = false;


// get all managers whit pagination
(() => {
    fetch(`/api/managers?_embed=user&_page=${page}&_per_page=${pageSize}`)
        .then(res => res.json())
        .then(managers => {
            renderManagersToDom(managers.data)
            pagination(managers.pages)
            hasNextPage = managers.next
            hasPrevPage = managers.prev
        })
        .catch(error => console.log(error.message));
})();
// render managers to DOM
function renderManagersToDom(managersArray) {
    const managersWrapper = $.getElementById('managers-wrapper');
    managersArray.forEach(manager => {
        managersWrapper.insertAdjacentHTML('afterbegin', `
        <div
        class="text-center bg-white rounded-3xl overflow-hidden transform hover:-translate-y-1 duration-300 transition-transform cursor-pointer">
        <img class="w-full object-cover max-h-72 rounded-t-3xl" src="../${manager.user.profileImage}">
        <div class="p-6">
            <div class="flex flex-col items-center leading-8">
                <h3 class="font-YekanBakh-Bold text-slate-800 text-sm">${manager.user.name} ${manager.user.family}</h3>
                <p class="text-gray-500">${manager.user.task}</p>
            </div>
            <div class="flex gap-2 items-center justify-center mt-2">
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32"
                        fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16ZM16.5734 11.8119C15.0171 12.4592 11.9068 13.7989 7.24252 15.8311C6.48511 16.1323 6.08834 16.427 6.05222 16.7151C5.99118 17.202 6.60095 17.3937 7.43129 17.6548C7.54424 17.6903 7.66127 17.7271 7.78125 17.7661C8.59818 18.0317 9.6971 18.3424 10.2684 18.3547C10.7866 18.3659 11.365 18.1523 12.0035 17.7138C16.3615 14.772 18.6112 13.2851 18.7524 13.253C18.8521 13.2304 18.9901 13.202 19.0837 13.2851C19.1772 13.3683 19.168 13.5258 19.1581 13.568C19.0977 13.8255 16.7042 16.0508 15.4655 17.2024C15.0793 17.5614 14.8054 17.816 14.7494 17.8742C14.624 18.0045 14.4962 18.1277 14.3733 18.2461C13.6144 18.9778 13.0452 19.5264 14.4048 20.4224C15.0582 20.8529 15.581 21.209 16.1026 21.5642C16.6722 21.9521 17.2404 22.339 17.9755 22.8209C18.1628 22.9437 18.3416 23.0712 18.5159 23.1954C19.1788 23.668 19.7743 24.0926 20.5101 24.0248C20.9377 23.9855 21.3793 23.5835 21.6036 22.3845C22.1336 19.5509 23.1755 13.4113 23.4163 10.8813C23.4374 10.6596 23.4108 10.376 23.3895 10.2514C23.3682 10.1269 23.3237 9.94948 23.1618 9.81813C22.9701 9.66258 22.6742 9.62978 22.5418 9.63211C21.94 9.64271 21.0167 9.96376 16.5734 11.8119Z"
                            fill="#282828"></path>
                    </svg>
                </a>
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 38 38"
                        fill="none">
                        <path
                            d="M25.6342 3.16675H12.3658C6.60249 3.16675 3.16666 6.60258 3.16666 12.3659V25.6184C3.16666 31.3976 6.60249 34.8334 12.3658 34.8334H25.6183C31.3817 34.8334 34.8175 31.3976 34.8175 25.6342V12.3659C34.8333 6.60258 31.3975 3.16675 25.6342 3.16675ZM19 25.1434C15.6117 25.1434 12.8567 22.3884 12.8567 19.0001C12.8567 15.6117 15.6117 12.8567 19 12.8567C22.3883 12.8567 25.1433 15.6117 25.1433 19.0001C25.1433 22.3884 22.3883 25.1434 19 25.1434ZM28.3733 10.8934C28.2942 11.0834 28.1833 11.2576 28.0408 11.4159C27.8825 11.5584 27.7083 11.6692 27.5183 11.7484C27.3283 11.8276 27.1225 11.8751 26.9167 11.8751C26.4892 11.8751 26.0933 11.7167 25.7925 11.4159C25.65 11.2576 25.5392 11.0834 25.46 10.8934C25.3808 10.7034 25.3333 10.4976 25.3333 10.2917C25.3333 10.0859 25.3808 9.88008 25.46 9.69008C25.5392 9.48425 25.65 9.32591 25.7925 9.16758C26.1567 8.80341 26.7108 8.62925 27.2175 8.74008C27.3283 8.75591 27.4233 8.78758 27.5183 8.83508C27.6133 8.86675 27.7083 8.91425 27.8033 8.97758C27.8825 9.02508 27.9617 9.10425 28.0408 9.16758C28.1833 9.32591 28.2942 9.48425 28.3733 9.69008C28.4525 9.88008 28.5 10.0859 28.5 10.2917C28.5 10.4976 28.4525 10.7034 28.3733 10.8934Z"
                            fill="#282828"></path>
                    </svg>
                </a>
            </div>
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
    hasNextPage && (window.location.href = `/pages/managers/managers.html?page=${+page + 1}`);
};

// go to prev page 
function prevPage() {
    hasPrevPage && (window.location.href = `/pages/managers/managers.html?page=${+page - 1}`);
};

// event handlers
nextPageBtn.addEventListener('click', nextPage);
prevPageBtn.addEventListener('click', prevPage);