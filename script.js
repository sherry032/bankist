'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScollTo = document.querySelector(".btn--scroll-to")
const section1 = document.querySelector("#section--1")
const nav = document.querySelector(".nav")

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(item => item.addEventListener('click', openModal))
 

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const header = document.querySelector("header")
const message = document.createElement("div")
message.classList.add("cookie-message")
message.innerHTML = `We use cookies<button class="btn btn--close-cookie">Got it</button>`
header.append(message)
document.querySelector(".btn--close-cookie").addEventListener("click", function(){
  message.remove()
})

message.style.backgroundColor = "black"
message.style.width = "120%"
message.style.height = Number.parseFloat(getComputedStyle(message).height) + 20 + "px"


btnScollTo.addEventListener("click", function(){
  const s1coords = section1.getBoundingClientRect() 

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // })
 section1.scrollIntoView({behavior: "smooth"})
})

// document.querySelectorAll(".nav__link").forEach(el => el.addEventListener("click", function(e){
//   e.preventDefault()
//   const href = this.getAttribute("href")
//   console.log(href);
//   document.querySelector(href).scrollIntoView({behavior: "smooth"})
// }))
document.querySelector(".nav__links").addEventListener("click", function(e){
  e.preventDefault()

  if(e.target.classList.contains("nav__link")){
  const href = e.target.getAttribute("href")
  document.querySelector(href).scrollIntoView({behavior: "smooth"})
}})

const tabs = document.querySelectorAll(".operations__tab")
const tabsContainer = document.querySelector(".operations__tab-container")
const contents = document.querySelectorAll(".operations__content")

tabsContainer.addEventListener("click", function(e){
  const clicked = e.target.closest(".operations__tab")
  if(!clicked) return;
  tabs.forEach(t => t.classList.remove("operations__tab--active"))
  clicked.classList.add("operations__tab--active")
  contents.forEach(c => c.classList.remove("operations__content--active"))
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active")
})

const handleOpacity = function(e){
  const link = e.target
   if(link.classList.contains("nav__link")){
     const siblings = link.closest(".nav").querySelectorAll(".nav__link")
     const logo = link.closest(".nav").querySelector("img")
     siblings.forEach(el => {
       if(el !== link) el.style.opacity = this
      })
     logo.style.opacity = this
}
}

nav.addEventListener("mouseover", 
   handleOpacity.bind(0.5))

nav.addEventListener("mouseout", handleOpacity.bind(1))

const sec1coords = section1.getBoundingClientRect()

// window.addEventListener("scroll", function(){ 
//   // console.log(this.window.scrollY);

//   if(this.window.scrollY > sec1coords.top)
//   nav.classList.add("sticky")
//   else nav.classList.remove("sticky")
// })

const navHeigtht = nav.getBoundingClientRect().height

const stickyNav = function(entries, observer){ 
  const [entry] = entries
  !entry.isIntersecting ? nav.classList.add("sticky") : nav.classList.remove("sticky")
}
const obsOption = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeigtht}px`,
}


const headerObserver = new IntersectionObserver(stickyNav, obsOption)
headerObserver.observe(header)

const secs = document.querySelectorAll(".section")

const secHidden = function(entries, observer){
  const [entry] = entries
  if(!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden")
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(secHidden, {
  root: null,
  threshold: 0.15
})


secs.forEach(sec => {
  sectionObserver.observe(sec)
  sec.classList.add("section--hidden")

}
  )

const lazyImg = document.querySelectorAll("img[data-src]")

const loadImg = function(entries, observer){
 const [entry] = entries
 if(!entry.isIntersecting) return;
 entry.target.src = entry.target.dataset.src
 entry.target.addEventListener("load", function(){
  entry.target.classList.remove("lazy-img")
 })
 observer.unobserve(entry.target)
} 

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px"
})

lazyImg.forEach(img =>{
  imgObserver.observe(img)
})

const slides = document.querySelectorAll(".slide")
// const slider = document.querySelector(".slider")
// slider.style.transform = `scale(0.5)`
// slider.style.overflow = "visible"

const dotsContainer = document.querySelector(".dots")

slides.forEach((s, i) =>{
  dotsContainer.insertAdjacentHTML("beforeEnd",`<div class="dots__dot" data-slide=${i}></div>`)
})

const dots = document.querySelectorAll(".dots__dot")

let curSlide = 0
const maxSlide = slides.length - 1
const btnLeft = document.querySelector(".slider__btn--left")

const btnRight = document.querySelector(".slider__btn--right")

const goToSlide = function(slide){
  slides.forEach((s, i) =>{
    s.style.transform = `translateX(${(i - slide)*100}%)`
  })
}
goToSlide(0)
const nextSlide = function(){
  if(curSlide === maxSlide){
    curSlide = 0
  }else{
    curSlide++
  }
 goToSlide(curSlide)
 activeDot(curSlide)
}

const preSlide = function(){
  if(curSlide === 0){
    curSlide = maxSlide
  }else{
    curSlide--
  } 
  goToSlide(curSlide)
  activeDot(curSlide)
}

const activeDot = function(slide){
  dots.forEach(dot =>{
       dot.classList.remove("dots__dot--active")
      document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active")
})
}
activeDot(0)
btnRight.addEventListener("click", nextSlide)

btnLeft.addEventListener("click", preSlide)

document.addEventListener("keydown", function(e){
  if(e.key === 'ArrowLeft') preSlide()
  if(e.key === 'ArrowRight') nextSlide()
})
 

dotsContainer.addEventListener("click", function(e){
  console.log(e.target.dataset.slide);
    if(e.target.classList.contains("dots__dot")){
      const { slide } = e.target.dataset
      console.log(slide);
      goToSlide(slide)
      activeDot(Number(e.target.dataset.slide))
    }

    }

  )

