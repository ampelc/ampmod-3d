import { StrictMode, useState, lazy, Suspense, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import LoadingScreen from './components/loading/Loading';
import 'modern-normalize';
import '@fontsource-variable/geist';
import './app.css';

const EditorShell = lazy(() => import('./components/gui/Gui'));

const getGraphicsSupport = () => {
  if (typeof window === 'undefined') return { webgl: false, webgpu: false };
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  const webgl = !!gl;
  const webgpu = !!(navigator as any).gpu;
  return { webgl, webgpu };
};

function App() {
  const [threeReady, setThreeReady] = useState(false);
  const [blocklyReady, setBlocklyReady] = useState(false);
  const [timerReady, setTimerReady] = useState(false);

  const support = useMemo(() => getGraphicsSupport(), []);
  const isUnsupported = !support.webgl && !support.webgpu;

  useEffect(() => {
    if (isUnsupported) return; 
    const timer = setTimeout(() => {
      setTimerReady(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isUnsupported]);

  if (isUnsupported) {
    return (
      <div style={{
        position: 'fixed', inset: 0, backgroundColor: '#000', color: '#fff',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', fontFamily: 'system-ui, sans-serif',
        textAlign: 'center', padding: '2rem', zIndex: 999999
      }}>
        <style>{`
          @keyframes rotateHead {
            0% { transform: rotateY(20deg) rotateX(-10deg); }
            50% { transform: rotateY(-20deg) rotateX(-10deg); }
            100% { transform: rotateY(20deg) rotateX(-10deg); }
          }

          .viewport {
            perspective: 1000px;
            margin-bottom: 4rem;
          }

          /* The 3D Cube/Head Container */
          .head {
            width: 100px;
            height: 100px;
            position: relative;
            transform-style: preserve-3d;
            animation: rotateHead 1s ease-in-out infinite;
          }

          /* General styling for all 6 sides of the "head" */
          .face {
            position: absolute;
            width: 100px;
            height: 100px;
            background: #222;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 50px;
            backface-visibility: visible;
          }

          /* Position the sides to form a 3D volume */
          .front  { transform: translateZ(50px); background: #333; border-color: #666; }
          .back   { transform: rotateY(180deg) translateZ(50px); }
          .right  { transform: rotateY(90deg) translateZ(50px); width: 100px; }
          .left   { transform: rotateY(-90deg) translateZ(50px); width: 100px; }
          .top    { transform: rotateX(90deg) translateZ(50px); height: 100px; }
          .bottom { transform: rotateX(-90deg) translateZ(50px); height: 100px; }

          /* Customizing the front "face" features */
          .features {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }
          .eyes { display: flex; gap: 20px; }
          .eye { width: 12px; height: 12px; background: #fff; border-radius: 50%; }
          .mouth { 
            width: 40px; height: 20px; border: 4px solid #fff; 
            border-radius: 0 0 100% 100%; /* Sad curve */
            border-top: none;
            transform: rotate(180deg); /* Flip it to frown */
            margin-top: 10px;
          }

          /* Shading for depth */
          .side-shade { background: #1a1a1a; }
          .top-shade { background: #444; }
        `}</style>

        <div className="viewport">
          <div className="head">
            {/* Front Face with "Literal" CSS eyes and mouth */}
            <div className="face front">
              <div className="features">
                <div className="eyes">
                  <div className="eye"></div>
                  <div className="eye"></div>
                </div>
                <div className="mouth"></div>
              </div>
            </div>
            
            {/* Other sides to give it volume */}
            <div className="face back side-shade"></div>
            <div className="face right side-shade"></div>
            <div className="face left side-shade"></div>
            <div className="face top top-shade"></div>
            <div className="face bottom side-shade"></div>
          </div>
        </div>

        <p style={{ maxWidth: '400px', margin: 0 }}>
          Your browser does not support WebGL which is required for AmpMod 3D to run.
        </p>
      </div>
    );
  }

  const isLoading = !timerReady || !threeReady || !blocklyReady;

  return (
    <>
      {isLoading && <LoadingScreen />}
      {timerReady && (
        <Suspense fallback={null}>
          <EditorShell 
            onThreeReady={() => setThreeReady(true)} 
            onBlocklyReady={() => setBlocklyReady(true)} 
          />
        </Suspense>
      )}
    </>
  );
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}