// File: animations.js (Refined Aesthetics with fromTo & Backgrounds Enabled)

console.log("Full animations script loaded (Aesthetic Refinements).");

if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    console.log("Full: GSAP & ScrollTrigger registered.");

    document.addEventListener('DOMContentLoaded', () => {
        console.log("Full: DOM loaded.");

        const defaultEase = "expo.out"; // Keep smooth ease
        const defaultDuration = 1.2; // Slightly longer for smoother feel
        const cardDuration = 0.9;
        const cardStagger = 0.1;

        // --- Hero Section Animation (Using fromTo for consistency) ---
        const heroElements = ['#hero-title', '#hero-subtitle', '#hero-button'];
        heroElements.forEach((id, index) => {
            const elem = document.querySelector(id);
            if (elem) {
                gsap.fromTo(elem,
                    { y: 50, opacity: 0, visibility: 'hidden' }, // FROM state
                    { // TO state
                        opacity: 1,
                        visibility: 'visible',
                        y: 0,
                        duration: defaultDuration,
                        ease: defaultEase,
                        delay: 0.2 + index * 0.2 // Stagger hero elements slightly
                    }
                );
            }
        });
        console.log("Full: Hero animations setup using fromTo.");


        // --- General Reveal Animation using fromTo in onEnter ---
        const generalRevealElements = gsap.utils.toArray('.gsap-reveal:not(#hero-title):not(#hero-subtitle):not(#hero-button):not(.service-cards .gsap-reveal):not(.features-grid .gsap-reveal):not(.blog-posts .gsap-reveal):not(footer .grid .gsap-reveal)');
        console.log("Full: Found general elements to reveal:", generalRevealElements);

        if (generalRevealElements.length > 0) {
            generalRevealElements.forEach((elem) => {
                let triggerElement = elem.parentElement && elem.parentElement.tagName !== 'BODY' && elem.parentElement.tagName !== 'MAIN' ? elem.parentElement : elem;
                ScrollTrigger.create({
                    trigger: triggerElement,
                    start: "top bottom-=100px",
                    // markers: true,
                    once: true,
                    onEnter: () => {
                        console.log("Full: General onEnter triggered for:", elem);
                        gsap.fromTo(elem,
                            { y: 40, opacity: 0, visibility: 'hidden' }, // FROM state
                            { // TO state
                                opacity: 1,
                                visibility: 'visible',
                                y: 0,
                                duration: defaultDuration,
                                ease: defaultEase
                            }
                        );
                    }
                });
            });
            console.log("Full: General reveal ScrollTriggers setup using onEnter fromTo.");
        } else {
            console.warn("Full: No elements found for general reveal.");
        }

        // --- Staggered Animation for Specific Grids using fromTo in onEnter ---
        const cardContainers = [
            { selector: ".service-cards", itemSelector: ".gsap-reveal", stagger: cardStagger, addScale: true }, // Add scale for service cards
            { selector: ".features-grid", itemSelector: ".gsap-reveal", stagger: cardStagger, addScale: false },
            { selector: ".blog-posts", itemSelector: ".gsap-reveal", stagger: cardStagger, addScale: true }, // Add scale for blog cards
            { selector: "footer .grid", itemSelector: ".gsap-reveal", stagger: cardStagger, addScale: false }
        ];

        cardContainers.forEach(config => {
            const container = document.querySelector(config.selector);
            if(container) {
                const items = container.querySelectorAll(config.itemSelector);
                console.log(`Full: Found ${items.length} items in ${config.selector}`);
                if(items.length > 0) {
                    ScrollTrigger.create({
                        trigger: container,
                        start: "top bottom-=100px",
                        // markers: true,
                        once: true,
                        onEnter: () => {
                            console.log(`Full: Staggered onEnter triggered for container: ${config.selector}`);
                            gsap.fromTo(items,
                                { // FROM state
                                    y: 40,
                                    opacity: 0,
                                    visibility: 'hidden',
                                    scale: config.addScale ? 0.95 : 1 // Start slightly smaller if addScale is true
                                },
                                { // TO state
                                    opacity: 1,
                                    y: 0,
                                    visibility: 'visible',
                                    scale: 1, // End at normal size
                                    duration: cardDuration,
                                    ease: defaultEase,
                                    stagger: config.stagger
                                }
                            );
                        }
                    });
                    console.log(`Full: Staggered reveal setup for ${config.selector} using fromTo.`);
                }
            } else {
                console.warn(`Full: Container '${config.selector}' not found for staggered animation.`);
            }
        });

        // --- Subtle Hover Animations (Keep as is, triggered on reveal) ---
         const hoverCards = gsap.utils.toArray('.service-cards .gsap-reveal, .blog-posts .gsap-reveal');
         if(hoverCards.length > 0){
             hoverCards.forEach(card => {
                 ScrollTrigger.create({
                     trigger: card.parentElement,
                     start: "top bottom-=100px",
                     once: true,
                     onEnter: () => {
                          if (!card.dataset.hoverListenersAdded) {
                              console.log('Full: Adding hover to card:', card);
                              card.addEventListener('mouseenter', () => {
                                  gsap.to(card, { duration: 0.3, y: -5, ease: 'power2.out', overwrite: 'auto' });
                              });
                              card.addEventListener('mouseleave', () => {
                                  gsap.to(card, { duration: 0.3, y: 0, ease: 'power2.out', overwrite: 'auto' });
                              });
                              card.dataset.hoverListenersAdded = 'true';
                          }
                     }
                 });
             });
             console.log("Full: Hover animation setup (listeners added on reveal).");
          }

    }); // End DOMContentLoaded

} else {
    console.error("Full: GSAP or ScrollTrigger not loaded!");
}