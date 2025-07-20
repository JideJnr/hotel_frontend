import { IonLabel, IonPage, useIonRouter } from '@ionic/react';
import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import OnboardingTemplate from '../../../components/templates/onboarding/onboarding';
import Button from '../../../components/button/button';
import { useAuth } from '../../../contexts/AuthContext';

const Signin = () => {
  const router = useIonRouter();
  const { login, loading, error: authError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authError) setError(authError);
  }, [authError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      router.push('/home', 'root');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <IonPage>
      <div className="flex items-center justify-center min-h-screen px-6 bg-white">
       
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Login</h2>
        <p className="text-sm text-gray-600">Please login to continue</p>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <Button text='Login' loadingText='loading...' type="submit" loading={loading} className="w-full">
          
        </Button>

        <div className="text-center mt-2">
          <a href="#" className="text-sm text-indigo-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <div className="flex items-center gap-2 mt-6">
          <hr className="flex-grow border-gray-300" />
          <span className="text-sm text-gray-400">Or login with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex justify-center space-x-4 mt-2">
          <button type="button" className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md">
            <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" className="w-5 h-5" />
            Facebook
          </button>
          <button type="button" className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md">
            <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Google" className="w-5 h-5" />
            Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{' '}
          <a href="/auth/signup" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  </IonPage>
  );
};

export default Signin;
