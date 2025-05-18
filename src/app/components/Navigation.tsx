'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              MovieParis
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              <Button variant="ghost" className="relative group" asChild>
                <Link href="/">
                  <span className="relative z-10">Accueil</span>
                  <span className="absolute inset-0 bg-primary/10 rounded-md scale-0 group-hover:scale-100 transition-transform duration-200" />
                </Link>
              </Button>
              <Button variant="ghost" className="relative group" asChild>
                <Link href="/films">
                  <span className="relative z-10">Films</span>
                  <span className="absolute inset-0 bg-primary/10 rounded-md scale-0 group-hover:scale-100 transition-transform duration-200" />
                </Link>
              </Button>
              <Button variant="default" className="ml-2" asChild>
                <Link href="/login">Connexion</Link>
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50"
            >
              <svg
                className="h-6 w-6 transition-transform duration-200"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                style={{ transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden fixed inset-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-200 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '64px' }}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-lg" asChild>
            <Link href="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-lg" asChild>
            <Link href="/films" onClick={() => setIsMenuOpen(false)}>Films</Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-lg" asChild>
            <Link href="/series" onClick={() => setIsMenuOpen(false)}>Séries</Link>
          </Button>
          <Button variant="default" className="w-full justify-start text-lg" asChild>
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>Connexion</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
} 