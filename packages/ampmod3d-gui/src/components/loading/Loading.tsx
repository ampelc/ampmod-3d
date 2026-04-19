import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import earthTextureImg from './Earthmap1000x500.jpg'; // https://commons.wikimedia.org/wiki/File:Earthmap1000x500.jpg

const LoadingScreen = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- 1. SETUP ---
    mountRef.current.innerHTML = '';
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#001100"); // Pure black for better contrast

    const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
    mountRef.current.appendChild(renderer.domElement);

    // --- 2. ASSETS & LIGHTING ---
    const textureLoader = new THREE.TextureLoader();
    const earthMap = textureLoader.load(earthTextureImg); 

    const ambientLight = new THREE.AmbientLight(0x59c059, 0.4); 
    scene.add(ambientLight);

    const sunLight = new THREE.SpotLight(0xffffff, 180); 
    sunLight.position.set(20, 10, 20);
    sunLight.castShadow = true; 
    sunLight.shadow.mapSize.width = 2048; 
    scene.add(sunLight);

    // --- 3. THE CENTER GRADIENT (GLOW) ---
    // Generate a radial gradient using a canvas to create the "halo" effect
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    if (context) {
        const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 128);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');      // Hot white center
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.4)');    // Soft white glow
        gradient.addColorStop(0.6, 'rgba(89, 192, 89, 0.05)');   // Very faint brand green
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');            // Fade to transparent
        context.fillStyle = gradient;
        context.fillRect(0, 0, 256, 256);
    }
    const glowTexture = new THREE.CanvasTexture(canvas);
    const glowMaterial = new THREE.SpriteMaterial({ 
        map: glowTexture, 
        transparent: true, 
        blending: THREE.AdditiveBlending,
        depthWrite: false, // Ensures it doesn't block the nebula particles
        opacity: 0.8
    });
    const glowSprite = new THREE.Sprite(glowMaterial);
    glowSprite.scale.set(16, 16, 1); // Large enough to frame the Earth
    glowSprite.position.set(0, 0, -1); // Positioned slightly behind the Earth
    scene.add(glowSprite);

    // --- 4. THE MOON ---
    const moonMat = new THREE.MeshStandardMaterial({ 
        color: 0x888888,
        roughness: 0.9,
        metalness: 0.0,
    });
    const moon = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), moonMat);
    moon.castShadow = true;
    moon.receiveShadow = true;

    const moonOrbitGroup = new THREE.Group();
    moon.position.set(6, 1, 0); 
    moonOrbitGroup.add(moon);
    scene.add(moonOrbitGroup);

    // --- 5. GENERATED NEBULA ---
    const nebulaCount = 300;
    const nebulaPositions = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);
    const brandGreen = new THREE.Color(0x59c059);
    const deepGreen = new THREE.Color(0x0a1f0a);

    for (let i = 0; i < nebulaCount; i++) {
        const t = Math.random() * 150; 
        const angle = 0.6 * Math.pow(t, 0.7);
        const radius = 0.4 * Math.pow(t, 0.9);
        nebulaPositions[i * 3] = radius * Math.cos(angle) + (Math.random() - 0.5) * 20; 
        nebulaPositions[i * 3 + 1] = (Math.random() - 0.5) * 15; 
        nebulaPositions[i * 3 + 2] = radius * Math.sin(angle) + (Math.random() - 0.5) * 20;

        const finalColor = brandGreen.clone().lerp(deepGreen, Math.random());
        nebulaColors[i * 3] = finalColor.r;
        nebulaColors[i * 3 + 1] = finalColor.g;
        nebulaColors[i * 3 + 2] = finalColor.b;
    }
    const nebulaGeometry = new THREE.BufferGeometry();
    nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
    nebulaGeometry.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));
    const nebulaParticles = new THREE.Points(nebulaGeometry, new THREE.PointsMaterial({
        size: 0.7,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
    }));
    nebulaParticles.position.z = -50;
    scene.add(nebulaParticles);

    // --- 6. EARTH & ORBITERS ---
    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(3, 64, 64), 
      new THREE.MeshStandardMaterial({ map: earthMap, roughness: 0.8 })
    );
    planet.receiveShadow = true;
    scene.add(planet);

    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);
    const objects: THREE.Object3D[] = [];
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff });

    for (let i = 0; i < 20; i++) {
      const obj = i % 2 === 0 ? new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.5, 0.12), whiteMat) : new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), whiteMat);
      const dist = 4.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      obj.position.set(dist * Math.sin(phi) * Math.cos(theta), dist * Math.sin(phi) * Math.sin(theta), dist * Math.cos(phi));
      obj.castShadow = true;
      orbitGroup.add(obj);
      objects.push(obj);
    }

    // --- 7. ANIMATION ---
    let animId: number;
    const clock = new THREE.Timer();

    const animate = () => {
      // Rotations
      planet.rotation.y += 0.025;
      planet.rotation.x += 0.002;
      moon.rotation.y += 0.005; 
      moonOrbitGroup.rotation.y += -0.02; 
      
      orbitGroup.rotation.y += 0.008;
      nebulaParticles.rotation.y += 0.0002;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      nebulaGeometry.dispose();
      glowTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      inset: 0, 
      zIndex: 10000, 
      backgroundColor: '#001100', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <h1 style={{ 
        position: 'absolute', 
        marginTop: 'auto',
        marginBottom: '10vh', 
        top: '3rem',
        color: 'white',
        fontWeight: '900',
        zIndex: 10001, 
        textAlign: 'center',
        pointerEvents: 'none',
        fontFamily: 'serif',
        textTransform: 'uppercase',
        fontSize: '2rem'
      }}>
        <span style={{fontSize: '4rem'}}>AmpMod 3D</span><br />
        Welcome to the next level<br />in AmpMod
      </h1>
      <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />
    </div>
  );
};

export default LoadingScreen;