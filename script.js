// let tl = gsap.timeline(); 

$(document).ready(function () {
    let width = window.innerWidth
    let offset = 768
    scrollmagic()
    if (width > offset) {
        notIniLocationMenu()
        hover()
    } else {
        iniLocationMenu()
        click()
    }
})

gsap.fromTo('.nav-menu-item', {height: 48}, {height: 48})

function hover() {
    $('.nav-menu-item').hover(function () {
        let ownClass = $(this).find('.nav-menu-item-dropdown');
        ownClass.toggleClass('active')
    })
}

function scrollmagic(){
    var controller = new ScrollMagic.Controller();

    let fbtt = $('.fbtt');
    for (let i = 0; i < fbtt.length; i++) {
        let trigger = $(fbtt[i]).data('trigger')
        // console.log(trigger)
        let triggerHook = trigger ? trigger : 0.99
        new ScrollMagic.Scene({triggerElement: fbtt[i]})
            .triggerHook(triggerHook)
            .setClassToggle(fbtt[i], "showup") // add class toggle
            // .addIndicators() // add indicators (requires plugin)
            .addTo(controller);
    }
}

function click() {
    $('.toggle-hamburger').click(function () {
        let hasClass = $(this).hasClass('active')
        $(this).toggleClass('active')
        if (!hasClass) {
            gsap.to('body', {overflow: 'hidden'})
            gsap.to('.nav-menu-item', {visibility: 'visible'})
            gsap.fromTo('.nav-responsive-bg', {left: '-100%'}, {left: 0, duration: 0.3})
            gsap.fromTo('.nav-menu-item', {left: -50, opacity: 0,  visibility: 'hidden'}, {left: 0, duration: 0.3, delay: 0.1, stagger: 0.05, opacity: 1})
            return
        }
        gsap.to('body', {overflow: 'auto'})
        gsap.fromTo('.nav-menu-item', {left: 0, opacity: 1}, { left: -50, opacity: 0, duration: 0.3, stagger: 0.05})
        gsap.fromTo('.nav-responsive-bg', {left: 0}, {left: '-100%',duration: 0.3, delay: 0.4})
        gsap.to('.nav-menu-item', {visibility: 'hidden', delay: 0.5})
    })
    $('.nav-menu-item').click(function () {
        let hasClass = $(this).hasClass('open');
        let index = $(this).index() + 1
        if (hasClass) {
            let height = $(this).height()
            gsap.fromTo(`.nav-menu-item:nth-child(${index})`, {height}, {height: 48, duration: 0.3})
            $(this).removeClass('open')
            return
        }
        $(this).addClass('open')
        gsap.fromTo(`.nav-menu-item:nth-child(${index})`, {height: 48}, {height: "auto", duration: 0.3})
    })
}

function iniLocationMenu(){
    gsap.fromTo('.nav-responsive-bg', {left: '-100%'}, {left: '-100%'})
    gsap.fromTo('.nav-menu-item', {left: -50}, {left: -50, opacity: 0})
}

function notIniLocationMenu(){
    gsap.fromTo('.nav-menu-item', {left: 0}, {left: 0, opacity: 1})
}