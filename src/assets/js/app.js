import * as Modals from './modals.js';

import { initializeSwiper } from './swiperSetups.js';

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

  const headerModal = new Modals.Modal("#header-modal")
  const applicationModal = new Modals.Modal("#application-modal")
  const thanksModal = new Modals.Modal("#thanks-modal")
  const propositionModal = new Modals.Modal("#proposition-modal")
  const closeModal = new Modals.Modal("#close-modal")

  initializeSwiper();

  let prevScrollPosition = window.pageYOffset;
  let header = document.querySelector('header');
  let headerHeight = header.offsetHeight;
  let page = document.querySelector('.page')
  page.style.paddingTop = `${headerHeight}px`;

  window.onscroll = function () {
    let currentScrollPosition = window.pageYOffset;

    if (prevScrollPosition > currentScrollPosition || currentScrollPosition < 100) {
      header.style.top = "0";
    } else {
      header.style.top = `-${headerHeight}px`;
    }

    prevScrollPosition = currentScrollPosition;
  };

  let textElement = document.querySelector(".title-block__title h1");
  function typeAnimation(event) {

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

  if (textElement) {
    typeAnimation()
  }

  const counters = document.querySelectorAll('.title-block__info-inner div p:first-child');

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');

    const updateCounter = () => {
      const current = +counter.textContent;
      const increment = target / 1000;

      if (current < target) {
        counter.textContent = `${Math.ceil(current + increment)}`;
        setTimeout(updateCounter, 0);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });



  const blogVideo = document.querySelector('.blog__video-inner video');
  const muteButton = document.querySelector('.mute-ico');
  const unmuteButton = document.querySelector('.unmute-ico');

  if (muteButton) {
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
  }

  const mainVideos = document.querySelectorAll('.title-block__video video');
  const playButtons = document.querySelectorAll('.title-block__video button');
  
  mainVideos.forEach((video, index) => {
    const playButton = playButtons[index];
    if (playButton) {
      playButton.addEventListener('click', function () {
        video.play();
        video.controls = true;
        playButton.style.display = 'none';
      });
    }
  });

  const prodVideo = document.querySelector('.production__video video');
  const prodPlayButton = document.querySelector('.production__video button');

  if (prodPlayButton) {
    prodPlayButton.addEventListener('click', function () {
      prodVideo.play();
      prodVideo.controls = true;
      prodPlayButton.style.display = 'none';
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

  if (window.matchMedia("(min-width: 1024px)").matches) {
    gsap.from(".package-types ul li", {
      scrollTrigger: {
        trigger: ".package-types ul",
        start: "top 75%",
        end: "bottom top",
        toggleActions: "play none none none"
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
        start: "top 80%",
        end: "bottom top",
        toggleActions: "play none none none"
      },
      duration: 1.2,
      opacity: 0,
      scale: 0.5,
      transformOrigin: "center",
      ease: "elastic.out(1, 0.75)",
      stagger: 0.1
    });

    gsap.from(".why-us ul li", {
      scrollTrigger: {
        trigger: ".why-us ul",
        start: "top 90%",
        end: "bottom top",
        toggleActions: "play none none none"
      },
      duration: 1,
      x: (index, target) => {
        return index % 2 === 0 ? -200 : 200;
      },
      opacity: 0,
      ease: "power3.out",
      stagger: 0.2
    });


    gsap.from(".addition ul li", {
      scrollTrigger: {
        trigger: ".addition ul",
        start: "top 60%",
        end: "bottom top",
        toggleActions: "play none none none"
      },
      duration: 0.7,
      opacity: 0,
      y: 50,
      ease: "power1.out",
      stagger: 0.15
    });

    gsap.from(".our-works-swiper ul li", {
      scrollTrigger: {
        trigger: ".our-works-swiper ul",
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play none none none"
      },
      duration: 1,
      opacity: 0,
      rotation: 90,
      ease: "power3.out",
      stagger: 0.2
    });

    gsap.from(".our-clients ul li", {
      scrollTrigger: {
        trigger: ".our-clients ul",
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play none none none"
      },
      duration: 0.8,
      opacity: 0,
      scale: 0.9,
      blur: "20px",
      ease: "power2.out",
      stagger: 0.1
    });

    gsap.from(".technical-capabilities-swiper .swiper-slide", {
      scrollTrigger: {
        trigger: ".technical-capabilities__content",
        start: "top 70%",
        end: "bottom top",
        toggleActions: "play none none none"
      },
      duration: 0.7,
      opacity: 0,
      y: 100,
      ease: "power3.out",
      stagger: 0.15
    });

    gsap.from(".contacts__inner", {
      scrollTrigger: {
        trigger: ".contacts",
        start: "top 50%",
        toggleActions: "play none none none"
      },
      y: -200,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Анимация для блока с формой
    gsap.from(".contacts__content form", {
      scrollTrigger: {
        trigger: ".contacts",
        start: "top 50%",
        toggleActions: "play none none none"
      },
      y: 200,
      opacity: 0,
      duration: 1,
      delay: 0.4,
      ease: "power3.out"
    });

    gsap.from(".innovations ul li", {
      opacity: 0,
      y: 50,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".innovations__content",
        start: "top 80%",
        end: "bottom top",
        toggleActions: "play none none none"
      }
    });

    gsap.from(".innovations__img", {
      opacity: 0,
      x: -50,
      duration: 1,
      scrollTrigger: {
        trigger: ".innovations__content",
        start: "top 80%",
        end: "bottom top",
        toggleActions: "play none none none"
      }
    });

    const path = document.querySelector('.line-svg path');
    if (path) {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    }

    function animateLine() {
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.5
      });
    }

    gsap.to('.blog__content', {
      scrollTrigger: {
        trigger: '.blog__content',
        start: 'top center',
        end: 'bottom top',
        onEnter: () => animateLine(),
        onEnterBack: () => animateLine(),
        once: true
      }
    });


    const pathTop = document.querySelector('.stages-line path');

    if (pathTop) {
      const lengthTop = pathTop.getTotalLength();

      pathTop.style.strokeDasharray = lengthTop;
      pathTop.style.strokeDashoffset = lengthTop;
    }

    function animateTopPart() {
      gsap.to(pathTop, {
        strokeDashoffset: 0,
        duration: 2.5
      });
    }

    gsap.to('.stages ul', {
      scrollTrigger: {
        trigger: '.stages ul',
        start: "top 80%",
        onEnter: () => animateTopPart(),
        onEnterBack: () => animateTopPart(),
      }
    });




    const order = [1, 2, 3, 6, 5, 4];

    order.forEach((num, i) => {
      const li = document.querySelector(`.stages ul li:nth-child(${num + 1})`);

      gsap.fromTo(li,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.stages ul',
            start: "top 80%",
            toggleActions: "play none none none"
          },
          delay: i * 0.3
        }
      );
    });

  }

  function getRandomDirection() {
    var angle = Math.random() * 360;
    return angle;
  }

  function getRandomVelocity() {
    var minVelocity = 1;
    var maxVelocity = 3;
    var velocity = Math.random() * (maxVelocity - minVelocity) + minVelocity;
    return velocity;
  }

  function checkCollision(element, otherElements) {
    var elementRect = element.getBoundingClientRect();

    for (var i = 0; i < otherElements.length; i++) {
      var otherRect = otherElements[i].getBoundingClientRect();

      if (
        element !== otherElements[i] &&
        elementRect.right >= otherRect.left &&
        elementRect.left <= otherRect.right &&
        elementRect.bottom >= otherRect.top &&
        elementRect.top <= otherRect.bottom
      ) {
        return true;
      }
    }

    return false;
  }

  function animateElement(containerSelector, elementSelector) {
    var containers = document.querySelectorAll(containerSelector);
    if (!containers.length) {
      console.warn(`No containers found for ${containerSelector}.`);
      return;
    }

    containers.forEach(function (container) {
      var elements = container.querySelectorAll(elementSelector);
      if (!elements.length) {
        console.warn(`No elements found for ${elementSelector} inside ${containerSelector}.`);
        return;
      }

      elements.forEach(function (element) {
        var containerRect = container.getBoundingClientRect();
        var elementRect = element.getBoundingClientRect();

        var containerWidth = containerRect.width - elementRect.width;
        var containerHeight = containerRect.height - elementRect.height;

        var posX = 0;
        var posY = 0;
        var direction = getRandomDirection();
        var velocity = getRandomVelocity();
        var isColliding = false;

        var animationInterval = setInterval(function () {
          var radians = direction * Math.PI / 180;
          var deltaX = velocity * Math.cos(radians);
          var deltaY = velocity * Math.sin(radians);

          posX += deltaX;
          posY += deltaY;

          if (posX < 0 || posX > containerWidth) {
            direction = (180 - direction) % 360;
          }
          if (posY < 0 || posY > containerHeight) {
            direction = (360 - direction) % 360;
          }

          if (checkCollision(element, elements)) {
            if (!isColliding) {
              direction = (direction + 180) % 360;
            }
            isColliding = true;
          } else {
            isColliding = false;
          }

          element.style.transform = `translate(${posX}px, ${posY}px)`;
        }, 30);
      });
    });
  }

  animateElement('.why-us .rotation-card', '.rotation-card__background');
  animateElement('.innovations', '.innovations__background');


  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;


      this.querySelectorAll('input, textarea, select').forEach(input => {
        if (!input.value) {
          input.classList.add('error');
          isValid = false;
        } else {
          input.classList.remove('error');
        }
      });

      if (isValid) {
        applicationModal.close()
        propositionModal.close()
        closeModal.close()
        thanksModal.open()
        const formData = new FormData(this);

        fetch('send.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.text())
          .then(data => {
          })
          .catch(error => console.error('Error:', error));
      }
    });
  });

  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

  var dropbtns = document.getElementsByClassName("accordion");

  for (var i = 0; i < dropbtns.length; i++) {
    dropbtns[i].clicks = 0;

    dropbtns[i].addEventListener("click", function (event) {
      this.clicks++;
      if (this.clicks < 2) {
        event.preventDefault();
      } else {
        this.clicks = 0;
      }
    });
  }

  let closeModalZone = document.querySelector('.close-modal__zone')



  if (window.matchMedia("(min-width: 1024px)").matches) {
    closeModalZone.addEventListener('mouseover', e => {
      closeModal.open()
    })
  }

  function applyPhoneMask(value) {
    // Удаляем все кроме цифр и специальных символов (+, -, (), и пробелов)
    var cleaned = value.replace(/[^\d\+\-\(\) ]/g, '');

    // Применяем маску для форматирования (можно модифицировать в соответствии с нужным форматом)
    var match = cleaned.match(/^(\+\d{1,3}|\d)?[ ]?(\(?\d{3}\)?)?[ ]?(\d{3})?[ ]?(\d{2,4})?$/);

    if (match) {
      // Собираем номер из различных групп, игнорируя undefined группы
      return [match[1], match[2], match[3], match[4]].filter(Boolean).join(' ');
    }

    return cleaned; // Возвращаем отфильтрованное значение
  }

  function applyEmailMask(input) {
    // Фильтрация ввода: удаляем символы, не соответствующие стандарту ASCII
    input.value = input.value.replace(/[^\x00-\x7F]/g, '');

    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (regex.test(input.value)) {
      input.classList.add('valid-email');
      input.classList.remove('invalid-email');
    } else {
      input.classList.add('invalid-email');
      input.classList.remove('valid-email');
    }
  }

  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function () {
      this.value = applyPhoneMask(this.value);
    });
  });

  document.querySelectorAll('input[type=email]').forEach(input => {
    input.addEventListener('input', function () {
      applyEmailMask(this);
    });
  });
})