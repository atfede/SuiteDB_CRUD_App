/**
 * Created by eltes on 15-Aug-18.
 */
var validName = false;
var validPhone = false;
var validEmail = false;
var validAge = false;

function checkForm() {
    return validName && validPhone && validEmail && validAge;
}

function validatePhone(phone) {

    var reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phone.value.match(reg)) {
        document.getElementById("phoneMessage").innerHTML = "<span class='warning'>Thank you, you have entered a valid phone number!.</span>";
        validPhone = true;
    }
    else {
        document.getElementById("phoneMessage").innerHTML = "<span class='warning'>Phone is not valid yet.</span>";
        validPhone = false;
    }
}
// validates text only
function validateText(txt) {
    txt.value = txt.value.replace(/[^a-zA-Z-'\n\r.]+/g, '');
}

// validates name
function validateName(txt) {
    if (txt.value.length >= 2 && txt.value.length <= 10) {
        document.getElementById("errFirst").innerHTML = "<span class='warning'>Thank you, you have entered a valid user name!.</span>";
        validName = true;
    }
    else {
        document.getElementById("errFirst").innerHTML = "<span class='warning'>User name is not valid yet.</span>";
        validName = false;
    }
}

// validate email
function validateEmail(email) {
    var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;

    if (regMail.test(email) == false) {
        document.getElementById("status").innerHTML = "<span class='warning'>Email address is not valid yet.</span>";
        validEmail = false;
    }
    else {
        document.getElementById("status").innerHTML = "<span class='valid'>Thanks, you have entered a valid Email address!</span>";
        validEmail = true;
    }
}
// validate date of birth
function validateDateOfBirth(dob) {
    var regDOB = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/;
    var dateOfBirth = new Date(dob);
    var age = calculateAge(dateOfBirth);

    if (age >= 21) {
        document.getElementById("statusDateOfBirth").innerHTML = "<span class='valid'>Thanks, you have entered a valid Date of birth!</span>";
        validAge = true;
    }
    else {
        document.getElementById("statusDateOfBirth").innerHTML = "<span class='valid'>You must be at least 21 years old to register.</span>";
        validAge = false;
    }
}

function calculateAge(dateOfBirth) { // birthday is a date
    var ageDifMs = Date.now() - dateOfBirth.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// validate address
function validateAddress(address) {
    var regAdd = /^(?=.*\d)[a-zA-Z\s\d\/]+$/;

    if (regAdd.test(address) == false) {
        document.getElementById("addressStatus").innerHTML = "<span class='warning'>Address is not valid yet.</span>";
    }
    else {
        document.getElementById("addressStatus").innerHTML = "<span class='valid'>Thanks, Address looks valid!</span>";
    }
}
