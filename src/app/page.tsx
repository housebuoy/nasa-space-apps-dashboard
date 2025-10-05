import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans min-h-screen w-full flex flex-col items-center justify-between bg-gradient-to-b from-[#0b0d17] via-[#1a1f2e] to-black text-white relative overflow-hidden">
      {/* ✨ Starfield Background */}
      <div className="absolute inset-0 z-0 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]" />

      {/*  Content Wrapper */}
      <div className="relative z-10 flex flex-col justify-between w-full px-8 py-12 sm:px-16 sm:py-20 gap-16">
        
        {/* 🛰 Header */}
        <header className="w-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src="/assets/images/Colorway=2-Color White.png" alt="NASA logo" width={50} height={50} />
            <h1 className="text-2xl sm:text-3xl font-bold">
              NASA Bioscience Dashboard
            </h1>
          </div>
          <nav className="hidden sm:flex gap-6">
            <Link href="#overview" className="hover:text-blue-400 transition">
              Overview
            </Link>
            <Link href="#features" className="hover:text-blue-400 transition">
              Features
            </Link>
            <Link href="/dashboard" className="hover:text-blue-400 transition">
              Dashboard
            </Link>
          </nav>
        </header>

        {/* 🚀 Hero Section */}
        <main className="flex flex-col items-center text-center mt-10 sm:mt-16 max-w-3xl mx-auto gap-8">
          <Image
            src="/assets/images/Colorway=2-Color White.png"
            alt="Space exploration illustration"
            width={240}
            height={240}
            priority
          />

          <h2 className="text-3xl sm:text-4xl font-semibold leading-snug">
            Enable a New Era of Human Space Exploration
          </h2>

          <p className="text-lg text-gray-300 leading-relaxed">
            NASA has conducted decades of bioscience experiments in space — creating a treasure trove of data.
            Our mission is to make this knowledge accessible and actionable as we prepare to revisit the Moon
            and explore Mars. This dashboard uses{" "}
            <span className="text-blue-400 font-semibold">AI</span> and{" "}
            <span className="text-blue-400 font-semibold">knowledge graphs</span> to help researchers explore
            these discoveries.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              href="/d/overview"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition"
            >
              Launch Dashboard
            </Link>
            <a
              href="https://spaceappschallenge.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black font-medium py-3 px-6 rounded-lg transition"
            >
              Learn More
            </a>
          </div>
        </main>

        {/* 🌍 Footer */}
        <footer className="border-t border-gray-700 pt-6 w-full flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>© 2025 NASA Space Apps Accra | Team Darksun</p>
          <div className="flex gap-4">
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              Built with Next.js
            </a>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              Deployed on Vercel
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
