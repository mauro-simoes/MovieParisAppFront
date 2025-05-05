'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              MovieParis
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/">Accueil</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/films">Films</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/series">Séries</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/login">Connexion</Link>
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
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
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/">Accueil</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/films">Films</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/series">Séries</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/login">Connexion</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
} 