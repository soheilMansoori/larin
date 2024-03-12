const $ = document;

/////////////////////////////// header section start //////////////////////////////////

// img slider in header 
let headerSlider = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

//////////////////////////////// header section end //////////////////////////////////////////////////////////////////


////////////////////////////// services section start ///////////////////////////

// get all services from server
(() => {
    fetch('http://localhost:4000/services?_limit=4')
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

    servicesArray.forEach(service => {
        servicesWrapper.insertAdjacentHTML('afterbegin', `
    <div
        class="bg-white p-6 rounded-3xl leading-8 transform hover:-translate-y-1 duration-300 transition-transform cursor-pointer">
        <div class="w-16 mb-4">
            <img src="${service.img}" alt="">
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
        `)
    });
};

//////////////////////// services section end //////////////////////////


///////////////////////// projects section start //////////////////////////////

// get all projects form server
(() => {
    fetch('http://localhost:4000/projects?_limit=4')
        .then(res => res.json())
        .then(data => {
            // console.log('projects => ', data);
            renderProjectsToDom(data.slice(0, 4).reverse())
        }).catch(error => console.log(error.message));
})();

function renderProjectsToDom(projectsArray) {
    // get projects wrapper element from DOM
    const projectsWrapper = $.getElementById('projects-wrapper')
    // console.log('projectsWrapper => ', projectsWrapper);
    projectsArray.forEach((project) => {
        projectsWrapper.insertAdjacentHTML('afterbegin', `
        <a  href="/pages/project-details/project-details.html?slug=${project.slug}"
            class="group my-3 md:my-0 relative flex justify-center h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg  md:h-72  col-span-1 md:col-span-2 ${project.id % 2 === 0 ? "lg:col-span-2" : "lg:col-span-1"}">   
            <img src="${project.img}" loading="lazy" alt="Photo by Martin Sanchez"
            class="absolute inset-0 h-full w-full object-cover object-center transition duration-300 group-hover:scale-110" />
            <div
            class="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
            </div>
            <span class="relative mb-4 flex justify-center text-base text-white text-center">
            پروژه شماره
            ${project.id}
            </span>
        </a>
        `)
    });
}

////////////////////// projects section end ////////////////////////////

///////////////////////// customer comments section start //////////////////////////

// slider 
let customerCommentsSlider = new Swiper(".customer", {
    effect: "cube",
    click: true,
    grabCursor: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});
// get all comments from server
(() => {
    fetch('http://localhost:4000/comments?_limit=4&_embed=user')
        .then(res => res.json())
        .then(data => {
            // console.log('comments => ', data);
            renderCommentsToDom(data);
        }).catch(error => console.log(error.message));
})();

function renderCommentsToDom(commentsArray) {
    // get comments wrapper element from DOM
    const commentsWrapper = $.getElementById('comments-wrapper')
    // console.log('commentsWrapper => ', commentsWrapper);
    commentsArray.forEach(comment => {
        commentsWrapper.insertAdjacentHTML('afterbegin', `
        <div class="swiper-slide">
            <div class="bg-white p-6 leading-8 rounded-3xl mt-5 md:mt-0">
                <div class="flex items-center mb-4">
                    <div class="avatar ml-4">
                        <div class="w-20 rounded-full">
                            <img src="${comment?.user?.profileImage}" />
                        </div>
                    </div>
                <div class="flex flex-col items-center">
                    <h3 class="font-YekanBakh-Bold text-slate-800 text-sm">${comment?.user?.name} ${comment?.user?.family}</h3>
                    <p>${comment?.user?.task}</p>
                </div>
            </div>
            <p>
                ${comment.description}
            </p>
            </div>
        </div>
        `)
    });

};
///////////////////////// customer comments section end //////////////////////////

//////////////////////// blogs section start /////////////////////////////////

// get all blogs from the server
(() => {
    fetch('http://localhost:4000/blogs?_limit=4&_embed=user')
        .then(res => res.json())
        .then(data => {
            // console.log('blogs => ', data);
            renderBlogsToDom(data)
        }).catch(error => console.log(error.message));
})();

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
                        <img src="${blog?.user?.profileImage}" />
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
                <img class="rounded-b-lg" src="${blog.blogImage}" alt="">
            </a>
        </div>
        </div>
    `)
    });
}

//////////////////////// blogs section end /////////////////////////////////

/////////////////////// partners section start ////////////////////////////
let partnersSlide = new Swiper(".partners", {
    loop: true,
    slidesPerView: 4,
    spaceBetween: 30,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});
(() => {
    fetch('http://localhost:4000/partners')
        .then(res => res.json())
        .then(data => {
            // console.log('partners => ', data)
            renderPartnersToDom(data)
        }).catch(error => console.log(error.message));
})();


function renderPartnersToDom(partnersArray) {
    // get partners wrapper element from DOM
    const partnersWrapper = $.getElementById('partners-wrapper')
    // console.log('partnersWrapper => ', partnersWrapper);
    partnersArray.forEach(partner => {
        partnersWrapper.insertAdjacentHTML('afterbegin', `
        <div class="swiper-slide">
            <div class="flex justify-center">
                <img class="grayscale hover:grayscale-0 duration-300" src="${partner.logo}" >
            </div>
        </div>
        `)
    });
}



/////////////////////// partners section end /////////////////////////////
