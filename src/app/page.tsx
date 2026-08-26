"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";

export default function HomePage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      {/* Navigation Header with Go & Login */}
      <Navbar onOpenLogin={() => setIsLoginOpen(true)} />

      <main>
        {/* Main Hero Section with Go & Login Action Buttons */}
        <HeroSection onOpenLogin={() => setIsLoginOpen(true)} />

        {/* Featured Projects Grid with Direct Go Launchers */}
        <FeaturedProjects />

        {/* Features & Curriculum Section */}
        <FeaturesSection onOpenLogin={() => setIsLoginOpen(true)} />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive In-Page Login & Registration Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </div>
  );
}
