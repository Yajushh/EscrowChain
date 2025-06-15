import Globe from "react-globe.gl";
import { useRef, useEffect } from "react";
import { useThemeStore } from "../store/themeStore";

export default function SpinningGlobe() {
  const globeRef = useRef<any>();
  const { dark } = useThemeStore();

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      globeRef.current.controls.enableZoom = false;
      globeRef.current.pointOfView({ altitude: 1.7 }, 0);
    }
  }, []);

  return (
    <div
      className={`
        relative w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] md:w-[400px] md:h-[400px]
        rounded-full overflow-visible
        before:absolute before:inset-0 before:rounded-full
        before:blur-3xl before:opacity-30
        ${dark ? "before:bg-indigo-500" : "before:bg-black"}
      `}
    >
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundColor="rgba(0,0,0,0)"
        width={400}
        height={400}
      />
    </div>
  );
}
