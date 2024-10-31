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
  const skewX = useSpring(skewXRaw, { mass: 1, stiffness: 200, damping: 20 });

  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -4000]);
  const x = useSpring(xRaw, { mass: 1, stiffness: 200, damping: 20 });

  return (
    <motion.p style={{ skewX, x }} className={className}>
      {text}
    </motion.p>
  );
};
