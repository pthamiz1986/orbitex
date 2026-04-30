'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface AboutContent {
  company_story: string;
  mission: string;
  vision: string;
  years_experience: number;
  projects_completed: number;
  team_members: number;
}

export default function AboutEditorPage() {
  const [content, setContent] = useState<AboutContent>({
    company_story: 'ORBITEX is a leading provider of geospatial solutions...',
    mission: 'Deliver innovative geospatial technology solutions',
    vision: 'Transform how organizations use spatial data',
    years_experience: 15,
    projects_completed: 250,
    team_members: 45,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('admin_about');
    if (saved) {
      setContent(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  const handleSave = () => {
    localStorage.setItem('admin_about', JSON.stringify(content));
    alert('About page content saved!');
  };

  if (isLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Edit About Page</h1>
          <Link href="/admin/dashboard">
            <Button variant="outline">Back</Button>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Company Story</label>
            <textarea
              value={content.company_story}
              onChange={(e) => setContent({ ...content, company_story: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Mission</label>
            <input
              type="text"
              value={content.mission}
              onChange={(e) => setContent({ ...content, mission: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Vision</label>
            <input
              type="text"
              value={content.vision}
              onChange={(e) => setContent({ ...content, vision: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Years of Experience</label>
              <input
                type="number"
                value={content.years_experience}
                onChange={(e) => setContent({ ...content, years_experience: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Projects Completed</label>
              <input
                type="number"
                value={content.projects_completed}
                onChange={(e) => setContent({ ...content, projects_completed: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Team Members</label>
              <input
                type="number"
                value={content.team_members}
                onChange={(e) => setContent({ ...content, team_members: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-border rounded-lg"
              />
            </div>
          </div>

          <Button onClick={handleSave} className="w-full bg-secondary">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
