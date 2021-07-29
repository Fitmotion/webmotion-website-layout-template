export const mailPattern = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");

export var defaultValidationTextSelector = ".validation-text";

export var defaultUserMessages = {
    inputIsEmpty: "Bitte ausfüllen",
    dataIsNotValid: "Die Daten sind ungültig, bitte korrigieren.",
    mailIsNotValid: "Die E-Mail is ungültig, bitte korrigiern.",
    phoneNumberIsNotValid: "Die Telefonnummer is ungültig, bitte korrigiern.",
    ageIsNotOverEighteen: "Leider müssen Sie 18 oder älter sein.",
    checkboxNotChecked: "Bitte kreuzen Sie das Kästchen an, um fortzufahren.",
    selectNotSelected: "Bitte auswählen."
};

export function isChecked(checked) {
    return checked === true;
}

export function isEmptyText(text) {
    return (text === undefined) || (text === null) || (text.trim() === "");
}

export function isValidPrename(prename) {
    return prename.trim().length >= 2;
}

export function isValidFamilyName(surname) {
    return surname.trim().length >= 2;
}

export function isValidMail(mail) {
    return mailPattern.test(mail);
}

export function isValidPhoneNumber(phoneNumber) {
    const isValidPhoneLength = phoneNumber.trim().length > 7;
    const isValidPhonePattern = /.*[0-9].*/.test(phoneNumber);
    return isValidPhoneLength && isValidPhonePattern;
}

export function isEighteen(birthday) {
    const birthdayDate = new Date(birthday);
    const dateNow = new Date();
    const age = Math.floor((dateNow - birthdayDate) / (365.25 * 24 * 60 * 60 * 1000));
    return age >= 18;
}

//Street
export function isValidAdressLine1(addressLine1) {
    return addressLine1.trim().length >= 4;
}

//House Number
export function isValidAdressLine2(addressLine2) {
    const isValidLength = addressLine2.trim().length >= 1;
    const isValidPattern = /.*[0-9].*/.test(addressLine2);
    return isValidLength && isValidPattern;
}

//City
export function isValidAdressLevel2(addressLevel2) {
    return addressLevel2.trim().length >= 2;
}

export function isValidZipCode(zipCode) {
    const isValidLength = zipCode.length === 5;
    const isValidPattern = /.*[0-9].*/.test(zipCode);
    return isValidLength && isValidPattern;
}

export function isValidIban(iban) {
    return iban.trim().length >= 22;
}

/**
 * Validates all existing form elements based on their type.
 * Elements which are undefined or null, will not be validated.
 * @param {FormElements} formElements 
 */
