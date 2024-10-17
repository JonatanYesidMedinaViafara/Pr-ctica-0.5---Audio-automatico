import { Canvas } from "@react-three/fiber";
import Controls from "./controls/Controls";
import Lights from "./lights/Lights";
import { Physics } from "@react-three/rapier";
import Beach from "./world/Beach";
import Staging from "./staging/Staging";
import { Loader, PositionalAudio } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Suspense, useCallback, useRef, useEffect, useState } from "react";
import Video from "./world/Video";

const Home = () => {
  const cameraSettings = {
    position: [0, 15, 15],
  };

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggleAudio = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause(); // Pausar el audio si está reproduciendo
      } else {
        audioRef.current.play(); // Reproducir el audio si está en pausa
      }
      setIsPlaying(!isPlaying); // Actualizar el estado
    }
  }, [isPlaying]);

  return (
    <>
      <Canvas camera={cameraSettings}>
        <Suspense fallback={null}>
          <Perf position={"top-left"} />
          <Controls />
          <Lights />
          <Staging />
          <Physics debug={false}>
            <Beach />
          </Physics>
          <Video name="screen" position-y={10} scale={8} />
          <group position={[0, 5, 0]}>
            <PositionalAudio
              ref={audioRef}
              url="/sounds/waves.mp3"
              distance={3}
            />
          </group>
        </Suspense>
      </Canvas>
      <Loader />
      {/* Botón de reproducir/pausar audio */}
      <button
        onClick={handleToggleAudio}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px", // Cambiado "left" por "right" para posicionarlo a la derecha
          padding: "10px",
          backgroundColor: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isPlaying ? "Apagar Sonido" : "Prender Sonido"}
      </button>
    </>
  );
};

export default Home;
