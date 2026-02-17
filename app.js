const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'DevOps CI/CD Pipeline Project is running!',
    author: 'Jalaj Kumar',
    version: '1.0.0',
  });
});

// Health check endpoint — standard in cloud/DevOps deployments
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Status endpoint — useful for monitoring dashboards & alerts
app.get('/status', (req, res) => {
  res.status(200).json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString(),
  });
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Only start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;

