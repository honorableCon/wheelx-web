"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";

/**
 * Client wrapper for Navbar - handles scroll state detection
 * This allows the homepage to be a Server Component for better SEO
 */
export default function NavbarWrapper() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        
        // Check initial scroll position
        handleScroll();
        
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return <Navbar isScrolled={isScrolled} />;
}
