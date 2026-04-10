import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Phone, GraduationCap, Briefcase, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.about-heading',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.about-heading',
            start: 'top 80%',
          },
        }
      );

      // Bio text animation
      gsap.fromTo(
        '.about-bio',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-bio',
            start: 'top 80%',
          },
        }
      );

      // Info cards stagger
      gsap.fromTo(
        '.info-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.info-cards',
            start: 'top 80%',
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
        }
      );

      // Counter animation for stats
      const counters = document.querySelectorAll('.stat-number');
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: counter,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const personalInfo = [
    { icon: MapPin, label: 'Location', value: 'Dir, Pakistan' },
    { icon: Mail, label: 'Email', value: 'ziaullah5737@gmail.com' },
    { icon: Phone, label: 'Phone', value: '03469794657' },
    { icon: GraduationCap, label: 'University', value: 'Abdul Wali Khan University' },
    { icon: Briefcase, label: 'Department', value: 'Computer Science (Software)' },
    { icon: Calendar, label: 'Semester', value: '8th Semester' },
  ];

  const stats = [
    { number: 1, suffix: '+', label: 'Years Experience' },
    { number: 8, suffix: '', label: 'Projects Completed' },
    { number: 4, suffix: '', label: 'Core Technologies' },
    { number: 3, suffix: '', label: 'Months Internship' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="about-heading mb-16">
          <p className="text-cyan text-sm font-medium tracking-wider uppercase mb-4">
            About Me
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Let Me <span className="gradient-text">Introduce</span> Myself
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Bio */}
          <div className="about-bio">
            <div className="glass rounded-2xl p-6 md:p-8 mb-8">
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                I'm a passionate <span className="text-cyan font-medium">Flutter Developer</span> and 
                Computer Science student at Abdul Wali Khan University, Mardan. Currently in my 
                8th semester, I specialize in building cross-platform mobile applications with 
                beautiful UI/UX and robust functionality.
              </p>
              <p className="text-gray-400 text-base leading-relaxed mb-6">
                With 1 year of professional experience including a 3-month internship at 
                <span className="text-cyan font-medium"> SkyPulse Islamabad</span>, I've honed my 
                skills in Flutter, Firebase, and state management solutions like Provider and Riverpod.
              </p>
              <p className="text-gray-400 text-base leading-relaxed">
                I'm proficient in using tools like Figma for design and Google Stitch for 
                prototyping. My goal is to create applications that not only look great but 
                also deliver exceptional user experiences.
              </p>
            </div>

            {/* Personal Info Cards */}
            <div className="info-cards grid sm:grid-cols-2 gap-4">
              {personalInfo.map((info, index) => (
                <div
                  key={index}
                  className="info-card glass rounded-xl p-4 flex items-center gap-4 card-lift"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="text-cyan" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">{info.label}</p>
                    <p className="text-white text-sm font-medium">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Stats */}
          <div ref={statsRef} className="lg:sticky lg:top-32">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-card glass rounded-2xl p-6 md:p-8 text-center card-lift"
                >
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    <span className="stat-number" data-target={stat.number}>
                      0
                    </span>
                    {stat.suffix}
                  </div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Quick Skills Preview */}
            <div className="mt-8 glass rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Core Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {['Flutter', 'Dart', 'Firebase', 'Provider', 'Riverpod', 'REST API', 'Hive', 'Figma'].map(
                  (skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-cyan/10 text-cyan text-sm rounded-full border border-cyan/20"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
