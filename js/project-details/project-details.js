const searchParams = new URLSearchParams(window.location.search);
const slug = searchParams.get('slug');
//////////////////////////// slider configs start ////////////////////////////// 
let oderImagesSlider = new Swiper(".gall-project", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
});

let slider = new Swiper(".project-main", {
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: oderImagesSlider,
    },
});



//////////////////////////// slider configs end ////////////////////////////// 
const showDescriptionTabBtn = $.getElementById('show-description-tab-btn');
const showDetailsTabBtn = $.getElementById('show-details-tab-btn');

const projectDescriptionTabContent = $.getElementById("project-description")
const projectDetailsTabContent = $.getElementById("project-details");


// get main project
(() => {
    fetch(`/api/projects/${slug}`)
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            else if (res.status === 404) {
                window.location.href = '/pages/404/404.html';
            }
        }).then(project => {
            renderMainProjectToDom(project.title, project.oderImages, project.description, project.moreInfos);
        }).catch(error => console.log(error.message));
})();

// render main project to DOM
function renderMainProjectToDom(projectTitle, projectImagesArray, projectDescription, projectDetails) {
    const projectTitleElement = $.getElementById('project-title');
    const sliderWrapper = $.getElementById("slider-wrapper");
    const oderImagesWrapper = $.getElementById("oderImages-wrapper");
    projectTitleElement.innerHTML = projectTitle

    // render images to dom 
    // main image
    projectImagesArray.forEach(image => {
        sliderWrapper.insertAdjacentHTML("beforeend", `
        <div class="swiper-slide swiper-slide-active" role="group"
        style="width: 896px; margin-left: 10px;">
            <img class="rounded-xl cursor-pointer" src="../../imgs/index/projects/${image}">
        </div>
        `);
    });

    // order images
    projectImagesArray.forEach(image => {
        oderImagesWrapper.insertAdjacentHTML("beforeend", `
        <div class="swiper-slide swiper-slide-visible swiper-slide-active swiper-slide-thumb-active"
        role="group" style="width: 216.5px; margin-left: 10px;">
            <img class="rounded-xl cursor-pointer" src="../../imgs/index/projects/${image}">
        </div>
        `);
    });


    projectDescriptionTabContent.insertAdjacentHTML("beforeend", `<p>${projectDescription}</p>`);

    const projectDetailsWrapper = $.getElementById("project-details-wrapper");
    projectDetailsWrapper.insertAdjacentHTML("beforeend", `
    <div class="bg-orange-200 col-span-1 rounded-lg flex items-center">
<div class="bg-stone-900 text-white rounded-lg p-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z">
        </path>
    </svg>
</div>
<div class="mr-2">پروژه: ${projectDetails.projectName}</div>
</div>

<div class="bg-orange-200 col-span-1 rounded-lg flex items-center">
<div class="bg-stone-900 text-white rounded-lg p-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
            d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z">
        </path>
    </svg>

</div>
<div class="mr-2">محل پروژه: ${projectDetails.projectSite}</div>
</div>

<div class="bg-orange-200 col-span-1 rounded-lg flex items-center">
<div class="bg-stone-900 text-white rounded-lg p-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z">
        </path>
    </svg>

</div>
<div class="mr-2">ناظر پروژه: ${projectDetails.projectSupervisor}</div>
</div>

<div class="bg-orange-200 col-span-1 rounded-lg flex items-center">
<div class="bg-stone-900 text-white rounded-lg p-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z">
        </path>
    </svg>

</div>
<div class="mr-2">ارزش مالی: ${projectDetails.financialValue}</div>
</div>

<div class="bg-orange-200 col-span-1 rounded-lg flex items-center">
<div class="bg-stone-900 text-white rounded-lg p-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5">
        </path>
    </svg>

</div>
<div class="mr-2">تاریخ : ${projectDetails.date}</div>
</div>

<div class="bg-orange-200 col-span-1 rounded-lg flex items-center">
<div class="bg-stone-900 text-white rounded-lg p-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
            d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25">
        </path>
    </svg>

</div>
<div class="mr-2">مساحت: ${projectDetails.area}</div>
</div>

    `);
};



function showMainTab(event) {
    const mainTab = event.target.dataset.tab
    if (mainTab === "description") {
        projectDescriptionTabContent.classList.remove("hidden");
        projectDescriptionTabContent.style.display = "block";
        showDescriptionTabBtn.classList.add("active");

        // 
        projectDetailsTabContent.classList.add("hidden");
        projectDetailsTabContent.style.display = "none";
        showDetailsTabBtn.classList.remove("active");

    } else {
        projectDetailsTabContent.classList.remove("hidden");
        projectDetailsTabContent.style.display = "block";
        showDetailsTabBtn.classList.add("active");

        // 
        projectDescriptionTabContent.classList.add("hidden");
        projectDescriptionTabContent.style.display = "none";
        showDescriptionTabBtn.classList.remove("active");
    }
}

showDescriptionTabBtn.addEventListener('click', showMainTab);
showDetailsTabBtn.addEventListener('click', showMainTab);

// get recommend projects
(() => {
    fetch('/api/projects')
        .then(res => res.json())
        .then(projects => {
            const recommendProjects = projects.filter(project => project.id !== slug).sort(() => Math.random() - 0.5).slice(0, 3)
            renderRecommendProjectsToDom(recommendProjects)
        })
        .catch(error => console.log(error.message));
})()

