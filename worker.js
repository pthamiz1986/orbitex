// Cloudflare Worker - Backend API for ORBITEX

const DEFAULT_HOMEPAGE = {
    hero_title: 'Advanced Geospatial Solutions',
    hero_subtitle: 'Precision Data, Expertise, Innovation',
    hero_description: 'Enterprise-grade geospatial data, BIM consulting, and 3D scanning solutions',
    cta_text: 'Explore Our Services',
    cta_link: '/services',
  };
  
  const DEFAULT_SERVICES = [
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
  ];
  
  export default {
    async fetch(request, env) {
      const url = new URL(request.url);
      const method = request.method;
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
  
      // Get homepage content
      if (url.pathname === '/api/homepage' && method === 'GET') {
        return new Response(JSON.stringify(DEFAULT_HOMEPAGE), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
  
      // Update homepage content
      if (url.pathname === '/api/homepage' && method === 'POST') {
        try {
          const data = await request.json();
          console.log('[v0] Homepage update received:', data);
          return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: 'Failed to update homepage' }),
            { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
          );
        }
      }
  
      // Get services
      if (url.pathname === '/api/services' && method === 'GET') {
        return new Response(JSON.stringify(DEFAULT_SERVICES), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
  
      // Update services
      if (url.pathname === '/api/services' && method === 'POST') {
        try {
          const data = await request.json();
          console.log('[v0] Services update received:', data);
          return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: 'Failed to update services' }),
            { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
          );
        }
      }
  
      // Admin login API
      if (url.pathname === '/api/admin/login' && method === 'POST') {
        try {
          const { username, password } = await request.json();
          const ADMIN_PASSWORD = env.ADMIN_PASSWORD || 'admin123';
          
          if (!username || !password) {
            return new Response(
              JSON.stringify({ error: 'Username and password required' }),
              { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
            );
          }
  
          if (username === 'admin' && password === ADMIN_PASSWORD) {
            const token = btoa(`admin:${Date.now()}:${Math.random()}`);
            return new Response(JSON.stringify({ success: true, token, username: 'admin' }), {
              status: 200,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          }
  
          return new Response(
            JSON.stringify({ error: 'Invalid credentials' }),
            { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
          );
        } catch (error) {
          return new Response(
            JSON.stringify({ error: 'Authentication failed' }),
            { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
          );
        }
      }
  
      // Default response
      return new Response(JSON.stringify({ 
        message: 'ORBITEX Backend API',
        status: 'online'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    },
  };
  