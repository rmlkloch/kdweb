// File: three-background.js (Updated Color)

function initThreeBackground() {
    const container = document.getElementById('three-canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6; // Slightly further back

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Geometry (Maybe use something more elegant like TorusKnot or Icosahedron?)
    // const geometry = new THREE.TorusKnotGeometry(0.3, 0.1, 100, 16);
    const geometry = new THREE.IcosahedronGeometry(0.3, 0); // Simple platonic solid

    // Material - Using shades of grey and maybe a hint of gold reflection
    const material = new THREE.MeshStandardMaterial({
        color: 0xaaaaaa, // Light Grey color for shapes
        roughness: 0.6,
        metalness: 0.4, // Gives a metallic sheen
        flatShading: true // Gives a low-poly modern look
    });
     const goldMaterial = new THREE.MeshStandardMaterial({
        color: 0xC0A080, // Gold Accent Color
        roughness: 0.4,
        metalness: 0.7,
        flatShading: true
    });


    const shapes = [];
    const shapeCount = 40; // Reduced count for subtlety

    for (let i = 0; i < shapeCount; i++) {
        // Use gold for a small percentage of shapes
        const currentMaterial = Math.random() < 0.1 ? goldMaterial : material; // 10% chance of gold
        const mesh = new THREE.Mesh(geometry, currentMaterial);

        mesh.position.x = (Math.random() - 0.5) * 25;
        mesh.position.y = (Math.random() - 0.5) * 25;
        mesh.position.z = (Math.random() - 0.5) * 15 - 5;

        mesh.rotation.x = Math.random() * Math.PI * 2;
        mesh.rotation.y = Math.random() * Math.PI * 2;

        const scale = Math.random() * 0.6 + 0.2; // Smaller scales
        mesh.scale.set(scale, scale, scale);

        scene.add(mesh);
        shapes.push(mesh);
    }

    // Lights (Adjust intensity for dark theme)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Lower intensity ambient
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 0.5); // Point light for highlights
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

     const pointLight2 = new THREE.PointLight(0xC0A080, 0.3); // Subtle gold light
    pointLight2.position.set(-10, -5, 5);
    scene.add(pointLight2);


    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    let mouseX = 0, mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.0005; // Less sensitive mouse follow
        mouseY = (event.clientY - windowHalfY) * 0.0005;
    });

    function animate() {
        requestAnimationFrame(animate);
        const time = Date.now() * 0.0001; // Time factor for slow movement

        shapes.forEach((shape, index) => {
            shape.rotation.x += 0.0005 + index * 0.00002;
            shape.rotation.y += 0.001 + index * 0.00001;
             // Optional: Add subtle up/down movement
             // shape.position.y += Math.sin(time + index) * 0.005;
        });

        camera.position.x += (mouseX - camera.position.x) * 0.03;
        camera.position.y += (-mouseY - camera.position.y) * 0.03;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animate();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThreeBackground);
} else {
    initThreeBackground();
}