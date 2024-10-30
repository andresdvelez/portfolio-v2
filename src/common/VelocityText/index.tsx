import {
  motion,
  useVelocity,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

export const VelocityText = ({
  text,
  className,
  scrollYProgress,
}: {
  text: string;
  className: string;
  scrollYProgress: MotionValue<number>;
}) => {
  const scrollVelocity = useVelocity(scrollYProgress);

  const skewXRaw = useTransform(
    scrollVelocity,
    [-0.5, 0.5],
    ["45deg", "-45deg"]
  );
  const skewX = useSpring(skewXRaw, { mass: 1, stiffness: 800, damping: 100 });

  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -4000]);
  const x = useSpring(xRaw, { mass: 3, stiffness: 400, damping: 50 });

  return (
    <div className=" flex h-[100px] items-center overflow-hidden">
      <motion.p style={{ skewX, x }} className={className}>
        {text}
      </motion.p>
    </div>
  );
};
