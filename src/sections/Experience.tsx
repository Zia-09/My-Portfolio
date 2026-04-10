import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  duration: string;
  type: string;
  description: string;
  achievements: string[];
}

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<SVGPathElement>(null);

  const experiences: ExperienceItem[] = [
    {
      title: 'Flutter Developer',
      company: 'SkyPulse',
      location: 'Islamabad, Pakistan',
      duration: '3 Months',
      type: 'Internship',
      description: 'Worked as a Flutter Developer intern, contributing to real-world mobile application projects and gaining hands-on experience in professional software development.',
      achievements: [
        'Developed and maintained Flutter applications for Android and iOS',
        'Implemented state management using Provider and Riverpod',
        'Integrated REST APIs and Firebase services',
        'Collaborated with the design team to implement UI/UX improvements',
        'Participated in code reviews and agile development processes',
      ],
    },
    {
      title: 'Flutter Developer',
      company: 'Freelance',
      location: 'Remote',
      duration: '1 Year',
      type: 'Freelance',
      description: 'Worked on various freelance projects, delivering high-quality mobile applications to clients worldwide while managing projects independently.',
      achievements: [
        'Completed 8 projects for clients across different industries',
        'Built responsive and performant mobile applications',
        'Managed end-to-end project lifecycle from requirement gathering to deployment',
        'Maintained excellent client communication and satisfaction',
        'Continuously learned and implemented new technologies',
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.experience-heading',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.experience-heading',
            start: 'top 80%',
          },
        }
      );

      // Timeline line animation
      if (timelineRef.current) {
        const pathLength = timelineRef.current.getTotalLength();
        gsap.set(timelineRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(timelineRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 70%',
          },
        });
      }

      // Experience cards animation
      gsap.fromTo(
        '.experience-card',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 70%',
          },
        }
      );

      // Timeline nodes animation
      gsap.fromTo(
        '.timeline-node',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.3,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="experience-heading text-center mb-16">
          <p className="text-cyan text-sm font-medium tracking-wider uppercase mb-4">
            My Journey
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My professional journey in software development, from internships to freelance projects.
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline-container relative">
          {/* Timeline Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px transform -translate-x-1/2">
            <svg className="h-full w-4" preserveAspectRatio="none">
              <path
                ref={timelineRef}
                d="M 2 0 L 2 100%"
                stroke="#00d4ff"
                strokeWidth="2"
                fill="none"
                className="timeline-line"
                style={{ height: '100%' }}
              />
            </svg>
          </div>

          {/* Experience Cards */}
          <div className="space-y-12 md:space-y-0">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative md:grid md:grid-cols-2 md:gap-8 ${
                  index % 2 === 0 ? '' : 'md:direction-rtl'
                }`}
              >
                {/* Timeline Node */}
                <div className="timeline-node hidden md:flex absolute left-1/2 top-8 transform -translate-x-1/2 z-10">
                  <div className="w-4 h-4 rounded-full bg-cyan animate-pulse-glow" />
                </div>

                {/* Card */}
                <div
                  className={`experience-card ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:col-start-2 md:pl-12'
                  }`}
                >
                  <div className="glass rounded-2xl p-6 md:p-8 card-lift">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="text-cyan" size={20} />
                          <span className="text-cyan text-sm font-medium uppercase tracking-wider">
                            {exp.type}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white">
                          {exp.title}
                        </h3>
                        <p className="text-gray-400">{exp.company}</p>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li
                            key={achIndex}
                            className="flex items-start gap-2 text-gray-400 text-sm"
                          >
                            <CheckCircle2
                              className="text-cyan flex-shrink-0 mt-0.5"
                              size={14}
                            />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                {index % 2 === 0 ? (
                  <div className="hidden md:block" />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { label: 'Total Experience', value: '1+ Years' },
            { label: 'Projects Completed', value: '8' },
            { label: 'Internship Duration', value: '3 Months' },
          ].map((stat, index) => (
            <div
              key={index}
              className="glass rounded-xl p-4 text-center"
            >
              <p className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                {stat.value}
              </p>
              <p className="text-gray-500 text-xs uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
