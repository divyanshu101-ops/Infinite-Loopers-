
function homepage(){
    gsap.set(".slidesm",{scale:5})

var tl=gsap.timeline({
    scrollTrigger:{
        trigger:".home",
        start:"top top",
        end:"bottom top",
       pin:true,
        scrub:1.5
    },
})
tl
.to(".vdodiv",{
    '--clap':"0%",
    ease:Power2
   },'a')
.to(".slidesm",{
    scale:1,
    ease:Power2,
},'a')
.to(".lft",{
    xPercent:-20,
    stagger:0.03,
    ease:Power4
},'b')
.to(".rgt",{
    xPercent:20,
    stagger:0.03,
    ease:Power4
},'b')

}
function team(){
    document.querySelectorAll(".listelem")
.forEach(function(el){
    el.addEventListener("mousemove",function(dets){
       
        gsap.to(this.querySelector(".picture"),{opacity:1,x: gsap.utils.mapRange(0, window.innerWidth,-200,200,dets.clientX),ease:Power4,duration:0.1})
    })
    el.addEventListener("mouseleave",function(dets){
        gsap.to(this.querySelector(".picture"),{opacity:0,ease:Power4,duration:0.1})
    })
})
}
function loco(){
    (function () {
        const locomotiveScroll = new LocomotiveScroll();
    })();
}
function capanime(){
    gsap.to(".capsules:nth-child(2)",{
        scrollTrigger:{
            trigger:".capsule",
            start:"top 70%",
            end:"bottom bottom",
            scrub: 1
        },
        y: 0,
        ease: Power4
    }) 
}
document.querySelectorAll(".sec")
.forEach(function(e){
    ScrollTrigger.create({
        trigger: e,
        start: "bottom bottom",
        onEnter: function(){
            document.body.setAttribute("theme",e.dataset.color);
        },
        onEnterBack: function(){
            document.body.setAttribute("theme",e.dataset.color);
        }
    })
})
loco();
homepage();
team();
capanime();
