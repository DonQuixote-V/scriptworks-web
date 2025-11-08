"use client";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 backdrop-blur-md ${
        scrolled ? "bg-gray-800/90 shadow-lg py-3" : "bg-gray-900/60 py-5"
      } animate-fadeInDown`}
    >
      <nav className="flex justify-center space-x-8 text-sm md:text-lg font-medium text-white">
        <a href="/" className="hover:text-cyan-400 transition duration-300">
          หน้าแรก
        </a>
        <a href="/works" className="hover:text-cyan-400 transition duration-300">
          ผลงาน
        </a>
        <a href="/queue" className="hover:text-cyan-400 transition duration-300">
          ตามคิว
        </a>
        <a href="/about" className="hover:text-cyan-400 transition duration-300">
          เกี่ยวกับเรา
        </a>
        <a href="/contact" className="hover:text-cyan-400 transition duration-300">
          ติดต่อเรา
        </a>
      </nav>
    </header>
  );
}
