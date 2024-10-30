"use client";

import React, { createContext, useContext, useRef } from "react";

interface SmoothScrollContext {
  workRef: React.MutableRefObject<HTMLDivElement | null>;
  contactRef: React.MutableRefObject<HTMLDivElement | null>;
  handleSmoothScroll: (
    ref: React.MutableRefObject<HTMLDivElement | null>
  ) => void;
  homeRef: React.MutableRefObject<HTMLDivElement | null>;
}

const SmoothScrollContext = createContext<SmoothScrollContext | null>(null);

type SmoothScrollProviderProps = {
  children?: React.ReactNode;
};

export const SmoothScrollProvider = ({
  children,
}: SmoothScrollProviderProps) => {
  const homeRef = useRef<HTMLDivElement | null>(null);
  const workRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const handleSmoothScroll = (
    ref: React.MutableRefObject<HTMLDivElement | null>
  ) => {
    const targetElement = ref.current;
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  };

  return (
    <SmoothScrollContext.Provider
      value={{
        workRef,
        contactRef,
        handleSmoothScroll,
        homeRef,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
};

export const useSmoothScrollContext = () => {
  const context = useContext(SmoothScrollContext);

  if (!context) {
    throw new Error(
      "useSmoothScrollContext must be used within a SmoothScrollProvider"
    );
  }

  return context;
};
