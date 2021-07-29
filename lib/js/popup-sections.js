import { has } from './helpers.js';

export class PopupSectionController {

    firstOpenListener;
    changeListener;
    closeAllListener;
    backButtonChangeListener;
    popupStack = [];
    popupSections;
    popupOpens;
    popupBacks;
    popupCloses;

    constructor(firstOpenListener, changeListener, closeAllListener, backButtonChangeListener) {
        this.firstOpenListener = firstOpenListener;
        this.changeListener = changeListener;
        this.closeAllListener = closeAllListener;
        this.backButtonChangeListener = backButtonChangeListener;
        this.popupSections = document.querySelectorAll(`[data-cms-popup-section]`);
        this.popupOpens = document.querySelectorAll("[data-cms-popup-open]");
        this.popupBacks = document.querySelectorAll("[data-cms-popup-back]");
        this.popupCloses = document.querySelectorAll("[data-cms-popup-close]");
        this.initialize();
    }

    initialize() {
        for (const popupOpen of this.popupOpens) {
            popupOpen.addEventListener("click", () => {
                const popupName = popupOpen.getAttribute("data-cms-popup-open");
                if (!has(popupName)) {
                    return;
                }
                if (this.popupStack.length > 0) {
                    this.popupStack[this.popupStack.length - 1].style.display = "none";
                    if (has(this.backButtonChangeListener)) {
                        this.backButtonChangeListener(true);
                    }
                } else {
                    if (has(this.firstOpenListener)) {
                        this.firstOpenListener();
                    }
                }
                const popupSection = document.querySelector(`[data-cms-popup-section="${popupName}"]`);
                if (!has(popupSection)) {
                    return;
                }
                popupSection.style.display = "block";
                this.popupStack.push(popupSection);
                if (has(this.changeListener)) {
                    this.changeListener(popupSection);
                }
            });
        }

        //--------------------------------------------------------------
        //On back click, the modal before should be shown if some exists
        //--------------------------------------------------------------
        for (const popupBack of this.popupBacks) {
            popupBack.addEventListener("click", () => {
                const popupSectionToClose = this.popupStack.pop();
                popupSectionToClose.style.display = "none";
                if (has(this.changeListener))
                    this.changeListener(popupSectionToClose);
                if (this.popupStack.length > 0) {
                    this.popupStack[this.popupStack.length - 1].style.display = "block";
                    if (has(this.changeListener))
                        this.changeListener(this.popupStack[this.popupStack.length - 1]);
                }
                if (this.popupStack.length <= 1) {
                    popupBack.style.display = "none";
                    if (has(this.backButtonChangeListener)) {
                        this.backButtonChangeListener(false);
                    }
                }
            });
        }


        for (const popupClose of this.popupCloses) {
            popupClose.addEventListener("click", () => {
                this.closeAllPopups();
            });
        }

        //---------------------------------------------------------------------------
        //Close all popups either on close button click, or on outside of modal click
        //---------------------------------------------------------------------------
        window.onclick = (event) => {
            for (const popupSection of this.popupSections) {
                if (event.target === popupSection) {
                    this.closeAllPopups();
                }
            }
            for (const popupClose of this.popupCloses) {
                if (event.target === popupClose) {
                    this.closeAllPopups();
                }
            }
        }
    }


    closeAllPopups() {
        //Clear popup stack at the beginning, for check on observer.
        this.popupStack.splice(0, this.popupStack.length);
        for (const popupSection of this.popupSections) {
            popupSection.style.display = "none";
        }
        for (const popupClose of this.popupCloses) {
            popupClose.style.display = "none";
        }
        for (const popupBack of this.popupBacks) {
            popupBack.style.display = "none";
        }
        if (has(this.closeAllListener)) {
            this.closeAllListener();
        }
    }
}