const searchParams = new URLSearchParams(window.location.search);
const page = searchParams.get('page') || "1";
const pageSize = "6"

const nextPageBtn = $.getElementById('next-page-btn');
const prevPageBtn = $.getElementById('prev-page-btn');
const currentPage = $.getElementById('current-page');
const allPages = $.getElementById('all-pages');
let hasNextPage = false;
let hasPrevPage = false;


// get all projects whit pagination
(() => {
    fetch(`http://localhost:4000/projects?_embed=user&_page=${page}&_per_page=${pageSize}`)
        .then(res => res.json())
        .then(projects => {
            renderProjectsToDom(projects.data.reverse())
            pagination(projects.pages)
            hasNextPage = projects.next
            hasPrevPage = projects.prev
        }).catch(error => console.log(error.message));
})();

// render projects to DOM
function renderProjectsToDom(projectsArray) {
    const projectsWrapper = $.getElementById('projects-wrapper');
    projectsArray.forEach(project => {
        projectsWrapper.insertAdjacentHTML('afterbegin', `
        <a href="/pages/project-details/project-details.html?slug=${project.slug}"
        class="group relative flex justify-center h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-72">
            <img src="../${project.img}" loading="lazy" alt="Photo by Minh Pham"
            class="absolute inset-0 h-full w-full object-cover object-center transition duration-300 group-hover:scale-110">
    
            <div
                class="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
            </div>
    
            <span class="relative mb-4 flex justify-center text-base text-white text-center">
                پروژه شماره
               ${project.id}
            </span>
        </a>
        `);
    });
};



// pagination
function pagination(pages) {
    allPages.innerHTML = pages;
    currentPage.innerHTML = page;
};

// go to next page
function nextPage() {
    hasNextPage && (window.location.href = `/pages/projects/projects.html?page=${+page + 1}`);
};

// go to prev page 
function prevPage() {
    hasPrevPage && (window.location.href = `/pages/projects/projects.html?page=${+page - 1}`);
};

// event handlers
nextPageBtn.addEventListener('click', nextPage);
prevPageBtn.addEventListener('click', prevPage);
