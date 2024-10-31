import { Hero } from "@/components/Hero";
import { PreloaderComponent } from "@/components/PreloaderInjection";
import { Projects } from "@/components/Projects";

export default function Home() {
  // useEffect(() => {
  //   const lenis = new Lenis();

  //   const raf = (time: number) => {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   };

  //   requestAnimationFrame(raf);
  // }, []);

  return (
    <>
      <PreloaderComponent />
      <Hero />
      <Projects />
    </>
  );
}
