'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { useState } from 'react';
import Image from 'next/image';

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Downtown Urban Development',
      description: 'Comprehensive GIS analysis for mixed-use development project',
      category: 'GIS',
      image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
      client_name: 'Urban Planning Bureau',
      year: 2023,
    },
    {
      id: 2,
      title: 'Infrastructure Modeling',
      description: 'Advanced BIM coordination for highway expansion project',
      category: 'BIM',
      image_url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
      client_name: 'Department of Transportation',
      year: 2023,
    },
    {
      id: 3,
      title: 'Commercial Tower Complex',
      description: '3D laser scanning and point cloud processing',
      category: 'Scanning',
      image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop',
      client_name: 'Commercial Developers Inc',
      year: 2023,
    },
    {
      id: 4,
      title: 'Environmental Analysis',
      description: 'Spatial data analysis for conservation planning',
      category: 'GIS',
      image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
      client_name: 'Environmental Agency',
      year: 2023,
    },
    {
      id: 5,
      title: 'Heritage Building Survey',
      description: '3D documentation and as-built survey',
      category: 'Scanning',
      image_url: 'https://images.unsplash.com/photo-1479839672679-a46482602cb1?w=600&h=400&fit=crop',
      client_name: 'Historic Preservation Society',
      year: 2023,
    },
    {
      id: 6,
      title: 'Corporate Campus BIM',
      description: 'Full BIM model development and coordination',
      category: 'BIM',
      image_url: 'https://images.unsplash.com/photo-1605276374104-dee2a7a01e06?w=600&h=400&fit=crop',
      client_name: 'Fortune 500 Company',
      year: 2023,
    },
  ];

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'BIM', label: 'BIM' },
    { value: 'GIS', label: 'GIS' },
    { value: 'Scanning', label: 'Scanning' },
  ];

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-4">Project Gallery</h1>
            <p className="text-xl opacity-90">Showcase of our expertise and successful deliverables</p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-12 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setFilter(cat.value)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    filter === cat.value
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-card border border-border text-foreground hover:border-secondary'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20 lg:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-64 bg-muted">
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      {project.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{project.client_name}</span>
                      <span className="font-semibold">{project.year}</span>
                    </div>
                  </div>
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
