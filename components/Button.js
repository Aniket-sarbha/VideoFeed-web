'use client';

import React from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const styles = {
  button: `
    relative bg-white rounded-xl z-0 
    px-6 py-3 
    flex items-center gap-2 
    font-semibold text-gray-700 
    shadow-lg hover:shadow-xl 
    transition-all duration-300 
    hover:text-gray-900
    group
    before:content-['']
    before:absolute before:top-[-2px] before:left-[-2px] 
    before:right-[-2px] before:bottom-[-2px]
    before:bg-[linear-gradient(238deg,#ff0000,#00ff00,#0000ff,#ff0000,#00ff00,#0000ff)]
    before:bg-[length:300%_300%]
    before:z-[-1]
    before:rounded-[0.875rem]
    before:opacity-80
    before:transition-opacity
    before:duration-300
    before:animate-[gradient-spin_8s_linear_infinite]
    hover:before:opacity-100
  `,
  container: `
    min-h-screen bg-gray-100 
    flex items-center justify-center
  `,
  icon: `
    w-5 h-5 
    transition-transform duration-300 
    group-hover:translate-x-1
  `,
};

function Button() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/reels');
  };

  return (
    <button onClick={handleClick} className={`flex justify-center items-center ${styles.button} `}>
      <span>Get Started</span>
      <ArrowRight className={styles.icon} />
    </button>
  );
}

// Add the keyframe animation to the document
if (typeof document !== 'undefined' && document.styleSheets[0]) {
  document.styleSheets[0].insertRule(
    `@keyframes gradient-spin {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }`,
    0
  );
}

export default Button;
