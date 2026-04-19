import { StrictMode, useState, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import LoadingScreen from './components/loading/Loading';
import 'modern-normalize';
import '@fontsource-variable/geist';
import './app.css';

// Lazy load the heavy GUI component
const EditorShell = lazy(() => import('./components/gui/Gui'));

function App() {
  const [threeReady, setThreeReady] = useState(false);
  const [blocklyReady, setBlocklyReady] = useState(false);

  // We are loading if the chunks are still downloading OR if the components haven't signaled ready
  const isLoading = !threeReady || !blocklyReady;

  return (
    <>
      {/* Keep the LoadingScreen visible until the code is downloaded 
          AND the internal systems signal they are ready.
      */}
      {isLoading && <LoadingScreen />}
      
      <Suspense fallback={null}>
        <EditorShell 
          onThreeReady={() => setThreeReady(true)} 
          onBlocklyReady={() => setBlocklyReady(true)} 
        />
      </Suspense>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);