import m from "mithril";
import { App } from "./App";

const mountNode = document.querySelector("#app");
m.mount(mountNode, App);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js")
            .catch(err => console.error("failed to register:", err));
    });
};