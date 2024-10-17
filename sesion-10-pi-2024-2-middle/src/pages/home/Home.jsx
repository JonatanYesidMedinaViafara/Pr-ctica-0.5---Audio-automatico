import { Canvas } from "@react-three/fiber";
import Controls from "./controls/Controls";
import Lights from "./lights/Lights";
import { Physics } from "@react-three/rapier";
import Beach from "./world/Beach";
import Staging from "./staging/Staging";
import { Loader, PositionalAudio } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Suspense, useCallback, useRef, useEffect } from "react";
import Video from "./world/Video";

const Home = () => {
  const cameraSettings = {
    position: [0, 15, 15],
  };

  const audioRef = useRef(null);
  
  // Use effect to play audio when the component is mounted
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      const playAudio = async () => {
        try {
          await audio.play(); // Attempt to play audio
          audio.setVolume(10);
        } catch (err) {
          console.log("Audio auto-play was prevented:", err);
        }
      };
      playAudio();
    }
  }, []);

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
    </>
  );
};

export default Home;
