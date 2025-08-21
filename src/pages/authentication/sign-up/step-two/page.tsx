import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FormContainer, FormInput, PasswordInput, FormFooter } from "../../../../components/forms";
import Button from "../../../../components/button/button";
import { useAuth } from "../../../../contexts/auth/AuthContext";


const SignupContinue = () => {
  const router = useIonRouter();
  const { signup, loading, error: authError } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [coreDetails, setCoreDetails] = useState<any>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("coreDetails");
    if (stored) setCoreDetails(JSON.parse(stored));
    else router.push("/auth/profile", "back", "replace");
  }, []);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors = {
      email: !formData.email ? "Email is required" : !validateEmail(formData.email) ? "Invalid email format" : "",
      password: formData.password.length < 6 ? "Password must be at least 6 characters" : "",
      confirmPassword: formData.confirmPassword !== formData.password ? "Passwords do not match" : "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const completeData = { ...coreDetails, ...formData };

    try {
      await signup(completeData);
      sessionStorage.removeItem("coreDetails");
      router.push("/home", "root");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to create account. Please try again.");
    }
  };

  return (
    
    <IonPage>
      <IonContent className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
        <FormContainer 
          title="Create your account" 
          subtitle="Set up your login credentials"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              error={errors.email}
              required
            />

            <PasswordInput
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              error={errors.password}
            />

            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
            />

            <Button 
              text="Create Account" 
              type="submit" 
              className="w-full"
              loading={loading}
              loadingText="Creating Account..."
            />

            <FormFooter
              promptText="Already have an account?"
              linkText="Sign in"
              linkPath="/sign-in"
            />
          </form>
        </FormContainer>
      </IonContent>
    </IonPage>
  );
};

export default SignupContinue;