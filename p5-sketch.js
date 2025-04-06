// File: p5-sketch.js (Updated Colors)

function sketch(p) {
    let particles = [];
    const numParticles = 80; // Reduced particles for subtlety

    p.setup = function() {
        const container = document.getElementById('p5-sketch-container');
        if (!container) return;
        let cnv = p.createCanvas(container.offsetWidth, container.offsetHeight);
        cnv.parent('p5-sketch-container');
        cnv.style('display', 'block');

        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle(p.random(p.width), p.random(p.height), p));
        }
        // Subtle grey lines for dark theme
        p.stroke(100, 100, 100, 15); // Grey color with very low alpha
        p.strokeWeight(1);
        // Optional: Add a very rare gold particle stroke
        // if (p.random(1) < 0.01) p.stroke(192, 160, 128, 20);
    };

    p.draw = function() {
         // Very subtle background clear to prevent too much buildup
         // p.background(26, 26, 26, 2); // Match body bg with low alpha

        particles.forEach(particle => {
            particle.update();
            particle.show();
            particle.edges();
        });
    };

    p.windowResized = function() {
       const container = document.getElementById('p5-sketch-container');
        if (container) {
            p.resizeCanvas(container.offsetWidth, container.offsetHeight);
        }
    }

    class Particle {
        constructor(x, y, p) {
            this.p = p;
            this.pos = this.p.createVector(x, y);
            this.vel = p5.Vector.random2D().mult(this.p.random(0.3, 0.8)); // Slower particles
            this.acc = this.p.createVector(0, 0);
            this.maxSpeed = 0.8;
            this.history = [];
        }

        update() {
            let angle = this.p.noise(this.pos.x * 0.003, this.pos.y * 0.003) * this.p.TWO_PI * 2;
            let force = p5.Vector.fromAngle(angle);
            force.mult(0.03);
            this.acc.add(force);

            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed);
            this.pos.add(this.vel);
            this.acc.mult(0);

            this.history.push(this.pos.copy());
            if (this.history.length > 20) { // Shorter trails
                this.history.splice(0, 1);
            }
        }

        show() {
            this.p.beginShape();
            this.p.noFill();
            // Optional: Vary stroke alpha based on history position for fading effect
            for (let i = 0; i < this.history.length; i++) {
                let pos = this.history[i];
                 // let alpha = p.map(i, 0, this.history.length, 0, 15); // Map alpha
                 // p.stroke(100, 100, 100, alpha); // Apply dynamic alpha
                this.p.vertex(pos.x, pos.y);
            }
             // Reset stroke for next particle if dynamically changed
             // p.stroke(100, 100, 100, 15);
            this.p.endShape();
        }

        edges() {
            if (this.pos.x > this.p.width + 10) { this.pos.x = -10; this.history = []; }
            if (this.pos.x < -10) { this.pos.x = this.p.width + 10; this.history = []; }
            if (this.pos.y > this.p.height + 10) { this.pos.y = -10; this.history = []; }
            if (this.pos.y < -10) { this.pos.y = this.p.height + 10; this.history = []; }
        }
    }
}

if (typeof p5 !== 'undefined') {
    let myp5 = new p5(sketch);
} else {
    console.error("p5.js library not loaded.");
}