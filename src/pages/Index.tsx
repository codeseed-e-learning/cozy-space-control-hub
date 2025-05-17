
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    // Auto redirect to dashboard if already logged in
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100">
      <div className="text-center space-y-6 max-w-3xl px-6">
        <h1 className="text-5xl font-bold text-primary">Property Dashboard</h1>
        <p className="text-xl text-muted-foreground">
          A complete solution for managing your properties, rooms, and bookings.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            size="lg"
            onClick={() => navigate('/login')}
            className="text-lg"
          >
            Login
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => navigate('/register')}
            className="text-lg"
          >
            Register
          </Button>
        </div>
        <div className="pt-12 text-sm text-muted-foreground">
          <p>Built with React, Tailwind CSS, and Shadcn UI</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
