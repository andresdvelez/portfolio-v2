import React from "react";

export type NavItem = {
  title: string;
  ref: React.MutableRefObject<HTMLDivElement | null>;
};
