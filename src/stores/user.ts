import { ref } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";
import type { User } from "firebase/auth";

const USER_STORAGE_KEY = "userState";

export const useUser = defineStore("user", () => {
  const user = ref<User | null>(null);
  const createNewBoard = ref<boolean>(false);
  const userIsLoggedIn = ref(false)
  // Try to retrieve user state from localStorage on store initialization
  const storedUserState = localStorage.getItem(USER_STORAGE_KEY);
  if (storedUserState) {
    user.value = JSON.parse(storedUserState);
    userIsLoggedIn.value = true
  }
  const setUser = (userDetail: Object | null) => {
    user.value = userDetail;
    userIsLoggedIn.value = true
    // Save user state to localStorage whenever it changes
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userDetail));
  };

  return { user, setUser, createNewBoard, userIsLoggedIn };
});

// hmr
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot));
}
