import { validateAllExistingFormElements, getFormInputElements, defaultValidationTextSelector } from './form-validation-helpers.js';

document.addEventListener("DOMContentLoaded", function (event) {

    //Hide validation-text on input click
    const validationTexts = document.querySelectorAll(defaultValidationTextSelector);
    for (const validationText of validationTexts) {
        validationText.parentElement.addEventListener('click', () => {
            validationText.style.display = 'none';
        });
    }

    //Handle form input validation
    const dataCmsForms = document.querySelectorAll('[data-cms-form]');
    for (const dataCmsForm of dataCmsForms) {
        const submitInput = dataCmsForm.querySelector('[type="submit"]');
        submitInput.addEventListener("click", (event) => {
            const formValid = validateAllExistingFormElements(getFormInputElements(dataCmsForm));
            if (!formValid) {
                event.preventDefault();
            }
        });
    }
});