'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Users, Award, Zap } from 'lucide-react';

export default function AboutPage() {
  const aboutContent = {
    company_story:
      'ORBITEX was founded in 2003 with a vision to revolutionize geospatial data services. Over two decades, we have established ourselves as a trusted partner for enterprises seeking cutting-edge solutions in BIM, GIS, and 3D scanning. Our commitment to innovation and excellence has made us the preferred choice for organizations across various industries.',
    mission:
      'To deliver innovative geospatial data solutions that empower organizations to make informed decisions, optimize operations, and achieve sustainable growth through technology and expertise.',
    vision: 'To be the global leader in geospatial services, known for our unwavering commitment to quality, innovation, and customer success.',
    years_experience: 20,
    projects_completed: 500,
    team_members: 120,
  };

  const values = [
    {
      title: 'Excellence',
      description: 'We maintain the highest standards in every project we undertake',
      icon: Award,
    },
    {
      title: 'Innovation',
      description: 'We continuously adopt new technologies and methodologies',
      icon: Zap,
    },
    {
      title: 'Collaboration',
      description: 'We work closely with our clients and teams to achieve shared goals',
      icon: Users,
    },
  ];

  const teamMembers = [
    {
      name: 'James Richardson',
      position: 'Chief Executive Officer',
      bio: '25+ years in geospatial technology leadership',
    },
    {
      name: 'Maria Garcia',
      position: 'Chief Technology Officer',
      bio: 'PhD in Geospatial Science, 18 years of technical innovation',
    },
    {
      name: 'David Lee',
      position: 'VP of BIM Solutions',
      bio: 'Certified BIM Manager, 15+ years industry experience',
    },
    {
      name: 'Jennifer Watson',
      position: 'VP of Client Services',
      bio: 'Customer success expert with 12 years in enterprise solutions',
    },
    {
      name: 'Robert Martinez',
      position: 'Director of R&D',
      bio: 'Innovation leader driving technological advancement',
    },
    {
      name: 'Sophie Laurent',
      position: 'Head of Training',
      bio: 'Educational excellence and professional development specialist',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-4">About ORBITEX</h1>
            <p className="text-xl opacity-90">Leading innovation in geospatial solutions</p>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20 lg:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">{aboutContent.company_story}</p>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-4xl font-bold text-secondary">{aboutContent.years_experience}+</p>
                    <p className="text-muted-foreground">Years Experience</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-secondary">{aboutContent.projects_completed}+</p>
                    <p className="text-muted-foreground">Projects Completed</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-secondary">{aboutContent.team_members}+</p>
                    <p className="text-muted-foreground">Team Members</p>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/20 rounded-lg p-12 aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <Zap size={80} className="text-secondary/40 mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">Driving Innovation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 lg:py-32 bg-card border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{aboutContent.mission}</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{aboutContent.vision}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 lg:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <div key={idx} className="bg-card border border-border rounded-lg p-8 text-center">
                    <div className="inline-flex p-4 bg-secondary/10 rounded-lg mb-6">
                      <Icon size={40} className="text-secondary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 lg:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Leadership Team</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experienced professionals committed to your success
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="bg-card border border-border rounded-lg p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-secondary to-secondary/60 rounded-full mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-center mb-1">{member.name}</h3>
                  <p className="text-secondary text-center font-semibold mb-3">{member.position}</p>
                  <p className="text-muted-foreground text-center text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
