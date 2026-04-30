'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';
import Image from 'next/image';

interface HomepageContent {
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  cta_text: string;
  cta_link: string;
}

const DEFAULT_CONTENT: HomepageContent = {
  hero_title: 'Advanced Geospatial Solutions',
  hero_subtitle: 'Precision Data, Expertise, Innovation',
  hero_description: 'Enterprise-grade geospatial data, BIM consulting, and 3D scanning solutions',
  cta_text: 'Explore Our Services',
  cta_link: '/services',
};

export default function HomepageEditor() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [content, setContent] = useState<HomepageContent>(DEFAULT_CONTENT);

  useEffect(() => {
    const saved = localStorage.getItem('admin_homepage_content');
    if (saved) {
      setContent(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem('admin_homepage_content', JSON.stringify(content));
    setSuccess('Homepage updated successfully!');
    setTimeout(() => setSuccess(''), 3000);
    setIsSaving(false);
  };

  if (isLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Edit Homepage</h1>
          <Link href="/admin/dashboard">
            <Button variant="outline">
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
          </Link>
        </div>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center gap-2">
            <Check size={20} />
            {success}
          </div>
        )}

        <div className="bg-card border border-border rounded-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Logo Preview</label>
            <div className="bg-primary rounded-lg p-8 flex justify-center">
              <Image
                src="/orbitex-logo.png"
                alt="ORBITEX Logo"
                width={150}
                height={150}
                className="object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Logo: /orbitex-logo.png (Static)</p>
          </div>

          <hr />

          <div>
            <label className="block text-sm font-medium mb-2">Hero Title</label>
            <input
              type="text"
              value={content.hero_title}
              onChange={(e) => setContent({ ...content, hero_title: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
            <input
              type="text"
              value={content.hero_subtitle}
              onChange={(e) => setContent({ ...content, hero_subtitle: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Hero Description</label>
            <textarea
              value={content.hero_description}
              onChange={(e) => setContent({ ...content, hero_description: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">CTA Button Text</label>
              <input
                type="text"
                value={content.cta_text}
                onChange={(e) => setContent({ ...content, cta_text: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">CTA Button Link</label>
              <input
                type="text"
                value={content.cta_link}
                onChange={(e) => setContent({ ...content, cta_link: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg"
              />
            </div>
          </div>

          <Button onClick={handleSave} disabled={isSaving} className="w-full bg-secondary">
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
