const searchParams = new URLSearchParams(window.location.search);
const slug = searchParams.get('slug');

// get main blog
(() => {
    fetch(`/api/blogs/${slug}`)
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            else if (res.status === 404) {
                window.location.href = '/pages/404/404.html';
            }
        }).then(data => {
            renderMainBlogToDom(data);
        }).catch(error => console.log(error.message));
})();

// render main blog to DOM
function renderMainBlogToDom(mainBlog) {
    const blogImage = $.getElementById('blog-image');
    const blogTitle = $.getElementById('blog-title');
    const blogDescription = $.getElementById('blog-description');
    blogImage.src = `../${mainBlog.blogImage}`;
    blogTitle.innerHTML = mainBlog.title;
    blogDescription.innerHTML = `<p class='mt-5'>${mainBlog.description}</p>`;
}


// get recommend blogs
(() => {
    fetch('/api/blogs')
        .then(res => res.json())
        .then(blogs => {
            const recommendBlogs = blogs.filter(blog => blog.id !== slug).sort(() => Math.random() - 0.5).slice(0, 2)
            renderRecommendBlogToDom(recommendBlogs)
        })
        .catch(error => console.log(error.message));
})()

// render recommend blog to DOM
function renderRecommendBlogToDom(blogsArray) {
    const recommendBlogsWrapper = $.getElementById('recommend-blogs-wrapper');
    blogsArray.forEach(blog => {
        recommendBlogsWrapper.insertAdjacentHTML('afterbegin', `
        <div class="flex items-center">
            <div class="w-32">
                <a href="/pages/blog-details/blog-details.html?slug=${blog.slug}">
                    <img class="rounded-xl" src="../${blog.blogImage}" alt="" srcset="">
                </a>
            </div>
            <div class="mr-2">
                <a href="/pages/blog-details/blog-details.html?slug=${blog.slug}">
                    <h2 class="font-YekanBakh-ExtraBold text-base">${blog.title}</h2>
                </a>
                <p class="mt-2">${blog.description.slice(0, 30)}</p>
            </div>
        </div>
        
        `)
    });
};

// get all main blog comments
function getAllMainComments() {
    fetch(`/api/comments?blogId=${slug}&_embed=user`)
        .then(res => res.json())
        .then(comments => {
            comments.length && renderCommentsToDom(comments)
        }).catch(error => console.log(error.message));

}; getAllMainComments()

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
                blogId: slug,
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

