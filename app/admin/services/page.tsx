'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Edit2, Trash2 } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  icon_name: string;
  features: string[];
  capabilities: string[];
}

export default function ServicesEditorPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('admin_services');
    if (saved) {
      setServices(JSON.parse(saved));
    } else {
      const defaults: Service[] = [
        {
          id: 'bim',
          name: 'BIM Consulting',
          description: 'Building Information Modeling expertise',
          icon_name: 'Building2',
          features: ['3D Model Development', 'Clash Detection'],
          capabilities: ['Revit Expertise', 'Training'],
        },
        {
          id: 'gis',
          name: 'GIS Solutions',
          description: 'Geospatial Information Systems',
          icon_name: 'Map',
          features: ['Spatial Analysis', 'Data Mapping'],
          capabilities: ['ArcGIS Platform', 'Integration'],
        },
        {
          id: 'scan',
          name: 'Scan & Survey',
          description: '3D scanning and surveying',
          icon_name: 'Scan',
          features: ['Point Clouds', 'Survey Grade'],
          capabilities: ['LiDAR', 'Processing'],
        },
      ];
      setServices(defaults);
      localStorage.setItem('admin_services', JSON.stringify(defaults));
    }
    setIsLoading(false);
  }, []);

  const handleSave = () => {
    if (editingId && formData) {
      const updated = services.map(s => s.id === editingId ? { ...s, ...formData } : s);
      setServices(updated);
      localStorage.setItem('admin_services', JSON.stringify(updated));
    }
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    const updated = services.filter(s => s.id !== id);
    setServices(updated);
    localStorage.setItem('admin_services', JSON.stringify(updated));
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData(service);
  };

  if (isLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Services</h1>
          <Link href="/admin/dashboard">
            <Button variant="outline">Back</Button>
          </Link>
        </div>

        {editingId && (
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Edit Service</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Service Name</label>
                <input
                  type="text"
                  placeholder="Service Name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  placeholder="Description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg mt-1"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Icon Name (Building2, Map, Scan)</label>
                <input
                  type="text"
                  placeholder="Icon name"
                  value={formData.icon_name || ''}
                  onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Features (comma separated)</label>
                <textarea
                  placeholder="Feature 1, Feature 2, Feature 3"
                  value={formData.features?.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value.split(',').map(f => f.trim()) })}
                  className="w-full px-4 py-2 border border-border rounded-lg mt-1"
                  rows={2}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Capabilities (comma separated)</label>
                <textarea
                  placeholder="Capability 1, Capability 2, Capability 3"
                  value={formData.capabilities?.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, capabilities: e.target.value.split(',').map(c => c.trim()) })}
                  className="w-full px-4 py-2 border border-border rounded-lg mt-1"
                  rows={2}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave} className="bg-secondary">Save Changes</Button>
                <Button onClick={() => setEditingId(null)} variant="outline">Cancel</Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                  <p className="text-muted-foreground mb-2">{service.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(service)}>
                    <Edit2 size={16} />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(service.id)}>
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
