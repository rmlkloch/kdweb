// File: three-background.js

function initThreeBackground() {
    const container = document.getElementById('three-canvas-container');
    if (!container) {
        console.error("Three.js container not found");
        return;
    }

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); // alpha: true for transparent background
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Geometry and Material (Example: Simple rotating cubes)
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5); // Smaller cubes
    const material = new THREE.MeshStandardMaterial({
        color: 0xaa88ff, // Purple shade
        roughness: 0.5,
        metalness: 0.3
     });

    const shapes = [];
    const shapeCount = 50; // Number of shapes

    for (let i = 0; i < shapeCount; i++) {
        const mesh = new THREE.Mesh(geometry, material);

        // Random positions within a larger area
        mesh.position.x = (Math.random() - 0.5) * 20;
        mesh.position.y = (Math.random() - 0.5) * 20;
        mesh.position.z = (Math.random() - 0.5) * 10 - 5; // Depth

        // Random rotations
        mesh.rotation.x = Math.random() * Math.PI * 2;
        mesh.rotation.y = Math.random() * Math.PI * 2;

        // Random scales
         const scale = Math.random() * 0.5 + 0.3; // Varying sizes
         mesh.scale.set(scale, scale, scale);


        scene.add(mesh);
        shapes.push(mesh);
    }

     // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);


    // Handle Window Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

     // Follow mouse slightly (optional subtle effect)
    let mouseX = 0, mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.001; // Adjust multiplier for sensitivity
        mouseY = (event.clientY - windowHalfY) * 0.001;
    });


    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate shapes
        shapes.forEach((shape, index) => {
            shape.rotation.x += 0.001 + index * 0.00005; // Vary speeds slightly
            shape.rotation.y += 0.002 + index * 0.00003;
        });

        // Move camera slightly based on mouse position
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05; // Inverted Y
        camera.lookAt(scene.position); // Ensure camera always looks at the center


        renderer.render(scene, camera);
    }

    animate();
}

// Initialize after the DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThreeBackground);
} else {
    initThreeBackground();
}