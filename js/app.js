import { getStyles } from "./storage.js";

const appStyle = (stylesData) => {
    const root = document.documentElement;

    for(const [property,value] of Object.entries(stylesData)){
        root.style.setProperty(property,value);
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    const stylesData = await getStyles();
    appStyle(stylesData);
});
