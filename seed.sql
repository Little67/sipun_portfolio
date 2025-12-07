-- Insert sample data into the 'works' table
INSERT INTO public.works (title, category, image_url) VALUES
('Mountain Solitude', 'Nature', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2000&auto=format&fit=crop'),
('Urban Soul', 'Portrait', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop'),
('City Lights', 'Urban', 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000&auto=format&fit=crop'),
('Neon Dreams', 'Abstract', 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop'),
('Modern Lines', 'Architecture', 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2000&auto=format&fit=crop'),
('Ocean Breeze', 'Travel', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop');

-- Insert sample data into the 'posts' table (for Social page)
INSERT INTO public.posts (type, content_url, caption) VALUES
('image', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop', 'Behind the scenes from today''s shoot! 📸 #photography #bts'),
('image', 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop', 'Hiking up to catch the sunrise. Totally worth it.');
