import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(
      '.nav-container',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.2 }
    );

    gsap.fromTo(
      '.nav-link',
      { opacity: 0 },
      { opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.8 }
    );
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav
        className={`nav-container fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 px-4 md:px-8'
            : 'py-6 px-4 md:px-12'
        }`}
      >
        <div
          className={`mx-auto transition-all duration-500 ${
            isScrolled
              ? 'max-w-4xl glass rounded-full px-6 py-3'
              : 'max-w-7xl'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              className="text-xl font-bold tracking-tight hover:text-cyan transition-colors"
            >
              <span className="gradient-text">Zia</span> Ullah
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="nav-link text-sm text-gray-300 hover:text-cyan transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="hidden md:block nav-link btn-primary text-sm py-2 px-6"
            >
              Hire Me
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-lg transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-2xl font-medium text-white hover:text-cyan transition-colors"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="btn-primary mt-4"
          >
            Hire Me
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
