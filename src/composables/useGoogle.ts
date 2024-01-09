import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/index";
import router from "../router/index.ts";
import { useUser } from "../stores/user.ts";
import { useToast } from "../stores/toast.ts";

export function useGoogle() {
  const userStore = useUser();
  const toast = useToast();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in.
      userStore.setUser(user);
    } else {
      // User is signed out.
      userStore.setUser(null);
      userStore.userIsLoggedIn = false
    }
  });

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      userStore.setUser(user);

      router.push("/dashboard");
      toast.addToast("You've signed in successfully", "success");
      // User is signed in via Google.
    } catch (error) {
      toast.addToast("An error occured", "error");
    }
  };

  const signOutFromGoogle = async () => {
    try {
      await signOut(auth);
      router.push("/");
      toast.addToast("You've successfully logged out", "success");
      // Logged Out
    } catch (e) {
      toast.addToast("An error occured", "error");
    }
  };
  return { signInWithGoogle, signOutFromGoogle };
}
