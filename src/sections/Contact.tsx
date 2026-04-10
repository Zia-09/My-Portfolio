import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
  Twitter,
  CheckCircle,
  Loader2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.contact-heading',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.contact-heading',
            start: 'top 80%',
          },
        }
      );

      // Contact info animation
      gsap.fromTo(
        '.contact-info',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
          },
        }
      );

      // Form animation
      gsap.fromTo(
        '.contact-form',
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
          },
        }
      );

      // Social links animation
      gsap.fromTo(
        '.social-link',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.social-links',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using Formspree for email functionality
      // Sign up at https://formspree.io and replace 'YOUR_FORM_ID' with your actual form ID
      const response = await fetch('https://formspree.io/f/xnqevwdr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        alert('Failed to send message. Please try again or contact me directly via email.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again or contact me directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'ziaullah5737@gmail.com',
      href: 'mailto:ziaullah5737@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '03469794657',
      href: 'tel:03469794657',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Dir, Pakistan',
      href: '#',
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/Zia-09',
      color: '#333',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/zia-ullah-5781b1265/',
      color: '#0077B5',
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://x.com/ziaullah5737',
      color: '#1DA1F2',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-cyan/3 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="contact-heading text-center mb-16">
          <p className="text-cyan text-sm font-medium tracking-wider uppercase mb-4">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Let's discuss how 
            we can bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <div className="contact-info">
            <h3 className="text-2xl font-bold text-white mb-6">
              Contact Information
            </h3>
            <p className="text-gray-400 mb-8">
              Feel free to reach out to me through any of these channels. 
              I'm always open to discussing new projects and opportunities.
            </p>

            {/* Contact Details */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-cyan/5 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-cyan/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan/20 transition-colors">
                    <info.icon className="text-cyan" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">{info.label}</p>
                    <p className="text-white font-medium group-hover:text-cyan transition-colors">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Follow Me</h4>
              <div className="social-links flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link w-12 h-12 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-cyan hover:bg-cyan/10 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="contact-form">
            <div className="glass rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                Send Me a Message
              </h3>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-500" size={32} />
                  </div>
                  <h4 className="text-white font-semibold text-lg mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-gray-400">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-400 text-sm mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 input-glow transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-400 text-sm mb-2"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 input-glow transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-gray-400 text-sm mb-2"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-black/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 input-glow transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
