import { auth } from "../firebase/index";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useUser } from "../stores/user.ts";
import { useToast } from "../stores/toast.ts";
import router from "../router/index.ts";

export function useEmailAndPassword() {
  const userStore = useUser();
  const toast = useToast();

  const signUpWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res) {
        userStore.setUser(res.user);
        router.push("/dashboard");
        toast.addToast("You've signed up successfully", "success");
      }
    } catch (e: Event) {
      console.log(e);
      toast.addToast(`${e.message}`, "error");
    }
  };

  const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res) {
        userStore.setUser(res.user);
        console.log(res.user);
        
        router.push("/dashboard");
        toast.addToast("You've logged in successfully", "success");
      }
    } catch (e: Event) {
      console.log(e);
      toast.addToast(`${e.message}`, "error");
    }
  };
  return { signUpWithEmailAndPassword, logInWithEmailAndPassword };
}
