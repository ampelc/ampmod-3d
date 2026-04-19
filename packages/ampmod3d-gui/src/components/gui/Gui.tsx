import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import MenuBar from '../menu-bar/MenuBar';
import BlocklyEditor from '../blockly/Blockly';

interface EditorShellProps {
  onThreeReady: () => void;
  onBlocklyReady: () => void;
}

const EditorShell = ({ onThreeReady, onBlocklyReady }: EditorShellProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    canvasRef.current.innerHTML = '';
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    canvasRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ccff, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const handleResize = () => {
      if (!canvasRef.current) return;
      const w = canvasRef.current.clientWidth;
      const h = canvasRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Signal Three.js is ready
    onThreeReady();

    let frameId: number;
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [onThreeReady]);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#111' }}>
      <MenuBar />
      <main style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        <BlocklyEditor onReady={onBlocklyReady} />
        <div 
          ref={canvasRef} 
          style={{ flex: 0.75, borderRight: '1px solid #333', position: 'relative', overflow: 'hidden' }} 
        />      </main>
    </div>
  );
};

export default EditorShell;