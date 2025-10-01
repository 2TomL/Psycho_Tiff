// butterflies.js
// 3D vlinders die uit het formulier vliegen na uitrollen + navbar vlinder

// --- Configuratie ---
const BUTTERFLY_TEXTURES = [
  'assets/butterflies/vlin-b-gr.png'
];
const BUTTERFLY_COUNT = 8;

// --- Butterfly logica ---
let butterflies = [], scene, camera, renderer, butterflyTextures = [], animationStarted = false;

// --- Navbar butterfly ---
let navbarButterflyMesh, navbarButterflyFlying = false, navbarButterflyStartTime = null;

function clearButterflies() {
  if (scene && butterflies.length) {
    butterflies.forEach(b => scene.remove(b.mesh));
    butterflies = [];
  }
}

function loadButterflyTextures(callback) {
  let loaded = 0;
  const loader = new THREE.TextureLoader();
  console.log('Butterfly: Loading textures:', BUTTERFLY_TEXTURES);
  
  BUTTERFLY_TEXTURES.forEach((src, i) => {
    loader.load(
      src, 
      tex => {
        console.log('Butterfly: Texture loaded successfully:', src);
        butterflyTextures[i] = tex;
        loaded++;
        if (loaded === BUTTERFLY_TEXTURES.length) {
          console.log('Butterfly: All textures loaded, calling callback');
          callback();
        }
      },
      undefined,
      error => {
        console.error('Butterfly: Error loading texture:', src, error);
      }
    );
  });
}

function createButterfly(texture, startPos) {
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide
  });
  // Kleiner formaat
  const geometry = new THREE.PlaneGeometry(0.8, 0.6);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(startPos);
  mesh.visible = false; // pas tonen na uitrollen
  return { mesh, velocity: new THREE.Vector3(), time: 0, flying: false };
}

function createNavbarButterfly() {
  console.log('Butterfly: Creating navbar butterfly, textures loaded:', butterflyTextures.length);
  if (!butterflyTextures[0]) {
    console.error('Butterfly: No texture available for navbar butterfly');
    return;
  }
  
  const material = new THREE.MeshBasicMaterial({
    map: butterflyTextures[0], // gebruik de eerste texture (vlin-b-gr.png)
    transparent: true,
    side: THREE.DoubleSide
  });
  const geometry = new THREE.PlaneGeometry(1.2, 0.9); // Groter formaat voor betere zichtbaarheid
  navbarButterflyMesh = new THREE.Mesh(geometry, material);
  
  // Startpositie: onder de navbar, aan de linkerkant
  navbarButterflyMesh.position.set(-8, 2, -5); // Z negatief zodat het onder de navbar is
  navbarButterflyMesh.visible = false;
  scene.add(navbarButterflyMesh);
  console.log('Butterfly: Navbar butterfly created and added to scene (under navbar)');
}

function startNavbarButterflyFlight() {
  console.log('Butterfly: startNavbarButterflyFlight called, mesh exists:', !!navbarButterflyMesh);
  if (!navbarButterflyMesh) {
    console.error('Butterfly: No navbar butterfly mesh available');
    return;
  }
  
  console.log('Butterfly: Making butterfly visible and starting flight');
  navbarButterflyMesh.visible = true;
  navbarButterflyFlying = true;
  navbarButterflyStartTime = null;
  
  // Debug: log position
  console.log('Butterfly: Starting position:', navbarButterflyMesh.position);
}

function animateNavbarButterfly(timestamp) {
  if (!navbarButterflyMesh || !navbarButterflyMesh.visible) return;
  
  if (!navbarButterflyStartTime) navbarButterflyStartTime = timestamp;
  const elapsed = (timestamp - navbarButterflyStartTime) / 1000;
  
  // INTENSE vleugel flapperen - alleen breedte (x-axis) zeer snel, SMALLER niet groter
  const wingSpeed = 25; // Veel sneller dan voorheen
  const wingIntensity = 0.4; // Sterker effect
  navbarButterflyMesh.scale.x = 1 - Math.abs(Math.sin(timestamp / (1000/wingSpeed))) * wingIntensity;
  
  // Lichte rotatie voor natuurlijker effect
  navbarButterflyMesh.rotation.z = Math.sin(timestamp / 800) * 0.05;
  
  if (navbarButterflyFlying) {
    // Animatie: vliegen van onder navbar naar logo-positie in 2.5 seconden
    const t = Math.min(elapsed / 2.5, 1);
    
    // Van onder navbar (-8, 2, -5) naar lagere logo positie (1.2, 1.5, 0)
    const startX = -8, startY = 2, startZ = -5;
    const endX = 1.2, endY = 1.5, endZ = 0;
    
    // Smooth bezier-achtige curve
    const progress = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    
    navbarButterflyMesh.position.x = startX + (endX - startX) * progress;
    navbarButterflyMesh.position.y = startY + (endY - startY) * progress;
    navbarButterflyMesh.position.z = startZ + (endZ - startZ) * progress;
    
    // Up-down beweging tijdens vliegen (alleen tijdens flight)
    navbarButterflyMesh.position.y += Math.sin(elapsed * 4) * 0.4;
    
    if (t >= 1) {
      navbarButterflyFlying = false;
      // Zet op finale positie lager bij het logo en onthoud deze positie
      navbarButterflyMesh.position.set(1.2, 1.5, 0); // Lager gezet
    }
  } else {
    // Blijf op vaste positie lager bij het logo - alleen heel subtiele beweging
    const baseX = 1.2;
    const baseY = 1.5; // Lager dan voorheen (2.8 -> 1.5)
    const baseZ = 0;
    
    // Zeer subtiele beweging om levend te lijken
    navbarButterflyMesh.position.x = baseX + Math.sin(timestamp / 2000) * 0.05;
    navbarButterflyMesh.position.y = baseY + Math.sin(timestamp / 1800) * 0.08;
    navbarButterflyMesh.position.z = baseZ;
  }
}

