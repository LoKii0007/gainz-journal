const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const cacheMiddleware = (key) => {
  return (req, res, next) => {
    const cacheKey = `${key}_${req.user.id}_${JSON.stringify(req.query)}`;
    const cached = cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return res.json(cached.data);
    }
    
    // Override res.json to cache the response
    const originalJson = res.json;
    res.json = function(data) {
      cache.set(cacheKey, { data, timestamp: Date.now() });
      return originalJson.call(this, data);
    };
    
    next();
  };
};

module.exports = { cacheMiddleware };