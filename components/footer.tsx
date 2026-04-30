import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-4">ORBITEX</h3>
            <p className="text-sm opacity-80">
              Leading provider of geospatial data, BIM consulting, and advanced 3D scanning solutions.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services#bim" className="hover:opacity-80 transition-opacity">
                  BIM Consulting
                </Link>
              </li>
              <li>
                <Link href="/services#gis" className="hover:opacity-80 transition-opacity">
                  GIS Solutions
                </Link>
              </li>
              <li>
                <Link href="/services#scan" className="hover:opacity-80 transition-opacity">
                  Scan & Survey
                </Link>
              </li>
              <li>
                <Link href="/training" className="hover:opacity-80 transition-opacity">
                  Training Programs
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:opacity-80 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:opacity-80 transition-opacity">
                  Project Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:opacity-80 transition-opacity">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <span>info@orbitex.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>123 Tech Avenue, Innovation City, IC 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-80">
              &copy; 2024 ORBITEX. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
