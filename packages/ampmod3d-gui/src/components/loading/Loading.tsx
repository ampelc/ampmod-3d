import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const LoadingScreen = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- 1. PREVENT DUPES ---
    mountRef.current.innerHTML = '';

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x4fa55c); // #4fa55c

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const whiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const solidWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // --- 2. ASSET GENERATORS ---
    const createDetailedStickFigure = () => {
      const group = new THREE.Group();
      
      // Torso
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.5, 0.05), solidWhiteMat);
      
      // Head
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), solidWhiteMat);
      head.position.y = 0.35;

      // Arms (using a single wide box or two small ones)
      const arms = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.04), solidWhiteMat);
      arms.position.y = 0.15;

      // Legs
      const legGeom = new THREE.BoxGeometry(0.04, 0.4, 0.04);
      const leftLeg = new THREE.Mesh(legGeom, solidWhiteMat);
      leftLeg.position.set(-0.1, -0.4, 0);
      leftLeg.rotation.z = 0.2;

      const rightLeg = new THREE.Mesh(legGeom, solidWhiteMat);
      rightLeg.position.set(0.1, -0.4, 0);
      rightLeg.rotation.z = -0.2;

      group.add(body, head, arms, leftLeg, rightLeg);
      return group;
    };

    // --- 3. SCENE OBJECTS ---
    const planet = new THREE.Mesh(new THREE.SphereGeometry(2, 24, 24), whiteMat);
    scene.add(planet);

    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    const objects: THREE.Object3D[] = [];
    for (let i = 0; i < 20; i++) {
      let obj;
      // 50/50 mix of cubes and detailed stick figures
        obj = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), whiteMat);

      const dist = 3.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;

      obj.position.set(
        dist * Math.sin(phi) * Math.cos(theta),
        dist * Math.sin(phi) * Math.sin(theta),
        dist * Math.cos(phi)
      );

      // Random rotation for variety
      obj.rotation.set(Math.random(), Math.random(), Math.random());
      
      orbitGroup.add(obj);
      objects.push(obj);
    }

    // --- 4. ANIMATION ---
    let animId: number;
    const animate = () => {
      planet.rotation.y += 0.003;
      orbitGroup.rotation.y += 0.008;
      orbitGroup.rotation.x += 0.003;
      
      objects.forEach(obj => {
        obj.rotation.x += 0.01;
        obj.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

return (
  <div style={{ 
    position: 'fixed', 
    inset: 0, 
    zIndex: 10000, 
    backgroundColor: '#4fa55c',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    {/* THREE.JS CONTAINER */}
    <div 
      ref={mountRef} 
      style={{ position: 'absolute', inset: 0, zIndex: 10000 }} 
    />

    {/* OVERLAY TEXT */}
    <h1 style={{ 
      position: 'relative', // Or absolute with a higher z-index
      marginTop: 'auto',
      marginBottom: '15%', 
      color: 'white',
      fontSize: '2rem', 
      zIndex: 10001, // Must be higher than the mountRef
      textAlign: 'center',
      pointerEvents: 'none'
    }}>
      Welcome to the next level in AmpMod.
    </h1>
  </div>
);
};

export default LoadingScreen;