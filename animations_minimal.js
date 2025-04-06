// File: animations_minimal.js (Using gsap.to and callbacks)

console.log("Minimal animations script loaded.");

if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    console.log("Minimal: GSAP & ScrollTrigger registered.");

    document.addEventListener('DOMContentLoaded', () => {
        console.log("Minimal: DOM loaded.");

        const elementsToReveal = gsap.utils.toArray('.gsap-reveal-test');
        console.log("Minimal: Found elements:", elementsToReveal);

        if (elementsToReveal.length > 0) {
            elementsToReveal.forEach(elem => {

                // Create the ScrollTrigger instance
                ScrollTrigger.create({
                    trigger: elem,
                    start: "top bottom-=100px",
                    markers: true, // <<<--- KEEP MARKERS ENABLED
                    once: true, // Only trigger once
                    // Callback when the start point enters the viewport
                    onEnter: () => {
                        console.log("Minimal: onEnter triggered for:", elem); // Log when triggered
                        // Use gsap.to to animate TO the visible state
                        gsap.to(elem, {
                            opacity: 1,
                            visibility: 'visible',
                            y: 0, // Animate to y: 0
                            duration: 1,
                            ease: "power3.out",
                            stagger: 0.2, // Apply stagger here if needed for multiple elements within a loop
                            // Callback when this specific animation completes
                            onComplete: () => {
                                console.log("Minimal: Animation completed for:", elem); // Log when animation finishes
                            }
                        });
                    },
                     // Optional: Callback if it leaves scrolling back up (if once: false)
                     // onLeaveBack: () => { console.log("Minimal: onLeaveBack triggered for:", elem); }
                });
            });
            console.log("Minimal: ScrollTrigger setup complete using onEnter callback.");
        } else {
            console.log("Minimal: No elements found with .gsap-reveal-test class.");
        }
    });

} else {
    console.error("Minimal: GSAP or ScrollTrigger not loaded!");
}