export function validateAllExistingFormElements(formElements) {
    let allFormElementsValid = true;
    for (const formElementKey in formElements) {
        if ((formElements[formElementKey] === null) || (formElements[formElementKey] === undefined)) {
            continue;
        }
        if (!(formElements[formElementKey] instanceof NodeList)) {
            const formElement = formElements[formElementKey];
            if (
                formElement.getAttribute("data-cms-required") === null ||
                formElement.getAttribute("data-cms-required") === undefined
            ) {
                continue;
            }
            const validationTextElement = formElement.parentElement.querySelector(defaultValidationTextSelector);
            if (formElement instanceof HTMLInputElement) {
                switch (formElement.type) {
                    case "text":
                        if (isEmptyText(formElement.value)) {
                            validationTextElement.textContent = defaultUserMessages.inputIsEmpty;
                            validationTextElement.style.display = "block";
                            allFormElementsValid = false;
                        } else {
                            switch (formElement.autocomplete) {
                                case "name":
                                    if (!isValidPrename(formElement.value)) {
                                        validationTextElement.textContent = defaultUserMessages.dataIsNotValid;
                                        validationTextElement.style.display = "block";
                                        allFormElementsValid = false;
                                    } else {
                                        validationTextElement.style.display = "none";
                                    }
                                    break;
                                case "given-name":
                                    if (!isValidPrename(formElement.value)) {
                                        validationTextElement.textContent = defaultUserMessages.dataIsNotValid;
                                        validationTextElement.style.display = "block";
                                        allFormElementsValid = false;
                                    } else {
                                        validationTextElement.style.display = "none";
                                    }
                                    break;
                                case "family-name":
                                    if (!isValidFamilyName(formElement.value)) {
                                        validationTextElement.textContent = defaultUserMessages.dataIsNotValid;
                                        validationTextElement.style.display = "block";
                                        allFormElementsValid = false;
                                    } else {
                                        validationTextElement.style.display = "none";
                                    }
                                    break;
                                case "address-line1":
                                    if (!isValidAdressLine1(formElement.value)) {
                                        validationTextElement.textContent = defaultUserMessages.dataIsNotValid;
                                        validationTextElement.style.display = "block";
                                        allFormElementsValid = false;
                                    } else {
                                        validationTextElement.style.display = "none";
                                    }
                                    break;
                                case "address-line2":
                                    if (!isValidAdressLine2(formElement.value)) {
                                        validationTextElement.textContent = defaultUserMessages.dataIsNotValid;
                                        validationTextElement.style.display = "block";
                                        allFormElementsValid = false;
                                    } else {
                                        validationTextElement.style.display = "none";
                                    }
                                    break;
                                case "address-level2":
                                    if (!isValidAdressLevel2(formElement.value)) {
                                        validationTextElement.textContent = defaultUserMessages.dataIsNotValid;
                                        validationTextElement.style.display = "block";
                                        allFormElementsValid = false;
                                    } else {
                                        validationTextElement.style.display = "none";
                                    }
                                    break;
                                default:
                                    if (formElement.name === "iban" && !isValidIban(formElement.value)) {
                                        console.log("test");
                                        validationTextElement.textContent = defaultUserMessages.dataIsNotValid;
                                        validationTextElement.style.display = "block";
                                        allFormElementsValid = false;
                                    } else {
                                        validationTextElement.style.display = "none";
                                    }
                            }
                        }
                        break;
                    case "tel":
                        if (isEmptyText(formElement.value)) {
                            validationTextElement.textContent = defaultUserMessages.inputIsEmpty;
                            validationTextElement.style.display = "block";
                            allFormElementsValid = false;
                        } else if (!isValidPhoneNumber(formElement.value)) {
                            validationTextElement.textContent = defaultUserMessages.phoneNumberIsNotValid;
                            validationTextElement.style.display = "block";
                            allFormElementsValid = false;
                        } else {
                            validationTextElement.style.display = "none";
                        }
                        break;
                    case "email":
                        if (isEmptyText(formElement.value)) {
                            validationTextElement.textContent = defaultUserMessages.inputIsEmpty;
                            validationTextElement.style.display = "block";
                            allFormElementsValid = false;
                        } else if (!isValidMail(formElement.value)) {
                            validationTextElement.textContent = defaultUserMessages.mailIsNotValid;
                            validationTextElement.style.display = "block";
                            allFormElementsValid = false;
                        } else {
                            validationTextElement.style.display = "none";
                        }
                        break;
                    case "date":
                        if (formElement.autocomplete === "bday") {
                            if (isEmptyText(formElement.value)) {
                                validationTextElement.textContent = defaultUserMessages.inputIsEmpty;
                                validationTextElement.style.display = "block";
                                allFormElementsValid = false;
                            } else if (!isEighteen(formElement.value)) {
                                validationTextElement.textContent = defaultUserMessages.ageIsNotOverEighteen;
                                validationTextElement.style.display = "block";
                                allFormElementsValid = false;
                            } else {
                                validationTextElement.style.display = "none";
                            }
                        }
                        break;
                    case "checkbox":
                        if (formElement.required === true) {
                            if (isChecked(formElement.checked)) {
                                validationTextElement.textContent = defaultUserMessages.checkboxNotChecked;
                                validationTextElement.style.display = "block";
                                allFormElementsValid = false;
                            } else {
                                validationTextElement.style.display = "none";
                            }
                        }
                        break;
                    case "number":
                        if (formElement.autocomplete === "bday") {
                            if (isEmptyText(formElement.value)) {
                                validationTextElement.textContent = defaultUserMessages.inputIsEmpty;
                                validationTextElement.style.display = "block";
                                allFormElementsValid = false;
                            } else if (!isEighteen(formElement.value)) {
                                validationTextElement.textContent = defaultUserMessages.ageIsNotOverEighteen;
                                validationTextElement.style.display = "block";
                                allFormElementsValid = false;
                            } else {
                                validationTextElement.style.display = "none";
                            }
                        } else if (formElement.autocomplete === "postal-code") {
                            if (isEmptyText(formElement.value)) {
                                validationTextElement.textContent = defaultUserMessages.inputIsEmpty;
                                validationTextElement.style.display = "block";
                                allFormElementsValid = false;
                            } else if (!isValidZipCode(formElement.value)) {
                                validationTextElement.textContent = defaultUserMessages.dataIsNotValid;
                                validationTextElement.style.display = "block";
                                allFormElementsValid = false;
                            } else {
                                validationTextElement.style.display = "none";
                            }
                        }
                        break;
                }
            } else if (formElement instanceof HTMLSelectElement) {
                if (isEmptyText(formElement.value)) {
                    validationTextElement.textContent = defaultUserMessages.selectNotSelected;
                    validationTextElement.style.display = "block";
                    allFormElementsValid = false;
                } else {
                    validationTextElement.style.display = "none";
                }
            } else if (formElement instanceof HTMLTextAreaElement) {
                if (isEmptyText(formElement.value)) {
                    validationTextElement.textContent = defaultUserMessages.inputIsEmpty;
                    validationTextElement.style.display = "block";
                    allFormElementsValid = false;
                } else {
                    validationTextElement.style.display = "none";
                }
            }
        } else {
            for (const formElement of formElements[formElementKey]) {
                const validationTextElement = formElement.parentElement.querySelector(defaultValidationTextSelector);
                if (
                    formElement.type === "checkbox" &&
                    formElement.getAttribute("data-cms-required") !== null &&
                    formElement.getAttribute("data-cms-required") !== undefined
                ) {
                    if (!isChecked(formElement.checked)) {
                        validationTextElement.textContent = defaultUserMessages.checkboxNotChecked;
                        validationTextElement.style.display = "block";
                        allFormElementsValid = false;
                    } else {
                        validationTextElement.style.display = "none";
                    }
                }
            }
        }
    }
    return allFormElementsValid;
}

