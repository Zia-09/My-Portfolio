import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
  icon?: string;
  image: string;
  color: string;
}

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const baseUrl = import.meta.env.BASE_URL;

  const projects: Project[] = [
    {
      title: 'Legal Sync',
      description: 'A comprehensive Lawyer-Client Management System built with Flutter. Features include case tracking, appointment scheduling, document management, and secure communication between lawyers and clients.',
      tech: ['Flutter', 'Firebase', 'Hive', 'Provider', 'Cloud Firestore'],
      github: 'https://github.com/Zia-09/Legal-Sync',
      image: `${baseUrl}projects/legal-sync.jpg`,
      icon: '⚖️',
      color: '#00d4ff',
    },
    {
      title: 'Flutter Learning App',
      description: 'An interactive educational platform for learning Flutter development. Includes tutorials, code examples, quizzes, and progress tracking to help beginners master Flutter.',
      tech: ['Flutter', 'Dart', 'Hive', 'Provider'],
      github: 'https://github.com/Zia-09/flutter-learning-app',
      image: `${baseUrl}projects/learning-app.jpg`,
      icon: '📚',
      color: '#FF6B6B',
    },
    {
      title: 'News App',
      description: 'A modern news application that fetches real-time news from various sources. Features include category filtering, bookmarking, search functionality, and offline reading.',
      tech: ['Flutter', 'REST API', 'Provider', 'Shared Preferences'],
      github: 'https://github.com/Zia-09/news_App',
      image: `${baseUrl}projects/news-app.jpg`,
      icon: '📰',
      color: '#4ECDC4',
    },
    {
      title: 'Ground Booking Website',
      description: 'A web-based platform for booking sports grounds and facilities. Includes real-time availability, online payment integration, booking management, and user reviews.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
      github: 'https://github.com/Zia-09/Ground_booking-website',
      image: `${baseUrl}projects/ground-booking.jpg`,
      icon: '🏟️',
      color: '#95E1D3',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.projects-heading',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.projects-heading',
            start: 'top 80%',
          },
        }
      );

      // Project cards animation
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-cyan/3 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="projects-heading text-center mb-16">
          <p className="text-cyan text-sm font-medium tracking-wider uppercase mb-4">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of my recent work showcasing my skills in mobile and web development.
            Each project represents my commitment to quality and user experience.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group relative glass rounded-2xl overflow-hidden card-lift"
            >
              {/* Card Header with Project Image */}
              <div className="relative h-48 overflow-hidden md:h-56">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan md:text-2xl">
                    {project.title}
                  </h3>
                </div>
                <div className="absolute inset-0 bg-cyan/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Card Content */}
              <div className="p-6">
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2.5 py-1 bg-cyan/10 text-cyan text-xs rounded-full border border-cyan/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan/10 text-cyan rounded-lg text-sm font-medium hover:bg-cyan hover:text-black transition-all duration-300"
                  >
                    <Github size={16} />
                    View Code
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 border border-cyan/30 text-cyan rounded-lg text-sm font-medium hover:bg-cyan hover:text-black transition-all duration-300"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Border glow effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 0 1px ${project.color}40, 0 0 30px ${project.color}20`,
                }}
              />
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/Zia-09"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 glass rounded-full text-white hover:bg-cyan/10 hover:text-cyan transition-all duration-300 border border-cyan/30"
          >
            <Github size={20} />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
