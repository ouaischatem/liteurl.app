import {toast, type ToastType} from "vue3-toastify";
import "vue3-toastify/dist/index.css"

export const sendToast = (title: string, type: ToastType) => {
    toast(title, {
        "theme": "colored",
        "type": type,
        "position": "bottom-right",
        "autoClose": 3000,
        "dangerouslyHTMLString": true
    });
};