/**
 * Returns all form inputs for the given form.
 * @param {HTMLElement} parentElement The parent element, from which all the input elements should be queried.
 * @return {FormElements}
 * @typedef {Object} FormElements
 * @property {HTMLInputElement} mailElement - The mail element or null
 * @property {HTMLSelectElement} genderElement - The gender element or null
 * @property {HTMLSelectElement} titleElement - The title element or null
 * @property {HTMLInputElement} prenameElement - The prename element or null
 * @property {HTMLInputElement} surnameElement - The surname element or null
 * @property {HTMLInputElement} birthdayElement - The birthday element or null
 * @property {HTMLInputElement} addressElement - The address element or null
 * @property {HTMLInputElement} houseNumberElement - The houseNumber element or null
 * @property {HTMLInputElement} zipCodeElement - The zipCode element or null
 * @property {HTMLInputElement} cityElement - The city element or null
 * @property {HTMLInputElement} phoneNumberElement - The phoneNumber element or null
 * @property {HTMLInputElement} accountHolderElement - The accountHolder element or null
 * @property {HTMLInputElement} ibanElement - The gender iban or null
 * @property {HTMLInputElement} bicElement - The gender bic or null
 * @property {HTMLInputElement} bankNameElement - The bankName element or null
 * @property {HTMLTextAreaElement} customerMessageElement - The customerMessage element or null
 * @property {HTMLInputElement[]} checkBoxElements - The customerMessage element or null
 */
export function getFormInputElements(parentElement) {
    //The names come from the cloud and are mandatory. Do not change them
    const mailElement = parentElement.querySelector('input[name="mail"]');
    const genderElement = parentElement.querySelector('select[name="gender"]');
    const titleElement = parentElement.querySelector('select[name="title"]');
    const prenameElement = parentElement.querySelector('input[name="prename"]');
    const surnameElement = parentElement.querySelector('input[name="surname"]');
    const birthdayElement = parentElement.querySelector('input[name="birthday"]');
    const addressElement = parentElement.querySelector('input[name="address"]');
    const houseNumberElement = parentElement.querySelector('input[name="houseNumber"]');
    const zipCodeElement = parentElement.querySelector('input[name="zipCode"]');
    const cityElement = parentElement.querySelector('input[name="city"]');
    const phoneNumberElement = parentElement.querySelector('input[name="phoneNumber"]');
    const accountHolderElement = parentElement.querySelector('input[name="accountHolder"]');
    const ibanElement = parentElement.querySelector('input[name="iban"]');
    const bicElement = parentElement.querySelector('input[name="bic"]');
    const bankNameElement = parentElement.querySelector('input[name="bankName"]');
    const customerMessageElement = parentElement.querySelector('textarea[name="customerMessage"]');
    const checkBoxElements = parentElement.querySelectorAll('input[type="checkbox"]');

    return {
        mailElement,
        genderElement,
        titleElement,
        prenameElement,
        surnameElement,
        birthdayElement,
        addressElement,
        houseNumberElement,
        zipCodeElement,
        cityElement,
        phoneNumberElement,
        accountHolderElement,
        ibanElement,
        bicElement,
        bankNameElement,
        customerMessageElement,
        checkBoxElements
    }
}