'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Building2, Map, Scan } from 'lucide-react';
import { useEffect, useState } from 'react';

const iconMap: { [key: string]: any } = {
  Building2,
  Map,
  Scan,
};

const DEFAULT_HERO_CONTENT = {
  hero_title: 'Advanced Geospatial Solutions',
  hero_subtitle: 'Precision Data, Expertise, Innovation',
  hero_description: 'Enterprise-grade geospatial data, BIM consulting, and 3D scanning solutions',
  cta_text: 'Explore Our Services',
  cta_link: '/services',
};

export default function HomePage() {
  const [heroContent, setHeroContent] = useState(DEFAULT_HERO_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const workerApi = process.env.NEXT_PUBLIC_WORKER_API || 'https://orbitex-api.pthamiz.workers.dev';
        
        // Try to fetch from Worker API first
        const response = await fetch(`${workerApi}/api/homepage`);
        if (response.ok) {
          const data = await response.json();
          console.log('[v0] Loaded homepage from API:', data);
          setHeroContent(data);
          // Update localStorage as backup
          localStorage.setItem('admin_homepage_content', JSON.stringify(data));
        } else {
          // Fallback to localStorage
          const saved = localStorage.getItem('admin_homepage_content');
          if (saved) {
            setHeroContent(JSON.parse(saved));
          }
        }
      } catch (error) {
        console.log('[v0] Error loading homepage:', error);
        // Fallback to localStorage
        const saved = localStorage.getItem('admin_homepage_content');
        if (saved) {
          try {
            setHeroContent(JSON.parse(saved));
          } catch (e) {
            console.log('[v0] Error parsing saved content:', e);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const services = [
    {
      id: 'bim',
      name: 'BIM Consulting',
      description: 'Building Information Modeling expertise for complex infrastructure and construction projects',
      icon_name: 'Building2',
      features: ['3D Model Development', 'Clash Detection', 'Coordination Management', 'Design Optimization'],
      capabilities: ['Revit Expertise', 'Multi-discipline Coordination', 'Quality Assurance', 'Training'],
    },
    {
      id: 'gis',
      name: 'GIS Solutions',
      description: 'Geospatial Information Systems for mapping, analysis, and spatial intelligence',
      icon_name: 'Map',
      features: ['Spatial Analysis', 'Data Mapping', 'Geospatial Database', 'Custom Applications'],
      capabilities: ['ArcGIS Platform', 'Spatial Analysis', 'Custom Development', 'Data Integration'],
    },
    {
      id: 'scan',
      name: 'Scan & Survey',
      description: '3D scanning and surveying services for precise geospatial data collection',
      icon_name: 'Scan',
      features: ['3D Point Clouds', 'Survey Grade Accuracy', 'Reality Capture', 'Digital Twins'],
      capabilities: ['LiDAR Technology', 'Drone Surveys', 'Point Cloud Processing', 'As-Built Documentation'],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary to-primary/90 text-primary-foreground py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-8">
                  <Image
                    src="/orbitex-logo.png"
                    alt="ORBITEX Logo"
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                  {heroContent?.hero_title || 'Advanced Geospatial Solutions'}
                </h1>
                <p className="text-xl opacity-90 mb-2">
                  {heroContent?.hero_subtitle || 'Precision Data, Expertise, Innovation'}
                </p>
                <p className="text-lg opacity-80 mb-8 leading-relaxed">
                  {heroContent?.hero_description || 'Enterprise-grade geospatial data, BIM consulting, and 3D scanning solutions'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={heroContent?.cta_link || '/contact'}>
                    <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                      {heroContent?.cta_text || 'Get Started'}
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </Link>
                  <Link href="/gallery">
                    <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                      View Projects
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="bg-primary-foreground/10 rounded-lg p-12 aspect-square flex items-center justify-center">
                  <Image
                    src="/orbitex-logo.png"
                    alt="ORBITEX"
                    width={300}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 lg:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">Our Services</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comprehensive solutions tailored to your geospatial and infrastructure needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service) => {
                const IconComponent = iconMap[service.icon_name] || Building2;
                return (
                  <Link key={service.id} href={`/services#${service.id}`} className="group">
                    <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow h-full">
                      <div className="mb-6">
                        <div className="inline-flex p-3 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors">
                          <IconComponent size={32} className="text-secondary" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                      <div className="flex items-center text-secondary font-semibold group-hover:gap-2 transition-all">
                        Learn More
                        <ArrowRight size={20} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-secondary text-secondary-foreground py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Projects?</h2>
            <p className="text-lg opacity-90 mb-8">
              Partner with ORBITEX for innovative geospatial solutions
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
