const express = require('express');
const cors = require('cors');
const projects = require('./projects.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    message: "Leonardo Lama Portfolio API is running", 
    endpoints: ["/api/projects", "/api/profile"] 
  });
});

app.get('/api/projects', (req, res) => {
  const { tech } = req.query;

  if (tech) {
    const filteredProjects = projects.filter(p => 
      p.techStack.some(t => t.toLowerCase().includes(tech.toLowerCase()))
    );
    return res.json(filteredProjects);
  }

  res.json(projects);
});

app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
});

app.get('/api/profile', (req, res) => {
  res.json({
    name: "Leonardo Lama",
    role: "Fullstack Developer",
    bio: "Developer with experience in PHP, Laravel, JS Frameworks and Cloud Architecture.",
    location: "Bogotá, Colombia",
    social: {
      email: "leolama18@gmail.com",
      github: "https://github.com/lajolari"
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});