"use client";

import { AnimatePresence } from "framer-motion";
import { Preloader } from "../Preloader";
import { useHome } from "./home.hook";

export const PreloaderComponent = () => {
  const { isLoading } = useHome();

  return (
    <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
  );
};
