import { ref } from "vue";
import { defineStore } from "pinia";

export const useToast = defineStore("useToast", () => {
  const showToast = ref(false);
  const toastText = ref("");
  const bgColor = ref("");
  const icon = ref("");

  const addToast = (text: string, status: string) => {
    showToast.value = true;
    toastText.value = text;
    switch (status) {
      case "success":
        bgColor.value = "bg-green-100";
        icon.value = "bx-check-circle"
        break;
      case "error":
        bgColor.value = "bg-red-400";
        icon.value = "bx-error-alt"
        break;
      case "info":
        bgColor.value = "bg-yellow-300";
        break;
    }
    setTimeout(() => {
      showToast.value = false;
      toastText.value = "";
      bgColor.value = "";
    }, 2000);
  };
  return { showToast, addToast, bgColor, toastText, icon };
});
