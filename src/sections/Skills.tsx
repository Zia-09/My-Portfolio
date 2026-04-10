import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Smartphone, 
  Database, 
  Code2, 
  Palette, 
  Layers, 
  Globe,
  Cpu,
  Box
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  icon: React.ElementType;
  category: string;
  color: string;
}

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);

  const skills: Skill[] = [
    { name: 'Flutter', level: 90, icon: Smartphone, category: 'Mobile Dev', color: '#00d4ff' },
    { name: 'Dart', level: 88, icon: Code2, category: 'Programming', color: '#00d4ff' },
    { name: 'Firebase', level: 85, icon: Database, category: 'Backend', color: '#FFA000' },
    { name: 'Provider', level: 85, icon: Layers, category: 'State Management', color: '#00d4ff' },
    { name: 'Riverpod', level: 80, icon: Cpu, category: 'State Management', color: '#00d4ff' },
    { name: 'REST API', level: 82, icon: Globe, category: 'APIs', color: '#00d4ff' },
    { name: 'Hive', level: 78, icon: Box, category: 'Local DB', color: '#FF6B00' },
    { name: 'HTML/CSS', level: 75, icon: Palette, category: 'Web', color: '#E34F26' },
    { name: 'Supabase', level: 65, icon: Database, category: 'Backend', color: '#3ECF8E' },
    { name: 'C++', level: 65, icon: Code2, category: 'Programming', color: '#00599C' },
    { name: 'Python', level: 60, icon: Code2, category: 'Programming', color: '#3776AB' },
    { name: 'Figma', level: 70, icon: Palette, category: 'Design', color: '#F24E1E' },
  ];

  const tools = [
    'Android Studio', 'VS Code', 'Git', 'GitHub', 'Postman', 
    'Firebase Console', 'Figma', 'Google Stitch', 'Xcode'
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.skills-heading',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.skills-heading',
            start: 'top 80%',
          },
        }
      );

      // Skill cards animation
      gsap.fromTo(
        '.skill-card',
        { opacity: 0, y: 30, rotateY: 90 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
          },
        }
      );

      // Progress bars animation
      progressRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { width: '0%' },
            {
              width: `${skills[index].level}%`,
              duration: 1.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: ref,
                start: 'top 85%',
              },
            }
          );
        }
      });

      // Tools animation
      gsap.fromTo(
        '.tool-tag',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.tools-section',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [skills]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="skills-heading text-center mb-16">
          <p className="text-cyan text-sm font-medium tracking-wider uppercase mb-4">
            My Expertise
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Skills <span className="gradient-text">&</span> Technologies
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and the technologies 
            I use to bring ideas to life.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid grid md:grid-cols-2 gap-6 mb-16">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card glass rounded-xl p-5 card-lift tilt-card"
              style={{ perspective: '1000px' }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${skill.color}15` }}
                >
                  <skill.icon style={{ color: skill.color }} size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-semibold">{skill.name}</h3>
                    <span className="text-cyan font-bold">{skill.level}%</span>
                  </div>
                  <p className="text-gray-500 text-xs">{skill.category}</p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  ref={(el) => { progressRefs.current[index] = el; }}
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
                    width: '0%',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tools Section */}
        <div className="tools-section glass rounded-2xl p-6 md:p-8">
          <h3 className="text-white font-semibold text-xl mb-6 text-center">
            Tools & <span className="gradient-text">Technologies</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool, index) => (
              <span
                key={index}
                className="tool-tag px-4 py-2 bg-cyan/10 text-cyan rounded-full text-sm border border-cyan/20 hover:bg-cyan/20 transition-colors cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Skill Categories Summary */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Mobile Development', value: 'Expert' },
            { label: 'State Management', value: 'Advanced' },
            { label: 'Backend Integration', value: 'Proficient' },
            { label: 'UI/UX Design', value: 'Intermediate' },
          ].map((item, index) => (
            <div
              key={index}
              className="glass rounded-xl p-4 text-center"
            >
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                {item.label}
              </p>
              <p className="text-cyan font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
