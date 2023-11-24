document.addEventListener("DOMContentLoaded", () => {

  //= components/

  SmoothScroll({
    // Время скролла 400 = 0.4 секунды
    animationTime: 1000,
    // Размер шага в пикселях 
    stepSize: 75,

    // Дополнительные настройки:

    // Ускорение 
    accelerationDelta: 30,
    // Максимальное ускорение
    accelerationMax: 2,

    // Поддержка клавиатуры
    keyboardSupport: true,
    // Шаг скролла стрелками на клавиатуре в пикселях
    arrowScroll: 50,

    // Pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    pulseAlgorithm: true,
    pulseScale: 4,
    pulseNormalize: 1,

    // Поддержка тачпада
    touchpadSupport: true,
  })


  function typeAnimation(event) {
    var textElement = document.querySelector(".title-block__title h1");
    var textToType = "Group Pack";
    textElement.innerText = "";

    function typeText(text, i) {
      if (i < text.length) {
        textElement.innerText += text.charAt(i);
        textElement.innerHTML += '<span class="cursor"></span>';
        setTimeout(function () {
          typeText(text, i + 1);
        }, Math.random() * 200 + 100);
      }
    }

    typeText(textToType, 0);
  }

  typeAnimation()

  const counters = document.querySelectorAll('.title-block__info-inner div p:first-child');

  counters.forEach(counter => {
    const target = +counter.textContent;
    counter.textContent = '0';

    const updateCounter = () => {
      const current = +counter.textContent;
      const increment = target / 1000;

      if (current < target) {
        counter.textContent = `${Math.ceil(current + increment)}`;
        setTimeout(updateCounter, 1);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });



  const blogVideo = document.querySelector('.blog__video-inner video');
  const muteButton = document.querySelector('.mute-ico');
  const unmuteButton = document.querySelector('.unmute-ico');

  muteButton.addEventListener('click', function () {
    blogVideo.muted = false;
    muteButton.style.display = 'none';
    unmuteButton.style.display = 'block';
  });

  unmuteButton.addEventListener('click', function () {
    blogVideo.muted = true;
    muteButton.style.display = 'block';
    unmuteButton.style.display = 'none';
  });

  const mainVideo = document.querySelector('.title-block__video video');
  const playButton = document.querySelector('.title-block__video button');

  playButton.addEventListener('click', function () {
    mainVideo.play();
    mainVideo.controls = true;
    playButton.style.display = 'none';
  });

  const prodVideo = document.querySelector('.production__video video');
  const prodPlayButton = document.querySelector('.production__video button');

  prodPlayButton.addEventListener('click', function () {
    prodVideo.play();
    prodVideo.controls = true;
    prodPlayButton.style.display = 'none';
  });

  if (window.matchMedia("(max-width: 500px)").matches) {
    let materialsTypesSwiper = new Swiper(".materials-types-swiper", {

    });
  }


  if (window.matchMedia("(max-width: 500px)").matches) {
    let ourWorksSwiper = new Swiper(".our-works-swiper", {

    });
  }

  if (window.matchMedia("(max-width: 500px)").matches) {
    let technicalCapabilitiesSwiper = new Swiper(".technical-capabilities-swiper", {

    });
  }



  const rotationCards = document.querySelectorAll(".rotation-card");

  rotationCards.forEach(card => {
    const panelContainer = card.querySelector(".panel-container");
    card.addEventListener('mousemove', (e) => transformPanel(e, card, panelContainer));
    card.addEventListener('mouseenter', () => handleMouseEnter(panelContainer));
    card.addEventListener('mouseleave', () => handleMouseLeave(panelContainer));
  });

  function transformPanel(mouseEvent, card, panelContainer) {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = mouseEvent.clientX;
    const mouseY = mouseEvent.clientY;
    const percentX = (mouseX - centerX) / (rect.width / 2);
    const percentY = -((mouseY - centerY) / (rect.height / 2));
    const transformAmount = 10;
    panelContainer.style.transform = `perspective(40rem) rotateY(${percentX * transformAmount}deg) rotateX(${percentY * transformAmount}deg)`;
  }

  function handleMouseEnter(panelContainer) {
    panelContainer.style.transition = '';
  }

  function handleMouseLeave(panelContainer) {
    panelContainer.style.transition = 'transform 0.5s ease-out';
    panelContainer.style.transform = 'perspective(40rem) rotateY(0deg) rotateX(0deg)';
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".package-types ul li", {
    scrollTrigger: {
      trigger: ".package-types ul",
      start: "top 75%",
      end: "bottom top",
      toggleActions: "restart none none none"
    },
    duration: 1, 
    opacity: 0,   
    y: 30,         
    stagger: 0.2,  
    ease: "power2.out"
  });


  gsap.from(".type-of-package ul li", {
    scrollTrigger: {
      trigger: ".type-of-package ul",
      start: "top 80%", // Анимация начнется, когда верхний край списка достигнет 80% высоты вьюпорта
      end: "bottom top",
      toggleActions: "play none none none"
    },
    duration: 1.2,
    opacity: 0,
    scale: 0.5, // начинаем анимацию с масштаба 50%
    transformOrigin: "center", // центр анимации в середине элемента
    ease: "elastic.out(1, 0.75)", // эластичный эффект при "разворачивании"
    stagger: 0.1 // небольшая задержка между анимациями каждого элемента
  });

  gsap.from(".why-us ul li", {
    scrollTrigger: {
      trigger: ".why-us ul",
      start: "top 90%", // Начало анимации при достижении верха списка 90% высоты вьюпорта
      end: "bottom top",
      toggleActions: "play none none none"
    },
    duration: 1,
    x: (index, target) => {
      return index % 2 === 0 ? -200 : 200; // Чередование направления "пролета" для каждого элемента
    },
    opacity: 0,
    ease: "power3.out", // Плавная анимация
    stagger: 0.2 // Задержка между анимациями каждого элемента
  });


  gsap.from(".addition ul li", {
    scrollTrigger: {
      trigger: ".addition ul",
      start: "top bottom", // Начало анимации, когда верх списка достигает нижней части вьюпорта
      end: "bottom top",
      toggleActions: "play none none none"
    },
    duration: 0.7,
    opacity: 0, // начинаем с полностью прозрачного состояния
    y: 50, // начальное смещение вверх
    ease: "power1.out", // плавная анимация
    stagger: 0.15 // небольшая задержка между анимациями каждого элемента
  });

  gsap.from(".our-works-swiper ul li", {
    scrollTrigger: {
      trigger: ".our-works-swiper ul",
      start: "top bottom", // Начало анимации, когда верх списка достигает нижней части вьюпорта
      end: "bottom top",
      toggleActions: "play none none none"
    },
    duration: 1,
    opacity: 0,
    rotation: 90, // начальный угол вращения
    ease: "power3.out", // плавная анимация
    stagger: 0.2 // небольшая задержка между анимациями каждого элемента
  });

  // gsap.from(".our-clients ul li", {
  //   scrollTrigger: {
  //     trigger: ".our-clients ul",
  //     start: "top bottom", // Начало анимации, когда верх списка достигает нижней части вьюпорта
  //     end: "bottom top",
  //     toggleActions: "play none none none"
  //   },
  //   duration: 1,
  //   opacity: 0,
  //   rotation: -90, // начальный угол вращения
  //   ease: "power3.out", // плавная анимация
  //   stagger: 0.2 // небольшая задержка между анимациями каждого элемента
  // });

  gsap.from(".our-clients ul li", {
    scrollTrigger: {
      trigger: ".our-clients ul",
      start: "top bottom", // Начало анимации, когда верх списка достигает нижней части вьюпорта
      end: "bottom top",
      toggleActions: "play none none none"
    },
    duration: 0.8,
    opacity: 0,
    scale: 0.9, // начальный масштаб
    blur: "20px", // начальное размытие
    ease: "power2.out", // плавное изменение
    stagger: 0.1 // задержка между анимациями каждого элемента
  });

  gsap.from(".technical-capabilities-swiper .swiper-slide", {
    scrollTrigger: {
      trigger: ".technical-capabilities__content",
      start: "top bottom", // Начало анимации, когда верх списка достигает нижней части вьюпорта
      end: "bottom top",
      toggleActions: "play none none none"
    },
    duration: 0.7,
    opacity: 0,
    y: 100, // начальное смещение по вертикали
    ease: "power3.out", // плавная анимация
    stagger: 0.15 // небольшая задержка между анимациями каждого элемента
  });

  gsap.from(".contacts__inner", {
    scrollTrigger: {
      trigger: ".contacts",
      start: "top bottom",
      toggleActions: "play none none none"
    },
    x: -200, // начальное смещение по горизонтали
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });
  
  // Анимация для блока с формой
  gsap.from(".contacts__content form", {
    scrollTrigger: {
      trigger: ".contacts",
      start: "top bottom",
      toggleActions: "play none none none"
    },
    x: 200, // начальное смещение по горизонтали
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

})