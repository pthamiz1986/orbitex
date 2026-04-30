'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Building2, Map, Scan } from 'lucide-react';
import { useEffect, useState } from 'react';

const iconMap: { [key: string]: any } = {
  Building2,
  Map,
  Scan,
};

const DEFAULT_SERVICES = [
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

export default function ServicesPage() {
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('admin_services');
    if (saved) {
      try {
        setServices(JSON.parse(saved));
      } catch (e) {
        console.log('[v0] Error parsing saved services:', e);
        setServices(DEFAULT_SERVICES);
      }
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-4">Our Services</h1>
            <p className="text-xl opacity-90">Comprehensive geospatial solutions for enterprises</p>
          </div>
        </section>

        {/* Services Details */}
        <section className="py-20 lg:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {!isLoading && services.map((service, index) => {
              const IconComponent = iconMap[service.icon_name] || Building2;
              return (
                <div key={service.id} id={service.id} className="mb-20 last:mb-0">
                  <div className={`grid md:grid-cols-2 gap-12 items-start`}>
                    <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                      <div className="inline-flex p-4 bg-secondary/10 rounded-lg mb-6">
                        <IconComponent size={40} className="text-secondary" />
                      </div>
                      <h2 className="text-4xl font-bold mb-4">{service.name}</h2>
                      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="mb-8">
                        <h3 className="font-semibold text-lg mb-4">Key Capabilities:</h3>
                        <ul className="space-y-3">
                          {service.capabilities?.map((capability: string, i: number) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="mt-1 w-2 h-2 bg-secondary rounded-full flex-shrink-0" />
                              <span>{capability}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Link href="/contact">
                        <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                          Request Quote
                          <ArrowRight className="ml-2" size={20} />
                        </Button>
                      </Link>
                    </div>

                    <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                      <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/20 rounded-lg p-12 aspect-square flex items-center justify-center">
                        <div className="text-center">
                          <IconComponent size={80} className="text-secondary/40 mx-auto mb-4" />
                          <p className="text-lg text-muted-foreground">{service.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Training Section */}
        <section className="bg-muted py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Professional Training Programs</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Enhance your team&apos;s skills with our comprehensive training programs covering BIM, GIS, and 3D scanning technologies
            </p>
            <Link href="/training">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Explore Training Options
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
