import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useUser = defineStore('user', () => {
  const user = ref<Object | null>(null)
  const createNewBoard = ref<boolean>(false);


  const setUser = (userDetail: Object | null) => {
    user.value = userDetail
  }
  return { user, setUser, createNewBoard }
})

// hmr
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot));
}