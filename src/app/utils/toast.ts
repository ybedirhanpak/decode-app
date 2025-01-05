function showToast(message: string, duration = 3000) {
    // If a toast is already shown, remove it
    const existingToast = document.querySelector(".toast");
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.add("hide");
        toast.addEventListener("animationend", () => toast.remove());
    }, duration);
}

export { showToast };
