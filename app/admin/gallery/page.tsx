'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, Edit2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  client_name: string;
  year: number;
}

export default function GalleryEditorPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('admin_gallery');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      const defaults: Project[] = [
        {
          id: '1',
          title: 'Downtown Development Project',
          description: 'Large-scale urban development with BIM coordination',
          category: 'BIM',
          client_name: 'City Development Corp',
          year: 2023,
        },
        {
          id: '2',
          title: 'Geographic Analysis Study',
          description: 'Comprehensive GIS analysis for regional planning',
          category: 'GIS',
          client_name: 'Planning Authority',
          year: 2023,
        },
        {
          id: '3',
          title: 'Bridge Structure Survey',
          description: '3D scanning and survey for infrastructure assessment',
          category: 'Scanning',
          client_name: 'Infrastructure Solutions Ltd',
          year: 2022,
        },
      ];
      setProjects(defaults);
      localStorage.setItem('admin_gallery', JSON.stringify(defaults));
    }
    setIsLoading(false);
  }, []);

  const handleSave = () => {
    if (editingId) {
      const updated = projects.map(p => p.id === editingId ? { ...p, ...formData } : p);
      setProjects(updated);
      localStorage.setItem('admin_gallery', JSON.stringify(updated));
    }
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('admin_gallery', JSON.stringify(updated));
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData(project);
  };

  if (isLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Gallery Projects</h1>
          <Link href="/admin/dashboard">
            <Button variant="outline">Back</Button>
          </Link>
        </div>

        {editingId && (
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Edit Project</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Project Title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg"
              />
              <textarea
                placeholder="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={formData.category || 'BIM'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                >
                  <option>BIM</option>
                  <option>GIS</option>
                  <option>Scanning</option>
                </select>
                <input
                  type="text"
                  placeholder="Client Name"
                  value={formData.client_name || ''}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                />
              </div>
              <input
                type="number"
                placeholder="Year"
                value={formData.year || new Date().getFullYear()}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-border rounded-lg"
              />
              <div className="flex gap-2">
                <Button onClick={handleSave} className="bg-secondary">Save</Button>
                <Button onClick={() => setEditingId(null)} variant="outline">Cancel</Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-2">{project.description}</p>
                  <div className="text-sm space-y-1">
                    <p><strong>Category:</strong> {project.category}</p>
                    <p><strong>Client:</strong> {project.client_name}</p>
                    <p><strong>Year:</strong> {project.year}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(project)}>
                    <Edit2 size={16} />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(project.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
