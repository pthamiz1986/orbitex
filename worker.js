// Cloudflare Worker - Backend API for ORBITEX

// In-memory storage for demo (replace with D1 or KV for production)
let contentStore = {
    homepage: {
      hero_title: 'Advanced Geospatial Solutions',
      hero_subtitle: 'Precision Data, Expertise, Innovation',
      hero_description: 'Enterprise-grade geospatial data, BIM consulting, and 3D scanning solutions',
      cta_text: 'Explore Our Services',
      cta_link: '/services',
    },
    services: [
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
    ],
  };
  
  export default {
    async fetch(request, env) {
      const { url, method } = new URL(request.url);
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      };
  
      // Handle CORS preflight
      if (method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: corsHeaders,
        });
      }
  
      const url_path = new URL(request.url).pathname;
  
      // Get homepage content
      if (url_path === '/api/homepage' && method === 'GET') {
        return new Response(JSON.stringify(contentStore.homepage), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
  
      // Update homepage content
      if (url_path === '/api/homepage' && method === 'POST') {
        try {
          const data = await request.json();
          contentStore.homepage = { ...contentStore.homepage, ...data };
          console.log('[v0] Homepage updated:', contentStore.homepage);
          
          return new Response(JSON.stringify(contentStore.homepage), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: 'Failed to update homepage' }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            }
          );
        }
      }
  
      // Get services
      if (url_path === '/api/services' && method === 'GET') {
        return new Response(JSON.stringify(contentStore.services), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
  
      // Update services
      if (url_path === '/api/services' && method === 'POST') {
        try {
          const data = await request.json();
          contentStore.services = Array.isArray(data) ? data : contentStore.services;
          console.log('[v0] Services updated:', contentStore.services);
          
          return new Response(JSON.stringify(contentStore.services), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: 'Failed to update services' }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            }
          );
        }
      }
  
      // Admin login API - Using environment variable password
      if (url.pathname === '/api/admin/login' && method === 'POST') {
        try {
          const { username, password } = await request.json();
          const ADMIN_PASSWORD = env.ADMIN_PASSWORD || 'admin123';
          
          if (!username || !password) {
            return new Response(
              JSON.stringify({ error: 'Username and password required' }),
              {
                status: 400,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
              }
            );
          }
  
          // Simple authentication
          if (username === 'admin' && password === ADMIN_PASSWORD) {
            // Generate simple token (no Buffer in Workers)
            const token = btoa(`admin:${Date.now()}:${Math.random()}`);
            
            return new Response(JSON.stringify({ success: true, token, username: 'admin' }), {
              status: 200,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          }
  
          return new Response(
            JSON.stringify({ error: 'Invalid credentials' }),
            {
              status: 401,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            }
          );
        } catch (error) {
          console.log('[v0] Login error:', error);
          return new Response(
            JSON.stringify({ error: 'Authentication failed' }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            }
          );
        }
      }
  
      // Get homepage content
      if (url.pathname === '/api/content/homepage' && method === 'GET') {
        return new Response(
          JSON.stringify({
            hero_title: 'Advanced Geospatial Solutions',
            hero_subtitle: 'Precision Data, Expertise, Innovation',
            hero_description: 'Enterprise-grade geospatial data, BIM consulting, and 3D scanning solutions',
            cta_text: 'Explore Our Services',
            cta_link: '/services',
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );
      }
  
      // Update homepage content
      if (url.pathname === '/api/content/homepage' && method === 'POST') {
        try {
          const content = await request.json();
          // In production, save to database or KV storage
          console.log('[v0] Saving homepage content:', content);
          
          return new Response(JSON.stringify({ success: true, data: content }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: 'Failed to save content' }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            }
          );
        }
      }
  
      // Get services
      if (url.pathname === '/api/content/services' && method === 'GET') {
        return new Response(
          JSON.stringify([
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
          ]),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );
      }
  
      // Update services
      if (url.pathname === '/api/content/services' && method === 'POST') {
        try {
          const services = await request.json();
          console.log('[v0] Saving services:', services);
          
          return new Response(JSON.stringify({ success: true, data: services }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: 'Failed to save services' }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            }
          );
        }
      }
  
      // Health check
      if (url.pathname === '/health' && method === 'GET') {
        return new Response(JSON.stringify({ status: 'ok' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
  
      // Default 404
      return new Response(JSON.stringify({ 
        message: 'ORBITEX Backend API',
        status: 'online',
        endpoints: [
          'POST /api/admin/login - Admin authentication',
          'GET /api/homepage - Get homepage content',
          'POST /api/homepage - Update homepage content',
        ]
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    },
  };
  