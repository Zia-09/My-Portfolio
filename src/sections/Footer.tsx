import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Heart, Github, Linkedin, Twitter, ArrowUp } from 'lucide-react';

const Footer = () => {
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Marquee animation for watermark
    if (watermarkRef.current) {
      gsap.to(watermarkRef.current, {
        x: '-50%',
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Zia-09', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/zia-ullah-5781b1265/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/ziaullah5737', label: 'Twitter' },
  ];

  const quickLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center overflow-hidden opacity-5 pointer-events-none">
        <div
          ref={watermarkRef}
          className="text-[20vw] font-bold text-white whitespace-nowrap"
          style={{ width: '200%' }}
        >
          ZIA ULLAH • ZIA ULLAH • ZIA ULLAH • ZIA ULLAH •
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <button
              onClick={() => scrollToSection('hero')}
              className="text-2xl font-bold mb-4 block"
            >
              <span className="gradient-text">Zia</span> Ullah
            </button>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Flutter Developer & Computer Science student passionate about 
              creating beautiful mobile experiences and innovative solutions.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-10 h-10 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-cyan transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 text-sm hover:text-cyan transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <a
                href="mailto:ziaullah5737@gmail.com"
                className="block text-gray-400 text-sm hover:text-cyan transition-colors"
              >
                ziaullah5737@gmail.com
              </a>
              <a
                href="tel:03469794657"
                className="block text-gray-400 text-sm hover:text-cyan transition-colors"
              >
                03469794657
              </a>
              <p className="text-gray-400 text-sm">
                Dir, Pakistan
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm flex items-center gap-1">
            © {currentYear} Zia Ullah. Made with{' '}
            <Heart className="text-red-500" size={14} fill="currentColor" /> All rights reserved.
          </p>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-gray-400 hover:text-cyan transition-colors"
          >
            <span className="text-sm">Back to top</span>
            <div className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:bg-cyan/20 transition-colors">
              <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
