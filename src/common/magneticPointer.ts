/** Solo ratón/trackpad fino: evita translate GSAP en táctil (scroll-x por desborde). */
export const MAGNETIC_POINTER_MEDIA = "(pointer: fine)";

export function prefersFinePointer(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia(MAGNETIC_POINTER_MEDIA).matches;
}
