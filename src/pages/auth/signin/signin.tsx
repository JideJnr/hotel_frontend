import { IonLabel, useIonRouter } from "@ionic/react";
import OnboardingPage from "../../../components/OnboardingPage";
import { useState } from "react";
import { auth } from "../../../../firebase";
import SignUp from "../signup/signup";
import ResetPassword from "../resetpassword/ResetPassword";
import { formatDate } from "react-datepicker/dist/date_utils";
import Button from "../../../components/button/button";
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";

const SignIn = () => {
  const router = useIonRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (email.trim() === "" || password.trim() === "") {
      setError("Please fill in all fields!");
      return;
    }

    setLoading(true); // Start loading
    try {
      // Set Firebase persistence to browserLocalPersistence
      await setPersistence(auth, browserLocalPersistence);

      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in user:", userCredential.user);

      // Navigate to the home page
      router.push("/home");
    } catch (err: any) {
      console.error("Sign-in error:", err.message); // Log error details
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const [signupModal, setSignupModal] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);

  return (
    <OnboardingPage titleOne="Sign In">
      <div>
        <div className="blob fixed top-24 translate-y-24 -left-5"></div>
        {!signupModal && !forgotPasswordModal && (
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p>{error}</p>
              <IonLabel>Email / Phone number</IonLabel>
              <input
                id="email"
                onChange={({ target }) => setEmail(target.value)}
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <IonLabel>Password</IonLabel>
                <p
                  onClick={() => {
                    setForgotPasswordModal(true);
                  }}
                  className="text-emerald-400 font-semibold"
                >
                  Forgot Password?
                </p>
              </div>
              <input
                id="password"
                onChange={({ target }) => setPassword(target.value)}
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <Button
              text="Sign In"
              loading={loading}
              loadingText="Signing In"
              className="!w-full !mx-auto"
              onClick={() => {
                handleSubmit();
              }}
            />

            <p className="w-fit mx-auto">
              Dont have an account?
              <span
                className="ml-1 text-emerald-400 font-semibold "
                onClick={() => {
                  setSignupModal(true);
                }}
              >
                Sign Up
              </span>
            </p>
          </div>
        )}

        {signupModal && (
          <>
            <SignUp formData={formData} setFormData={setSignupModal} />
          </>
        )}

        {forgotPasswordModal && (
          <ResetPassword setFormData={setForgotPasswordModal} />
        )}

        <div className="ring-blob fixed bottom-24 -translate-y-16 -right-12"></div>
      </div>
    </OnboardingPage>
  );
};

export default SignIn;
