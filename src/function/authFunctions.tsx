import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getCurrentDate } from "./getCurrentDate";
import { auth, db } from "../../firebase";
import { useIonRouter } from "@ionic/react";

const setState = (setLoading, setError, loadingState, errorMessage = "") => {
  setLoading(loadingState);
  setError(errorMessage);
};

export const handleSignIn = async (
  email,
  password,
  setError,
  setLoading,
  navigate,
) => {
  const router = useIonRouter();
  if (email === "" || password === "") {
    setState(setLoading, setError, false, "Input All Fields!!!");
    return;
  }

  setState(setLoading, setError, true);

  try {
    await signInWithEmailAndPassword(auth, email, password);
    setState(setLoading, setError, false);
    router.push("/home");
  } catch (err) {
    setState(
      setLoading,
      setError,
      false,
      "Failed to sign in. Please check your credentials and try again.",
    );
  }
};

export const handleSignUp = async (
  email,
  password,
  img,
  username,
  clientName,
  address,
  setError,
  setLoading,
  navigate,
) => {
  const router = useIonRouter();
  if (email === "" || password === "" || !img) {
    setState(setLoading, setError, false, "Input All Fields!!!");
    return;
  }

  setState(setLoading, setError, true);

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const storage = getStorage();
    const sanitizedUsername = username.replace(/[^a-zA-Z0-9]/g, "");
    const storageRef = ref(
      storage,
      `profile_images/${sanitizedUsername}-${new Date().toISOString()}`,
    );
    const imageSnapshot = await uploadBytes(storageRef, img);
    const imageUrl = await getDownloadURL(imageSnapshot.ref);
    const createdDate = getCurrentDate();

    await setDoc(doc(db, "clientRecord", userCredential.user.uid), {
      uid: userCredential.user.uid,
      imageUrl,
      username,
      clientName,
      email,
      address,
      createdDate,
    });

    setState(setLoading, setError, false);
    router.push("/home");
  } catch (err) {
    setState(
      setLoading,
      setError,
      false,
      "Failed to sign up. Please check your information and try again.",
    );
  }
};

export const handleSignout = async (setError, setLoading, navigate) => {
  const user = auth.currentUser;
  const router = useIonRouter();
  if (!user) {
    setState(setLoading, setError, false, "No user is signed in.");
    return;
  }

  setState(setLoading, setError, true);

  try {
    await signOut(auth);
    setState(setLoading, setError, false);
    router.push("/");
  } catch (err) {
    setState(
      setLoading,
      setError,
      false,
      "Failed to sign out. Please try again.",
    );
  }
};
