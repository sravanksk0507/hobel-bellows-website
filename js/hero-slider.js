const swiper = new Swiper(".heroSwiper", {
  loop: true,
  effect: "fade",
  speed: 900,

  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  on: {
    init: function () {
      controlVideo(this);
    },
    slideChangeTransitionStart: function () {
      controlVideo(this);
    }
  }
});

function controlVideo(swiper){

  // stop all videos
  document.querySelectorAll('.hero-video').forEach(video=>{
    video.pause();
    video.currentTime = 0;
  });

  const activeSlide = swiper.slides[swiper.activeIndex];
  const video = activeSlide.querySelector("video");

  if(video){
    swiper.autoplay.stop();

    video.play();

    video.onended = ()=>{
      swiper.slideNext();
      swiper.autoplay.start();
    }
  }else{
    swiper.autoplay.start();
  }
}
const heroSection = document.querySelector(".hero");
const nextBtn = document.querySelector(".swiper-button-next");
const prevBtn = document.querySelector(".swiper-button-prev");

heroSection.addEventListener("mousemove", (e)=>{

    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    const leftZone = width * 0.10;
    const rightZone = width * 0.90;

    prevBtn.style.opacity = (x <= leftZone) ? "1" : "0";
    nextBtn.style.opacity = (x >= rightZone) ? "1" : "0";
});

heroSection.addEventListener("mouseleave", ()=>{
    nextBtn.style.opacity="0";
    prevBtn.style.opacity="0";
});

document.querySelectorAll(".hero-video").forEach(video=>{
    video.addEventListener("ended", ()=>{
        swiper.slideNext();
    });
});