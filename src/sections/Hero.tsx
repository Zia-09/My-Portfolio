import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';

const Hero = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const profileImage = `${import.meta.env.BASE_URL}profile.jpg`;

  useEffect(() => {
    // Entrance animations
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      '.hero-greeting',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }
    )
      .fromTo(
        '.hero-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'expo.out' },
        '-=0.4'
      )
      .fromTo(
        '.hero-subtitle',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'expo.out' },
        '-=0.6'
      )
      .fromTo(
        '.hero-cta',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.4'
      )
      .fromTo(
        '.hero-socials',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' },
        '-=0.3'
      )
      .fromTo(
        '.hero-image',
        { opacity: 0, rotateX: 20, scale: 0.8 },
        { opacity: 1, rotateX: 0, scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)' },
        '-=1'
      );

    // Floating animation for image
    gsap.to('.hero-image', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  // 3D tilt effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      
      setMousePosition({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        rotateY: mousePosition.x * 15,
        rotateX: -mousePosition.y * 15,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [mousePosition]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-gray-900" />
      
      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <p className="hero-greeting text-cyan text-sm md:text-base font-medium tracking-wider uppercase mb-4">
              Hi, I'm
            </p>
            <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              <span className="gradient-text">Zia</span> Ullah
            </h1>
            <h2 className="hero-subtitle text-xl md:text-2xl lg:text-3xl text-gray-300 font-light mb-6">
              Flutter Developer <span className="text-cyan">&</span> CS Student
            </h2>
            <p className="hero-subtitle text-gray-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-8">
              Building beautiful mobile experiences with 1 year of professional experience. 
              Passionate about creating intuitive and performant applications.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button
                onClick={() => scrollToSection('projects')}
                className="btn-primary flex items-center justify-center gap-2"
              >
                View My Work
                <ArrowDown size={18} />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-secondary"
              >
                Get In Touch
              </button>
            </div>

            {/* Social Links */}
            <div className="hero-socials flex gap-4 justify-center lg:justify-start">
              <a
                href="https://github.com/Zia-09"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/zia-ullah-5781b1265/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://x.com/ziaullah5737"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div
              ref={imageRef}
              className="hero-image relative"
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            >
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-cyan/20 rounded-3xl blur-3xl transform scale-110" />
              
              {/* Image container */}
              <div className="relative w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[28rem] rounded-3xl overflow-hidden animated-border border-2">
                <img
                  src={profileImage}
                  alt="Zia Ullah"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Floating badges */}
              <div className="absolute -bottom-4 -left-4 glass rounded-xl px-4 py-2 animate-float">
                <span className="text-cyan font-bold">1+</span>
                <span className="text-gray-300 text-sm ml-2">Years Exp</span>
              </div>
              
              <div className="absolute -top-4 -right-4 glass rounded-xl px-4 py-2 animate-float" style={{ animationDelay: '0.5s' }}>
                <span className="text-cyan font-bold">8</span>
                <span className="text-gray-300 text-sm ml-2">Projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-cyan/50" size={24} />
      </div>
    </section>
  );
};

export default Hero;
