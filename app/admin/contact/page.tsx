'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ContactContent {
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  office_hours: string;
  support_email: string;
  inquiry_email: string;
}

export default function ContactEditorPage() {
  const [content, setContent] = useState<ContactContent>({
    email: 'info@orbitex.com',
    phone: '+91 XXXXX XXXXX',
    address: 'Bangalore, India',
    city: 'Bangalore',
    country: 'India',
    office_hours: 'Monday to Friday, 9:00 AM - 6:00 PM IST',
    support_email: 'support@orbitex.com',
    inquiry_email: 'inquiry@orbitex.com',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('admin_contact_content');
    if (saved) {
      try {
        setContent(JSON.parse(saved));
      } catch (e) {
        console.log('[v0] Error parsing contact content:', e);
      }
    }
    setIsLoading(false);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const workerApi = process.env.NEXT_PUBLIC_WORKER_API || 'https://orbitex-api.pthamiz.workers.dev';
      
      console.log('[v0] Saving contact to Worker API:', content);
      
      const response = await fetch(`${workerApi}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        // Also save to localStorage as backup
        localStorage.setItem('admin_contact_content', JSON.stringify(content));
        alert('Contact information updated successfully!');
      } else {
        alert('Error saving to server');
      }
    } catch (error) {
      console.log('[v0] Save error:', error);
      // Save locally anyway
      localStorage.setItem('admin_contact_content', JSON.stringify(content));
      alert('Contact information saved locally!');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Edit Contact Page</h1>
          <Link href="/admin/dashboard">
            <Button variant="outline">Back</Button>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Main Email</label>
            <input
              type="email"
              value={content.email}
              onChange={(e) => setContent({ ...content, email: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              value={content.phone}
              onChange={(e) => setContent({ ...content, phone: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Office Address</label>
            <input
              type="text"
              value={content.address}
              onChange={(e) => setContent({ ...content, address: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <input
                type="text"
                value={content.city}
                onChange={(e) => setContent({ ...content, city: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <input
                type="text"
                value={content.country}
                onChange={(e) => setContent({ ...content, country: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Office Hours</label>
            <input
              type="text"
              value={content.office_hours}
              onChange={(e) => setContent({ ...content, office_hours: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Support Email</label>
              <input
                type="email"
                value={content.support_email}
                onChange={(e) => setContent({ ...content, support_email: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Inquiry Email</label>
              <input
                type="email"
                value={content.inquiry_email}
                onChange={(e) => setContent({ ...content, inquiry_email: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg"
              />
            </div>
          </div>

          <Button 
            onClick={handleSave} 
            className="w-full bg-secondary"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
