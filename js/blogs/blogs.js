const searchParams = new URLSearchParams(window.location.search);
const page = searchParams.get('page') || "1";
const pageSize = "4"

const nextPageBtn = $.getElementById('next-page-btn');
const prevPageBtn = $.getElementById('prev-page-btn');
const currentPage = $.getElementById('current-page');
const allPages = $.getElementById('all-pages');
let hasNextPage = false;
let hasPrevPage = false;

// get all blogs whit pagination
(() => {
    fetch(`http://localhost:4000/blogs?_embed=user&_page=${page}&_per_page=${pageSize}`)
        .then(res => res.json())
        .then(data => {
            renderBlogsToDom(data.data);
            pagination(data.pages)
            hasNextPage = data.next
            hasPrevPage = data.prev
        }).catch(error => console.log(error.message));
})();

// render blogs to Dom
function renderBlogsToDom(blogsArray) {
    // get blogs wrapper element from DOM
    const blogsWrapper = $.getElementById('blogs-wrapper')
    // console.log('blogsWrapper => ', blogsWrapper);
    blogsArray.forEach(blog => {
        blogsWrapper.insertAdjacentHTML('afterbegin', `
        <div
        class="bg-white overflow-hidden rounded-3xl leading-8 transform hover:-translate-y-1 duration-300 transition-transform">
        <div class="p-6">
            <div class="flex items-center mb-4 border-b border-dashed pb-4">
                <div class="avatar ml-2">
                    <div class="w-14 rounded-full">
                        <img src="../${blog?.user?.profileImage}" />
                    </div>
                </div>
                <div class="flex flex-col mt-1">
                    <h3 class="font-YekanBakh-Bold text-slate-800 text-sm mb-2">${blog?.user?.name} ${blog?.user?.family}</h3>
                    <p class="text-xs">${blog?.user?.task}</p>
                </div>

            </div>
            <div class="leading-8">
                <div class="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none">
                        <path
                            d="M13.98 5.31999L10.77 8.52999L8.79999 10.49C7.96999 11.32 7.96999 12.67 8.79999 13.5L13.98 18.68C14.66 19.36 15.82 18.87 15.82 17.92V12.31V6.07999C15.82 5.11999 14.66 4.63999 13.98 5.31999Z"
                            fill="#b9a158" />
                    </svg>
                    <a href="/pages/blog-details/blog-details.html?slug=${blog.slug}">
                        <h2 class="font-YekanBakh-ExtraBold text-base mr-1">${blog.title}</h2>
                    </a>
                </div>
                <p>
                    ${blog.description?.slice(0, 40)} ...
                </p>
            </div>
        </div>
        <div>
            <a href="/pages/blog-details/blog-details.html?slug=${blog.slug}">
                <img class="rounded-b-lg" src="../${blog.blogImage}" alt="">
            </a>
        </div>
        </div>
    `)
    });
};

// pagination
function pagination(pages) {
    allPages.innerHTML = pages;
    currentPage.innerHTML = page;
};

// go to next page
function nextPage() {
    hasNextPage && (window.location.href = `/pages/blogs/blogs.html?page=${+page + 1}`);
};

// go to prev page 
function prevPage() {
    hasPrevPage && (window.location.href = `/pages/blogs/blogs.html?page=${+page - 1}`);
};

// event handlers
nextPageBtn.addEventListener('click', nextPage);
prevPageBtn.addEventListener('click', prevPage);
