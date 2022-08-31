
document.addEventListener('DOMContentLoaded', () => {

    // modal
    const burgerBtn = document.querySelector('.nav__burger'),
        cLosed = document.querySelector('.close'),
        mobileMenu = document.querySelector('.nav__menu'),
        listItem = document.querySelector('.list-element');

    burgerBtn.onclick = function () {
        mobileMenu.classList.toggle('nav__menu--active');
    };

    cLosed.onclick = function () {
        mobileMenu.classList.remove('nav__menu--active');
    };

    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos >= currentScrollPos) {
            mobileMenu.classList.remove('nav__menu--active');
        }
        prevScrollpos = currentScrollPos;
    };


    // calc

    const cards = document.querySelectorAll('.calc__calc-card'),
        payment = document.querySelector('.calc__calc-sum'),
        select = document.querySelector('.calc__select'),
        calcInput = document.querySelector('.calc__calc-input');

    function prettify(num) {
        var n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }

    function getPayment(sum, period, rate) {
        // *
        // * sum - сумма кредита
        // * period - срок в годах
        // * rate - годовая ставка в процентах
        // * 
        let i,
            koef;

        // ставка в месяц
        i = (rate / 12) / 100;

        // коэффициент аннуитета
        koef = (i * (Math.pow(1 + i, period * 12))) / (Math.pow(1 + i, period * 12) - 1);

        // итог
        payment.textContent = (sum * koef).toFixed();
    };

    function getPaymentDesktop() {
        cards.forEach(card => {
            if (card.classList.contains('calc__calc-card--active')) {
                let sum = +calcInput.value.replace(/\D/g, ''),
                    period = +card.dataset.period;

                getPayment(sum, period, 5.5);
            }
        });
    }

    function getPaymentMobile() {
        let sum = +document.querySelector('.calc__calc-input').value.replace(/\D/g, ''),
            period = +select.value;

        getPayment(sum, period, 5.5);
    }

    function clearActiveClass() {
        cards.forEach(card => {
            card.classList.remove('calc__calc-card--active');
        });
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            clearActiveClass();
            card.classList.add('calc__calc-card--active'); +
                calcInput.value.replace(/\D/g, '') >= 100000 && +calcInput.value.replace(/\D/g, '') <= 20000000 ? getPaymentDesktop() : payment.textContent = '0';
        });
    });

    select.addEventListener('input', () => {
        +calcInput.value.replace(/\D/g, '') >= 100000 && +calcInput.value.replace(/\D/g, '') <= 20000000 ? getPaymentMobile() : payment.textContent = '0';
    });

    calcInput.addEventListener('input', () => {
        if (calcInput.value[0] == 0) {
            calcInput.value = calcInput.value.replace(/./g, '');
        }
        calcInput.value = calcInput.value.replace(/\D/g, '');

        calcInput.value = prettify(calcInput.value);
        getPaymentDesktop();

        if (+calcInput.value.replace(/\D/g, '') > 20000000) {
            calcInput.value = prettify(20000000);
        }

        if (+calcInput.value.replace(/\D/g, '') >= 100000 && +calcInput.value.replace(/\D/g, '') <= 20000000) {
            if (select.value != '') {
                getPaymentMobile()
            }
            getPaymentDesktop();
        } else {
            payment.textContent = '0';
        }

    });



    const width = window.innerWidth
    if (width < 576) {

        const swiper = new Swiper('.swiper-terms', {

            pagination: {
                el: '.pegination-terms',
                type: 'progressbar',
            },
            spaceBetween: 10,
            slidesPerView: 1.2,
        });

        const swiperTwo = new Swiper('.company-swiper', {
            // resizeObserver: false,
            pagination: {
                el: '.company__pagination',
                type: 'progressbar',
            },
            loop: true,
            spaceBetween: 10,
            slidesPerView: 2.5,
        });

    }
})

