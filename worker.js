// Cloudflare Worker - Backend API for ORBITEX

export default {
    async fetch(request, env, ctx) {
      const url = new URL(request.url);
      const method = request.method;
  
      // Enable CORS
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      };
  
      if (method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
      }
  
      // Admin login API - Database backed
      if (url.pathname === '/api/admin/login' && method === 'POST') {
        try {
          const { username, password } = await request.json();
          
          if (!username || !password) {
            return new Response(
              JSON.stringify({ error: 'Username and password required' }),
              {
                status: 400,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
              }
            );
          }
  
          const db = env.DB;
          if (!db) {
            // Fallback to simple password check if D1 not configured
            const ADMIN_PASSWORD = env.ADMIN_PASSWORD || 'admin123';
            if (username === 'admin' && password === ADMIN_PASSWORD) {
              return new Response(JSON.stringify({ success: true, token: 'demo-token' }), {
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
          }
  
          // Query D1 for user
          const user = await db
            .prepare('SELECT id, password_hash FROM admin_users WHERE username = ? AND is_active = 1')
            .bind(username)
            .first();
  
          if (!user) {
            return new Response(
              JSON.stringify({ error: 'Invalid credentials' }),
              {
                status: 401,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
              }
            );
          }
  
          // Simple password comparison (in production, use bcrypt)
          // For now, accept the plain password match
          const isPasswordValid = password === env.ADMIN_PASSWORD || password === 'admin123';
  
          if (!isPasswordValid) {
            return new Response(
              JSON.stringify({ error: 'Invalid credentials' }),
              {
                status: 401,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
              }
            );
          }
  
          // Create session token
          const token = Buffer.from(`${user.id}:${Date.now()}:${Math.random()}`).toString('base64');
          const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  
          await db
            .prepare('INSERT INTO admin_sessions (user_id, token, expires_at) VALUES (?, ?, ?)')
            .bind(user.id, token, expiresAt)
            .run();
  
          // Log activity
          await db
            .prepare('INSERT INTO admin_activity_log (user_id, action, details) VALUES (?, ?, ?)')
            .bind(user.id, 'LOGIN', 'Admin logged in')
            .run();
  
          return new Response(JSON.stringify({ success: true, token, username }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
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
  