// File: p5-sketch.js

function sketch(p) {
    let particles = [];
    const numParticles = 100;

    p.setup = function() {
        const container = document.getElementById('p5-sketch-container');
        if (!container) {
            console.error("p5 container not found");
            return;
        }
        // Create canvas matching container size
        let cnv = p.createCanvas(container.offsetWidth, container.offsetHeight);
        cnv.parent('p5-sketch-container'); // Attach canvas to the container
        cnv.style('display', 'block'); // Ensure canvas takes up space correctly

        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle(p.random(p.width), p.random(p.height), p));
        }
        p.stroke(200, 150, 255, 30); // Subtle purple lines with alpha
        p.strokeWeight(1);
    };

    p.draw = function() {
        // Don't clear background for trails effect, or use a low alpha background
        // p.background(248, 249, 250, 5); // Very subtle background clear for fading trails

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

    // Particle class
    class Particle {
        constructor(x, y, p) {
            this.p = p; // Reference to p5 instance
            this.pos = this.p.createVector(x, y);
            this.vel = p5.Vector.random2D().mult(this.p.random(0.5, 1.5)); // Random velocity
            this.acc = this.p.createVector(0, 0);
            this.maxSpeed = 1; // Limit speed
            this.history = []; // To draw trails
        }

        update() {
            // Simple perlin noise flow field
            let angle = this.p.noise(this.pos.x * 0.005, this.pos.y * 0.005) * this.p.TWO_PI * 2;
            let force = p5.Vector.fromAngle(angle);
            force.mult(0.05); // Strength of the flow field
            this.acc.add(force);


            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed);
            this.pos.add(this.vel);
            this.acc.mult(0); // Reset acceleration

             // Add current position to history
            this.history.push(this.pos.copy());
            // Limit history length
            if (this.history.length > 30) { // Trail length
                this.history.splice(0, 1);
            }
        }

        show() {
             // Draw trail
             this.p.beginShape();
             this.p.noFill();
             for (let i = 0; i < this.history.length; i++) {
                let pos = this.history[i];
                 this.p.vertex(pos.x, pos.y);
             }
             this.p.endShape();

            // Draw particle itself (optional, can be just trails)
            // this.p.fill(200, 150, 255, 50);
            // this.p.noStroke();
            // this.p.ellipse(this.pos.x, this.pos.y, 2, 2);
        }

        edges() {
             // Wrap around edges
             if (this.pos.x > this.p.width) { this.pos.x = 0; this.history = []; }
             if (this.pos.x < 0) { this.pos.x = this.p.width; this.history = []; }
             if (this.pos.y > this.p.height) { this.pos.y = 0; this.history = []; }
             if (this.pos.y < 0) { this.pos.y = this.p.height; this.history = []; }
        }
    }
}

// Initialize p5.js sketch in instance mode
if (typeof p5 !== 'undefined') {
     let myp5 = new p5(sketch);
} else {
    console.error("p5.js library not loaded.");
}