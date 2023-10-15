// let slider = [3, 1, 2];
// let rightButton = document.querySelector('.right-button');
// let leftButton = document.querySelector('.left-button');

// const slideToTheRight = () => {
//     slider.push(slider.shift());
//     console.log(slider[1], slider);

// }
// const slideToTheLeft = () => {
//     slider.unshift(slider.pop());
//     console.log(slider[1], slider);
// }
// rightButton.addEventListener('click', slideToTheRight);
// leftButton.addEventListener('click', slideToTheLeft);

// console.log(slider[1]);

const imgCounter = (function () {
    let counter = 1;

    const incrementCounter = () => counter += 1;
    const decrementCounter = () => counter -= 1;
    const updateCounter = (step) => counter = step;
    const resetCounter = () => counter = 1;
    const getCounterStatus = () => { return counter };

    return { incrementCounter, decrementCounter, updateCounter, resetCounter, getCounterStatus };
})();

const sliderController = (function () {
    const slider = document.querySelector('.slider');

    const slideToTheRight = () => {
        if (imgCounter.getCounterStatus() < 5) {
            imgCounter.incrementCounter();
            slider.style.transform = `translateX(${-532 * (imgCounter.getCounterStatus() - 1)}px)`;
        }
        else {
            slider.style.transform = 'translateX(0px)';
            imgCounter.resetCounter();
        }
    };

    const slideToTheLeft = () => {
        if (imgCounter.getCounterStatus() > 1) {
            imgCounter.decrementCounter();
            slider.style.transform = `translateX(${-532 * (imgCounter.getCounterStatus() - 1)}px)`;
        }
    }

    const slideWithDots = (dotIndex) => {
        imgCounter.updateCounter(dotIndex + 1);
        slider.style.transform = `translateX(${-532 * (imgCounter.getCounterStatus() - 1)}px)`;
    };

    return { slideToTheRight, slideToTheLeft, slideWithDots }

})();

const activateArrowsToSlide = (function () {
    const rightButtonContainer = document.querySelector('.right-button-container');
    const leftButtonContainer = document.querySelector('.left-button-container');

    rightButtonContainer.addEventListener('click', () => {
        sliderController.slideToTheRight();
        leftButtonVisibilityController.regulateLeftButtonVisibility();
        dotsFillingColorController.regulateDotsFillingColor(imgCounter.getCounterStatus() - 1);
        bodyBackgroundImgController.regulateBodyBackgroundImg(imgCounter.getCounterStatus() - 1);
    });
    leftButtonContainer.addEventListener('click', () => {
        sliderController.slideToTheLeft();
        leftButtonVisibilityController.regulateLeftButtonVisibility();
        dotsFillingColorController.regulateDotsFillingColor(imgCounter.getCounterStatus() - 1);
        bodyBackgroundImgController.regulateBodyBackgroundImg(imgCounter.getCounterStatus() - 1);
    });
})();

const activateDotsToSlide = (function () {
    const dots = document.querySelectorAll('.dots-navigation-container button');
    dots[0].style.backgroundColor = '#ff0000';

    dots.forEach((dot, dotIndex) => dot.addEventListener('click', function () {
        sliderController.slideWithDots(dotIndex);
        leftButtonVisibilityController.regulateLeftButtonVisibility();
        dotsFillingColorController.regulateDotsFillingColor(dotIndex);
        bodyBackgroundImgController.regulateBodyBackgroundImg(dotIndex);
    }));
})();


// Down here, the code to control the appearance of the left arrow, the dots and of the body background
const dotsFillingColorController = (function () {
    const regulateDotsFillingColor = (dotIndex) => {
        const dots = Array.from(document.querySelectorAll('.dots-navigation-container button'));
        dots.forEach(dot => dot.style.backgroundColor = '');
        dots[dotIndex].style.backgroundColor = '#ff0000'
    }

    return { regulateDotsFillingColor };

})();

const leftButtonVisibilityController = (function () {
    const regulateLeftButtonVisibility = () => {
        const leftButtonContainer = document.querySelector('.left-button-container');

        if (imgCounter.getCounterStatus() === 1) {
            leftButtonContainer.style.cssText = 'visibility: hidden';
        }
        else {
            leftButtonContainer.style.cssText = 'visibility: visible';
            leftButtonContainer.style.opacity = '1';
        }
    }
    return { regulateLeftButtonVisibility };
})();

const bodyBackgroundImgController = (function () {
    const regulateBodyBackgroundImg = (imgNumber) => {
        const body = document.querySelector('body');
        const backdrop = document.querySelector('.backdrop');
        const imagesSrc = [...document.querySelectorAll('img')].map(img => img.getAttribute('src'));
        backdrop.style.background = '#000';
        backdrop.addEventListener('transitionend', function changeBackground() {
            body.style.background = `radial-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), content-box url(${imagesSrc[imgNumber]}) center center/cover`;
            backdrop.style.background = 'transparent';
            backdrop.removeEventListener('transitionend', changeBackground);
        })
    }
    return { regulateBodyBackgroundImg };
})();