import { SandpackFiles } from "@codesandbox/sandpack-react";

import { ProjectVersion } from "@/app/model/ProjectVersion";
import { ProjectComponent } from "@/app/model/ProjectComponent";

import {
    APP_MODULE_CSS,
    BUTTON_JS,
    BUTTON_MODULE_CSS,
    BUTTON_PREVIEW,
    getAppJs,
} from "./files";

const initialComponents: ProjectComponent[] = [
    {
        id: crypto.randomUUID(),
        name: "Button",
        code: {
            code_react: BUTTON_JS,
            code_css: BUTTON_MODULE_CSS,
            code_preview: BUTTON_PREVIEW,
        },
    },
];

const componentNames = initialComponents.map(component => component.name);
const activeComponentName = initialComponents[0].name;

const filesBase: SandpackFiles = {
    "/App.js": {
        code: getAppJs(componentNames, activeComponentName),
    },
    "/App.module.css": {
        code: APP_MODULE_CSS,
    },
};

function getInitialFiles() {
    const files: SandpackFiles = { ...filesBase };

    initialComponents.forEach(component => {
        files[`/components/${component.name}.js`] = {
            code: component.code.code_react,
        };
        files[`/components/${component.name}.module.css`] = {
            code: component.code.code_css,
        };
        files[`/preview/${component.name}Preview.js`] = {
            code: component.code.code_preview,
        };
    });

    return files;
}

function getInitialVersions(): ProjectVersion {
    return {
        id: crypto.randomUUID(),
        index: 0,
        files: getInitialFiles(),
        date: new Date().toISOString(),
    };
}

const initialFiles = getInitialFiles();
const initialVersion = getInitialVersions();

export { initialComponents, initialFiles, initialVersion };
