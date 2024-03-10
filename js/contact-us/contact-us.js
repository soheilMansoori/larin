// get element from DOM
const form = $.getElementById('form');
const titleInput = $.getElementById('title-input');
const emailInput = $.getElementById('email-input');
const descriptionInput = $.getElementById('description-input');

// errors felids 
const titleInputErrorFelid = $.getElementById('title-input-error-felid');
const emailInputErrorFelid = $.getElementById('email-input-error-felid');
const descriptionInputErrorFelid = $.getElementById('description-input-error-felid');

// clear error messages and input values
function clearAllInputsValues() {
    // clear inputs
    titleInput.value = '';
    emailInput.value = '';
    descriptionInput.value = '';
    // clear error messages
    titleInputErrorFelid.innerHTML = '';
    emailInputErrorFelid.innerHTML = '';
    descriptionInputErrorFelid.innerHTML = '';
}

titleInput.addEventListener('change', (event) => {
    const titlePattern = /[\u0600-\u06FF\s|\w]/i
    // title validation
    if (!event.target.value) {
        titleInputErrorFelid.innerHTML = 'وارد کردن موضوع الزامی میباشد'
    } else if (!titlePattern.test(event.target.value)) {
        titleInputErrorFelid.innerHTML = 'متن موضوع درست نمیباشد'
    } else {
        titleInputErrorFelid.innerHTML = ''
    }
});

emailInput.addEventListener('change', (event) => {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
    // email validation
    if (!event.target.value) {
        emailInputErrorFelid.innerHTML = 'وارد کردن ایمیل الزامی میباشد'
    } else if (!emailPattern.test(event.target.value)) {
        emailInputErrorFelid.innerHTML = 'ایمیل وارد شده درست نمیباشد'
    } else {
        emailInputErrorFelid.innerHTML = ''
    }
});

descriptionInput.addEventListener('change', (event) => {
    const descriptionPattern = /[\u0600-\u06FF\s|\w]{100,200}/i
    // description validation 
    if (!event.target.value) {
        descriptionInputErrorFelid.innerHTML = 'وارد کردن توضیحات الزامی میباشد'
    } else if (!descriptionPattern.test(event.target.value)) {
        descriptionInputErrorFelid.innerHTML = ''
    } else {
        descriptionInputErrorFelid.innerHTML = ''
    }
});

// check all of input fields
function isFormValid({ title, email, description }) {
    // Regex patterns
    const titlePattern = /[\u0600-\u06FF\s|\w]{5,50}/i
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
    const descriptionPattern = /[\u0600-\u06FF\s|\w]{5,200}/i

    // validation flags
    let isTitleValid = false;
    let isEmailValid = false;
    let isDescriptionValid = false;

    // title validation
    if (!title) {
        titleInputErrorFelid.innerHTML = 'وارد کردن موضوع الزامی میباشد'
    } else if (!titlePattern.test(title)) {
        titleInputErrorFelid.innerHTML = 'متن موضوع درست نمیباشد'
    } else {
        titleInputErrorFelid.innerHTML = ''
        isTitleValid = true;
    }

    // email validation
    if (!email) {
        emailInputErrorFelid.innerHTML = 'وارد کردن ایمیل الزامی میباشد'
    } else if (!emailPattern.test(email)) {
        emailInputErrorFelid.innerHTML = 'ایمیل وارد شده درست نمیباشد'
    } else {
        emailInputErrorFelid.innerHTML = ''
        isEmailValid = true;
    }

    // description validation 
    if (!description) {
        descriptionInputErrorFelid.innerHTML = 'وارد کردن توضیحات الزامی میباشد'
    } else if (!descriptionPattern.test(description)) {
        descriptionInputErrorFelid.innerHTML = 'متن وارد شده معتبر نمیباشد'
    } else {
        descriptionInputErrorFelid.innerHTML = ''
        isDescriptionValid = true;
    }

    let isAllFormValid = isTitleValid && isEmailValid && isDescriptionValid
    return isAllFormValid
};

// end of validation and send the form to the server
function sendFormToServer(form) {
    event.preventDefault()
    let options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    let today = new Date().toLocaleDateString('fa-IR', options);
    const contactForm = {
        ...form,
        date: today
    }
    // send form
    fetch('http://localhost:4000/contacts', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(contactForm)
    })
        .then(res => {
            if (res.ok) {
                clearAllInputsValues()
                showSuccessModal()
                return res.json();
            } else {
                showErrorModal()
            }
        }).catch(error => console.log(error.message))
};

// submit the form to the server
form.addEventListener('submit', (event) => {
    const formData = {
        title: titleInput.value,
        email: emailInput.value,
        description: descriptionInput.value
    };

    event.preventDefault();
    if (isFormValid(formData)) {
        sendFormToServer(formData);
    }
});


///////////////////////////// modals start ////////////////////////////// 

// success modal message
const successModal = $.getElementById('success-modal');
const closeSuccessModalBtn = $.getElementById('close-success-modal-btn');
const redirectToHomePageBtn = $.getElementById('redirect-modal-btn');


function showSuccessModal() {
    successModal.classList.remove('hidden');
    successModal.classList.add('flex');
};

function closeSuccessModal() {
    successModal.classList.remove('flex');
    successModal.classList.add('hidden');
};

function redirectToHomePage() {
    window.location.href = '/'; // redirect to home page
};

// event handlers
closeSuccessModalBtn.addEventListener('click', closeSuccessModal);
redirectToHomePageBtn.addEventListener('click', redirectToHomePage);


// error modal message 
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

///////////////////////////// modals end ////////////////////////////// 