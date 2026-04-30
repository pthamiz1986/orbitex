'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Clock, Users, Award } from 'lucide-react';
import { useState } from 'react';

export default function TrainingPage() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const courses = [
    {
      id: 1,
      title: 'Advanced BIM Coordination',
      description: 'Master Building Information Modeling coordination techniques',
      duration: '40 hours',
      level: 'Advanced',
      price: 1299,
      instructor_name: 'John Smith',
      curriculum: [
        'Revit Fundamentals',
        '3D Model Development',
        'Multi-discipline Coordination',
        'Clash Detection & Resolution',
        'Documentation & Reporting',
        'Real-world Case Studies',
      ],
      prerequisites: 'Basic Revit knowledge required',
    },
    {
      id: 2,
      title: 'GIS Spatial Analysis',
      description: 'Learn advanced spatial analysis and mapping techniques',
      duration: '30 hours',
      level: 'Intermediate',
      price: 899,
      instructor_name: 'Sarah Johnson',
      curriculum: [
        'GIS Fundamentals',
        'Spatial Data Types',
        'Vector & Raster Analysis',
        'Geoprocessing Tools',
        'Data Visualization',
        'Real-world Applications',
      ],
      prerequisites: 'Basic computer skills',
    },
    {
      id: 3,
      title: '3D Scanning & Point Cloud Processing',
      description: 'Professional 3D scanning and point cloud data handling',
      duration: '35 hours',
      level: 'Intermediate',
      price: 1199,
      instructor_name: 'Michael Chen',
      curriculum: [
        'Scanner Technology Overview',
        'Data Acquisition Techniques',
        'Point Cloud Processing',
        'Quality Assurance',
        'Data Export & Integration',
        'Project Management',
      ],
      prerequisites: 'None',
    },
    {
      id: 4,
      title: 'BIM Project Management',
      description: 'Lead BIM projects with confidence and efficiency',
      duration: '25 hours',
      level: 'Intermediate',
      price: 799,
      instructor_name: 'Emma Davis',
      curriculum: [
        'BIM Strategy & Planning',
        'Team Coordination',
        'Quality Control',
        'Schedule Management',
        'Budget Tracking',
        'Client Communication',
      ],
      prerequisites: 'Basic BIM knowledge',
    },
    {
      id: 5,
      title: 'GIS Web Development',
      description: 'Create interactive web-based GIS applications',
      duration: '45 hours',
      level: 'Advanced',
      price: 1499,
      instructor_name: 'Robert Wilson',
      curriculum: [
        'Web GIS Concepts',
        'Mapping APIs',
        'Data Visualization Libraries',
        'Interactive Mapping',
        'Web Performance Optimization',
        'Deployment Strategies',
      ],
      prerequisites: 'GIS and web development experience',
    },
    {
      id: 6,
      title: 'Drone Survey & Photogrammetry',
      description: 'Aerial survey techniques and image processing',
      duration: '28 hours',
      level: 'Beginner',
      price: 699,
      instructor_name: 'Lisa Anderson',
      curriculum: [
        'Drone Technology',
        'Flight Planning & Safety',
        'Image Capture Techniques',
        'Photogrammetry Processing',
        'Data Export & Analysis',
        'Regulations & Compliance',
      ],
      prerequisites: 'None',
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-4">Professional Training</h1>
            <p className="text-xl opacity-90">Develop expertise with industry-leading courses</p>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-20 lg:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div key={course.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold flex-1">{course.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-2 ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6 line-clamp-2">{course.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={16} className="text-secondary" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users size={16} className="text-secondary" />
                        <span>{course.instructor_name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Award size={16} className="text-secondary" />
                        <span>Certificate of Completion</span>
                      </div>
                    </div>

                    <div className="border-t border-border pt-6">
                      <div className="text-3xl font-bold mb-4">${course.price}</div>
                      <Button
                        onClick={() => setSelectedCourse(course)}
                        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Course Details Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-lg p-8 max-w-2xl max-h-screen overflow-y-auto">
              <h2 className="text-3xl font-bold mb-4">{selectedCourse.title}</h2>
              <p className="text-muted-foreground mb-6">{selectedCourse.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{selectedCourse.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Level</p>
                  <p className="font-semibold">{selectedCourse.level}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Instructor</p>
                  <p className="font-semibold">{selectedCourse.instructor_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-semibold text-2xl">${selectedCourse.price}</p>
                </div>
              </div>

              {selectedCourse.prerequisites && (
                <div className="mb-6">
                  <p className="font-semibold mb-2">Prerequisites</p>
                  <p className="text-muted-foreground">{selectedCourse.prerequisites}</p>
                </div>
              )}

              <div className="mb-6">
                <p className="font-semibold mb-4">Curriculum</p>
                <ul className="space-y-2">
                  {selectedCourse.curriculum?.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                <Link href="/contact" className="flex-1">
                  <Button size="lg" className="w-full bg-secondary hover:bg-secondary/90">
                    Enroll Now
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setSelectedCourse(null)}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