function setupButterflies(formRect) {
  butterflies = [];
  // Midden van het formulier in canvas-coördinaten
  const centerX = 0;
  // Y net onder het formulier, of onderaan scherm als niet zichtbaar
  const y = -2.5;
  for (let i = 0; i < BUTTERFLY_COUNT; i++) {
    const tex = butterflyTextures[i % butterflyTextures.length];
    // Verspreid ze een beetje horizontaal
    const spread = (i - BUTTERFLY_COUNT/2) * 0.4 + (Math.random()-0.5)*0.2;
    const b = createButterfly(tex, new THREE.Vector3(centerX + spread, y, 0));
    scene.add(b.mesh);
    butterflies.push(b);
  }
}

function startButterflyAnimationWithSeed(seed) {
  clearButterflies();
  animationStarted = true;
  const form = document.getElementById('contactForm');
  if (!form) return;
  const rect = form.getBoundingClientRect();
  setupButterflies(rect);
  setTimeout(() => {
    butterflies.forEach((b, i) => {
      b.mesh.visible = true;
      // Willekeurige richting per sectie en per vlinder
      const angle = (seed*2 + i/8 + Math.random()) * Math.PI * 0.5 + 0.2;
      const speed = 0.012 + Math.random()*0.018; // trager
      b.velocity = new THREE.Vector3(
        Math.cos(angle) * speed + 0.01*Math.random(),
        Math.sin(angle) * speed + 0.01*Math.random(),
        (Math.random()-0.5)*0.03
      );
      b.flying = true;
    });
  }, 800);
}

function animateButterflies() {
  butterflies.forEach(b => {
    if (!b.flying) return;
    b.time += 0.1;
    // Vleugel flapperen
    const scaleX = 1 + Math.sin(b.time * 10) * 0.2;
    b.mesh.scale.set(scaleX, 1, 1);
    // Bewegen
    b.mesh.position.add(b.velocity);
    // Fade out als buiten beeld
    if (Math.abs(b.mesh.position.x) > 8 || b.mesh.position.y > 6) {
      b.mesh.visible = false;
    }
  });
}

function setupButterflyScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 10;
  renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = 0;
  renderer.domElement.style.left = 0;
  renderer.domElement.style.pointerEvents = 'none';
  renderer.domElement.style.zIndex = 50; // Lager dan navbar (die heeft waarschijnlijk 100+)
  document.body.appendChild(renderer.domElement);
  // Licht
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5,5,5).normalize();
  scene.add(light);
}

function butterflyLoop(timestamp) {
  requestAnimationFrame(butterflyLoop);
  animateButterflies();
  animateNavbarButterfly(timestamp);
  renderer.render(scene, camera);
}

// --- Menu event listeners ---
function attachMenuListeners() {
  const menuToggle = document.querySelector('.menu-toggle');
  
  if (menuToggle) {
    console.log('Butterfly: Menu toggle found, attaching click listener');
    menuToggle.addEventListener('click', () => {
      console.log('Butterfly: Menu clicked - starting butterfly flight');
      // Start butterfly flight alleen bij menu click
      if (navbarButterflyMesh && !navbarButterflyFlying && !navbarButterflyMesh.visible) {
        startNavbarButterflyFlight();
      }
    });
  } else {
    console.error('Butterfly: Menu toggle not found');
  }
}

// --- Initialisatie ---
window.addEventListener('DOMContentLoaded', () => {
  setupButterflyScene();
  loadButterflyTextures(() => {
    // Maak navbar vlinder aan
    createNavbarButterfly();
    
    // Vlinders vliegen bij openen van de pagina (accueil)
    setTimeout(() => {
      animationStarted = false;
      startButterflyAnimationWithSeed(Math.random());
    }, 400);
    
    // Start animatie bij navigatie naar een andere sectie
    document.querySelectorAll('nav a').forEach((link, idx) => {
      link.addEventListener('click', () => {
        animationStarted = false;
        // Geef elke sectie een andere random seed voor richting
        startButterflyAnimationWithSeed(idx + Math.random());
      });
    });
    
    // Attach menu listeners voor navbar vlinder
    attachMenuListeners();
  });
  butterflyLoop();
});

// Responsief
window.addEventListener('resize', () => {
  if (!renderer || !camera) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});