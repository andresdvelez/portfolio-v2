interface Props {
  isDark: boolean;
}

export function Footer({ isDark }: Props) {
  return (
    <div
      className={`flex w-full text-sm gap-4 md:gap-10 transition-colors ${
        isDark ? "text-white/70" : "text-black/70"
      }`}
    >
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.instagram.com/andresvelezs/"
        className={`hover:${
          isDark ? "text-white" : "text-black"
        } transition-colors`}
      >
        Instagram
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.linkedin.com/in/andres-velez-su/"
        className={`hover:${
          isDark ? "text-white" : "text-black"
        } transition-colors`}
      >
        LinkedIn
      </a>
    </div>
  );
}
