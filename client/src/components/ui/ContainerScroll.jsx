import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export function ContainerScroll({ titleComponent, children }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0.8, 1] : [1.05, 1],
  );

  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      ref={containerRef}
      className="h-[70rem] flex items-center justify-center"
    >
      <div
        className="relative w-full"
        style={{
          perspective: "1000px",
        }}
      >
        <motion.div
          style={{
            translateY: translate,
          }}
          className="text-center mb-20"
        >
          {titleComponent}
        </motion.div>

        <motion.div
          style={{
            rotateX: rotate,
            scale,
          }}
          className="
          max-w-6xl
          mx-auto
          bg-slate-900/60
          backdrop-blur-xl
          border
          border-slate-800
          rounded-3xl
          p-6
          h-[500px]
          "
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
