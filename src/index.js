import m from "mithril";
import { App } from "./App";

const mountNode = document.querySelector("#app");
m.mount(mountNode, App);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        const swUrl = new URL(import.meta.env.BASE_URL + 'sw.js', window.location.origin);
        navigator.serviceWorker.register(swUrl)
            .catch(err => console.error("failed to register:", err));
    });
};
