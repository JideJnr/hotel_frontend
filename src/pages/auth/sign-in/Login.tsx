import { IonLabel, useIonRouter } from "@ionic/react";
import OnboardingPage from "../../../components/OnboardingPage";
import { useState } from "react";
import { handleSignIn } from "../../../function/authFunctions";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase";

const Login = () => {
  const router = useIonRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useIonRouter();
  const isInvalid = password === "" || email === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (email === "" || password === "") {
      setError("Input All Fields!!!");
      return;
    }
    setLoading(true); // Start loading
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home");
    } catch (err) {
      setError(err.message); // Update error state with error message
    }
    setLoading(false); // Stop loading
  };

  return (
    <OnboardingPage titleOne="Welcome to" titleTwo="BJ Hotels Portal">
      <div>
        <div className="blob fixed top-24 translate-y-24 -left-5"></div>

        <form>
          <div className="form-field">
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

          <div className="form-field">
            <IonLabel>Password</IonLabel>
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

          <button className="rccg-btn-primary" onClick={handleSubmit}>
            Continue
          </button>
        </form>

        <div className="ring-blob fixed bottom-24 -translate-y-16 -right-12"></div>
      </div>
    </OnboardingPage>
  );
};

export default Login;
