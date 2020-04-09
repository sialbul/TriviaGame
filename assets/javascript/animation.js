gsap.set("#container2", { scale: 0.9, });

gsap.timeline()
    .from("#container2", { duration: 0.2, opacity: 0, ease: "back" })
    .from(".gameOptions", { yPercent: 460, stagger: 0.1, duration: 0.8, ease: "back" })
    .from("#triviaGame", { yPercent: -400, duration: 0.8 })