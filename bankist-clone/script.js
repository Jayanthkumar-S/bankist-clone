'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  e.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  e.preventDefault();
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////////
//Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window,
  //   scrollTo({
  //     left: s1coords.left + window.pageXOffset,
  //     top: s1coords.top + window.pageYOffset,
  //     behavior: 'smooth',
  //   });
  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////////////////////////////////
////page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

////1.add event listener to common parent element
////2.determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);

  //matching strategy

  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

////////////////////////////////////////////////////
////tabbed components

// tabsContainer.addEventListener('click', e => {
//   const clicked = e.target;
//   console.log(clicked);
// });
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  if (!clicked) return;
  //acive tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');

  ////Active Content area

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

////////////////////////////////////////////////////

////Menu fade animation

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

////passing 'arguments' into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

////////////////////////////////////////////////////

//// sticky header
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   console.log(window.screenY);
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

////Sticky navigation: intersection observer API

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};

const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
observer.observe(header);

////////////////////////////////////////////////////
////reveal sections
const allSection = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSection.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

////////////////////////////////////////////////////

////Lasy loading images

const imageTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    return;
  }
  ////Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imageTargets.forEach(img => imageObserver.observe(img));

////////////////////////////////////////////////////

////Slider

// const slider = function () {
//   const slides = document.querySelectorAll('.slide');
//   const btnLeft = document.querySelector('.slider__btn--left');
//   const btnRight = document.querySelector('.slider__btn--right');

//   const dotContainer = document.querySelector('.dots');

//   let curSlide = 0;
//   const maxSlide = slides.length;

//   // const slider = document.querySelector('.slider');
//   // slider.style.transform = 'scale(0.4) translateX(-800px)';
//   // slider.style.overflow = 'visible';

//   //0,100,200,300%
//   const createDots = function () {
//     slides.forEach(function (_, i) {
//       dotContainer.insertAdjacentHTML(
//         'beforeend',
//         `<button class="dots__dot" data-slide="${i}"></button>`
//       );
//     });
//   };

//   createDots();

//   const activateDot = function (slide) {
//     document
//       .querySelectorAll('.dots__dot')
//       .forEach(dot => dot.classList.remove('dots__dot--active'));
//     document
//       .querySelector(`.dots__dot[data-slide='${slide}']`)
//       .classList.add('dots__dot--active');
//   };

//   const goToSlide = function (slide) {
//     slides.forEach(
//       (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
//     );
//   };

//   ////next slide
//   const nextSlide = function () {
//     if (curSlide === maxSlide - 1) {
//       curSlide = 0;
//     } else {
//       curSlide++;
//     }
//     goToSlide(curSlide);
//     activateDot(curSlide);
//   };
//   const prevSlide = function () {
//     if (curSlide === 0) {
//       curSlide = maxSlide - 1;
//     } else {
//       curSlide--;
//     }
//     goToSlide(curSlide);
//     activateDot(curSlide);
//   };

//   const init = function () {
//     goToSlide(0);
//     createDots();
//     activateDot(0);
//   };

//   init();
//   btnRight.addEventListener('click', nextSlide);

//   btnLeft.addEventListener('click', prevSlide);

//   document.addEventListener('keydown', function (e) {
//     if (e.key === 'ArrowLeft') prevSlide();
//     e.key === 'ArrowRight' && nextSlide();
//   });

//   dotContainer.addEventListener('click', function (e) {
//     if (e.target.classList.contains('dots__dot')) {
//       const slide = e.target.dataset.slide;
//       goToSlide(slide);
//       activateDot(slide);
//     }
//   });
// };
// slider();
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

////////////////////////////////////////////////////
////////////////////////////////////////////////////

// console.log(document.documentElement);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');

// console.log(allSections);

// document.getElementById('section--1');

// const allButtons = document.getElementsByTagName('button');

// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// //Creating and inserting elements

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent =
// //   'We use cookies for imporoved functionality and analytics';

// message.innerHTML = `We use cookies for imporoved functionality and analytics .
//  <button class='btn
//   btn--close-cookie'>Got it!</button>`;

// // header.prepend(message);
// header.append(message);

// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// //delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove(); //best method
//     ////or////
//     // message.parentElement.removeChild(message);
//   });

// ////styles

// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.height);
// console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message).color);

// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

//Attributes

// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);

// console.log(logo.className);

// logo.alt = 'Beautiful minimalist logo';
// console.log(logo.alt);

// const link = document.querySelector('.twitter-link');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// //data sttibites
// console.log(logo.dataset.versionNumber);

// ////classes
// logo.classList.add();
// logo.classList.remove();
// logo.classList.toggle();
// logo.classList.contains();

// ////dont use
// logo.className = 'jonas';

// const btnScrollTo = document.querySelector('.btn--scroll-to');

// const section1 = document.querySelector('#section--1');
// btnScrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);
//   console.log(e.target.getBoundingClientRect());

//   // window.scrollTo(
//   //   s1coords.left + window.pageXOffset,
//   //   s1coords.top + window.pageYOffset
//   // );

//   // window,
//   //   scrollTo({
//   //     left: s1coords.left + window.pageXOffset,
//   //     top: s1coords.top + window.pageYOffset,
//   //     behavior: 'smooth',
//   //   });
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventListener great you are reading the heading ');
// };
// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 2000);
// h1.onmouseenter = function (e) {
//   alert('addEventListener great you are reading the heading ');
// };

// rgb(255,255,255)
// const randamInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randamInt(0, 255)},${randamInt(0, 255)},${randamInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// const h1 = document.querySelector('h1');

// //going dpwnwards : child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.backgroundColor = 'red';
// h1.lastElementChild.style.color = 'white';

// ////going upwards:parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// h1.closest('h1').style.background = 'var(--gradient-primary)';

// ////going sideways siblings

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) {
//     el.style.transform = 'scale(0.5';
//   }
// });

document.addEventListener('DOMContentLoaded', function (e) {
  console.log(`HTML parsed and DOM tree built`, e);
});

window.addEventListener('load', function (e) {
  console.log(`page fully loaded`, e);
});

/// leaving page alert

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(`e`);
//   e.returnValue = 'you want to leave';
// });
