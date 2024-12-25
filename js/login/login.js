const $ = document;
// form
const form = $.getElementById('form')
const serverErrorMessageContainer = $.getElementById('server-error-message');
// user name input
const userNameInput = $.getElementById('username-input');
const usernameErrorMessageContainer = $.getElementById('username-input-error-message');
// password input
const passwordInput = $.getElementById('password-input');
const passwordInputIcon = $.getElementById('password-input-icon');
const passwordErrorMessageContainer = $.getElementById('password-input-error-message');
let isShowPassword = false;


// clear error messages and input values
function clearAllInputsValues() {
    // clear inputs
    userNameInput.value = '';
    passwordInput.value = '';
    // clear error messages
    userNameInput.innerHTML = '';
    passwordInput.innerHTML = '';
}

userNameInput.addEventListener('change', (event) => {
    const userNamePattern = /^\w{5,12}$/i
    // username validation
    if (!event.target.value) {
        usernameErrorMessageContainer.innerHTML = 'وارد کردن نام کاربری الزامی میباشد'
    } else if (!userNamePattern.test(event.target.value)) {
        usernameErrorMessageContainer.innerHTML = 'نام کاربری معتبر نمیباشد'
    } else {
        usernameErrorMessageContainer.innerHTML = ''
    }
});

passwordInput.addEventListener('change', (event) => {
    const passwordPattern = /^\w{5,12}$/i
    // password validation
    if (!event.target.value) {
        passwordErrorMessageContainer.innerHTML = 'وارد کردن رمز عبور الزامی میباشد'
    } else if (!passwordPattern.test(event.target.value)) {
        passwordErrorMessageContainer.innerHTML = 'رمز عبور معتبر نمیباشد'
    } else {
        passwordErrorMessageContainer.innerHTML = ''
    }
});


// check all of input fields
function isFormValid({ username, password }) {
    // Regex patterns
    const userNamePattern = /^\w{5,12}$/i
    const passwordPattern = /^\w{5,12}$/i

    // validation flags
    let isUserNameValid = false;
    let isPasswordValid = false;

    // username validation
    if (!username) {
        usernameErrorMessageContainer.innerHTML = 'وارد کردن نام کاربری الزامی میباشد'
    } else if (!userNamePattern.test(username)) {
        usernameErrorMessageContainer.innerHTML = 'نام کاربری معتبر نمیباشد'
    } else {
        usernameErrorMessageContainer.innerHTML = ''
        isUserNameValid = true;
    }

    // password validation
    if (!password) {
        passwordErrorMessageContainer.innerHTML = 'وارد کردن رمز عبور الزامی میباشد'
    } else if (!passwordPattern.test(password)) {
        passwordErrorMessageContainer.innerHTML = 'رمز عبور معتبرنمیباشد'
    } else {
        passwordErrorMessageContainer.innerHTML = ''
        isPasswordValid = true;
    }

    let isAllFormValid = isUserNameValid && isPasswordValid
    return isAllFormValid
};

// end of validation and send the form to the server
function sendFormToServer(form) {
    // get all users from the server
    fetch(`/api/users?username=${form.username}&password=${form.password}`)
        .then(res => res.json())
        .then(user => {
            if (user.length) {
                clearAllInputsValues()
                login(user[0])
            } else {
                serverErrorMessageContainer.innerHTML = 'کاربری با این مشخصات یافت نشد'
            }
        })
        .catch(error => console.log(error.message))
};

// submit the form to the server
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = {
        username: userNameInput.value,
        password: passwordInput.value,
    };

    if (isFormValid(formData)) {
        sendFormToServer(formData);
    }
});


// toggle password input and fix icon when clicked
passwordInputIcon.addEventListener('click', () => {
    if (isShowPassword) {
        passwordInput.setAttribute('type', 'text');
        passwordInputIcon.setAttribute('src', 'https://img.icons8.com/?size=30&id=100236&format=png');
        isShowPassword = false;
    } else {
        passwordInput.setAttribute('type', 'password');
        passwordInputIcon.setAttribute('src', 'https://img.icons8.com/?size=24&id=85130&format=png');
        isShowPassword = true;
    }
})



// login function
function login(userData) {
    const { token, id, role, profileImage, phone, task, username } = userData;
    localStorage.setItem('user', JSON.stringify({ token, id, role, profileImage, phone, task, username }))
    window.location.href = '/'
}