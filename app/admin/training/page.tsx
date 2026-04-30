'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  price: number;
  instructor_name: string;
}

export default function TrainingEditorPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Course>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('admin_training');
    if (saved) {
      setCourses(JSON.parse(saved));
    } else {
      const defaults: Course[] = [
        {
          id: '1',
          title: 'Introduction to GIS',
          description: 'Learn the fundamentals of GIS technology',
          duration: '4 weeks',
          level: 'Beginner',
          price: 499,
          instructor_name: 'John Smith',
        },
        {
          id: '2',
          title: 'Advanced BIM Modeling',
          description: 'Master advanced BIM techniques and workflows',
          duration: '6 weeks',
          level: 'Advanced',
          price: 699,
          instructor_name: 'Jane Doe',
        },
        {
          id: '3',
          title: '3D Scanning Essentials',
          description: 'Get started with 3D scanning and point cloud processing',
          duration: '3 weeks',
          level: 'Intermediate',
          price: 399,
          instructor_name: 'Mike Johnson',
        },
      ];
      setCourses(defaults);
      localStorage.setItem('admin_training', JSON.stringify(defaults));
    }
    setIsLoading(false);
  }, []);

  const handleAddNew = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      title: 'New Course',
      description: '',
      duration: '4 weeks',
      level: 'Beginner',
      price: 499,
      instructor_name: '',
    };
    setCourses([...courses, newCourse]);
    setEditingId(newCourse.id);
    setFormData(newCourse);
  };

  const handleSave = () => {
    if (editingId) {
      const updated = courses.map(c => c.id === editingId ? { ...c, ...formData } : c);
      setCourses(updated);
      localStorage.setItem('admin_training', JSON.stringify(updated));
    }
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    const updated = courses.filter(c => c.id !== id);
    setCourses(updated);
    localStorage.setItem('admin_training', JSON.stringify(updated));
  };

  const handleEdit = (course: Course) => {
    setEditingId(course.id);
    setFormData(course);
  };

  if (isLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Training Courses</h1>
          <div className="flex gap-2">
            <Button onClick={handleAddNew} className="bg-secondary">
              <Plus size={16} className="mr-2" />
              Add Course
            </Button>
            <Link href="/admin/dashboard">
              <Button variant="outline">Back</Button>
            </Link>
          </div>
        </div>

        {editingId && (
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Edit Course</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Course Title"
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
                <input
                  type="text"
                  placeholder="Duration (e.g., 4 weeks)"
                  value={formData.duration || ''}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                />
                <select
                  value={formData.level || 'Beginner'}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Price"
                  value={formData.price || 0}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Instructor Name"
                  value={formData.instructor_name || ''}
                  onChange={(e) => setFormData({ ...formData, instructor_name: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="bg-secondary">Save</Button>
                <Button onClick={() => setEditingId(null)} variant="outline">Cancel</Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground mb-2">{course.description}</p>
                  <div className="text-sm space-y-1">
                    <p><strong>Duration:</strong> {course.duration}</p>
                    <p><strong>Level:</strong> {course.level}</p>
                    <p><strong>Price:</strong> ${course.price}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(course)}>
                    <Edit2 size={16} />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(course.id)}>
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
