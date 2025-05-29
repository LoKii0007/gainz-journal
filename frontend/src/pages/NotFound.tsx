import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground"
        >
          <ArrowLeft size={18} />
          <span>Go back home</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound; 