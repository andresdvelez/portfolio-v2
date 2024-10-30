"use client";
import React from "react";

interface Props {
  index: number;
  title: string;
  description: string;
  manageModal: (active: boolean, index: number, x: number, y: number) => void;
}

export function Project({ index, title, description, manageModal }: Props) {
  return (
    <div
      onMouseEnter={(e) => {
        manageModal(true, index, e.clientX, e.clientY);
      }}
      onMouseLeave={(e) => {
        manageModal(false, index, e.clientX, e.clientY);
      }}
      className="flex w-full justify-between items-center flex-col md:flex-row px-0 md:px-[100px] py-[50px] border-t border-gray-300 cursor-pointer transition-all duration-200 hover:opacity-50 last:border-b"
    >
      <h2 className="text-5xl md:text-[60px] m-0 font-normal transition-all duration-400 hover:-translate-x-2">
        {title}
      </h2>
      <p className="font-light transition-all duration-400 hover:translate-x-2">
        {description}
      </p>
    </div>
  );
}
