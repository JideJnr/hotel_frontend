import { IonContent, IonLabel, IonPage, useIonRouter } from '@ionic/react';
import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../../../components/button/button';
import { useAuth } from '../../../contexts/AuthContext';
import { FormContainer, FormFooter, FormInput, PasswordInput } from '../../../components/forms';

const Signin = () => {
  const router = useIonRouter();
  const { login, loading, error: authError } = useAuth();

    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
  const [error, setError] = useState('');

  useEffect(() => {
    if (authError) setError(authError);
  }, [authError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };



  return (
    <IonPage>
      <IonContent>
      <FormContainer title="Login" subtitle="Please login to continue">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <FormInput
            label="Email"
            name="email"
            type="string"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
          />

          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
          />

          <Button
            text='Login'
            loadingText='Loading...'
            type="submit"
            loading={loading}
            className="w-full"
          />

          <div className="text-center mt-2">
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <FormFooter
            promptText="Don't have an account"
            linkText="Sign up"
            linkPath="/signup"
          />
        </form>
      </FormContainer>
      </IonContent>
    </IonPage>
  );
};

export default Signin;