// render recommend projects to DOM
function renderRecommendProjectsToDom(projectsArray) {
    const recommendProjectsWrapper = $.getElementById('recommend-projects-wrapper');
    projectsArray.forEach(project => {
        recommendProjectsWrapper.insertAdjacentHTML('afterbegin', `
        <div class="group/item">
        <a class="relative w-full" href="/pages/project-details/project-details.html?slug=${project.slug}">
            <div class="overflow-hidden bg-cover bg-no-repeat rounded-2xl">
                <img class="transition duration-300 ease-in-out hover:scale-110 overflow-hidden"
                    src="../${project.img}" alt="">
            </div>
            <div
                class="absolute bottom-0 w-full text-center text-white bg-gradient-to-t from-stone-800 pt-10 rounded-b-2xl">
                <h2 class="">پروژه شماره ${project.id}</h2>
                <p
                    class="opacity-0 group-hover/item:opacity-100 transition-all duration-300 group-hover/item:my-3 text-xs">
                    جهت مشاهده کلیک کنید...
                </p>
            </div>
        </a>
    </div>

        `)
    });
};

// get all main project comments
function getAllMainComments() {
    fetch(`/api/comments?projectId=${slug}`)
        .then(res => res.json())
        .then(async (comments) => {
            const res = await fetch("/api/users");
            const users = await res.json();
            const embedComments = comments.reverse().map(comment => {
                const user = users.find(user => user.id == comment.userId);
                return { ...comment, user }
            });

            embedComments.length && renderCommentsToDom(embedComments)
        }).catch(error => console.log(error.message));

}; getAllMainComments();


// render comments to DOM
function renderCommentsToDom(commentsArray) {
    const commentsWrapper = $.getElementById('comments-wrapper');
    commentsWrapper.innerHTML = '' // clear commentsWrapper
    commentsArray.forEach(comment => {
        commentsWrapper.insertAdjacentHTML('beforeend', `
        <div
        class="w-full h-auto rounded-3xl flex-row py-4 my-5 mx-auto bg-white border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:shadow-sm">
        <div class="flex flex-col items-center justify-center  md:justify-start md:flex-row md-10">
            <img class="w-20 w h-20 border-2 border-gray-300 rounded-full" alt="" src="../${comment.user.profileImage}">
            <div class="flex-col items-center mt-1">
                <div
                    class="flex flex-col my-5 md:my-0 md:flex-row items-center flex-1 px-4 font-bold leading-tight">
                    ${comment.user.username}
                    <span class="mr-2 text-xs font-normal text-gray-500">${comment.date}</span>
                </div>
                <div
                    class="flex-1 text-center md:text-start px-1 md:px-3 ml-2 text-sm font-medium leading-loose text-gray-600">
                    ${comment.description}
                </div>
            </div>
        </div>
    </div>

        `)
    })
}



/////////////////////////////////// send comment start //////////////////////////////////
const localStorageData = JSON.parse(localStorage.getItem('user'));
const isUserLogin = localStorage.getItem('user') ? true : false;
const showUserName = $.getElementById('user-name');
const commentTextarea = $.getElementById('comment-textarea');
const sendCommentBtn = $.getElementById('send-comment-btn');

sendCommentBtn.innerHTML = isUserLogin ? "ارسال پیام" : "ورود";
showUserName.innerHTML = isUserLogin ? `شما با نام کاربری ${localStorageData.username} وارد شدید` : "برای ثبت کامنت ابتدا وارد حساب کاربری خود شوید";

function clearCommentTextarea() {
    commentTextarea.value = '';
}

sendCommentBtn.addEventListener('click', () => {
    if (isUserLogin) {
        if (commentTextarea.value) {
            let options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            let today = new Date().toLocaleDateString('fa-IR', options);
            const commentData = {
                date: today,
                description: commentTextarea.value,
                projectId: slug,
                userId: localStorageData.id,
                role: localStorageData.role,
                isShow: true,
            }
            fetch('/api/comments/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(commentData)
            }).then(res => {
                if (res.ok) {
                    clearCommentTextarea()
                    showSuccessModal()
                    getAllMainComments()
                } else {
                    showErrorModal()
                }
            }).catch(error => console.log(error.message));
        }
    } else {
        window.location.href = '/pages/login/login.html';
    }
})
/////////////////////////////////// send comment end //////////////////////////////////

//////////////////////////////// modals start ////////////////////////////////////////////////////////////////// 

///////////////////////// success modal start /////////////////////////////////
const successModal = $.getElementById('success-modal');
const closeSuccessModalBtn = $.getElementById('close-success-modal-btn');

function showSuccessModal() {
    successModal.classList.remove('hidden');
    successModal.classList.add('flex');
};

function closeSuccessModal() {
    successModal.classList.remove('flex');
    successModal.classList.add('hidden');
};

// event handlers
closeSuccessModalBtn.addEventListener('click', closeSuccessModal);
///////////////////////// success modal end /////////////////////////////////

///////////////////////// error modal start /////////////////////////////////
const errorModal = $.getElementById('error-modal');
const closeErrorModalBtn = $.getElementById('close-error-modal-btn');

function showErrorModal() {
    errorModal.classList.remove('hidden');
    errorModal.classList.add('flex');
};

function closeErrorModal() {
    errorModal.classList.remove('flex');
    errorModal.classList.add('hidden');
};

// event handlers
closeErrorModalBtn.addEventListener('click', closeErrorModal);
///////////////////////// error modal end /////////////////////////////////


//////////////////////////////// modals end ////////////////////////////////////////////////////////////////// 
