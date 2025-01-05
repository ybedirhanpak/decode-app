import { SandpackFiles } from "@codesandbox/sandpack-react";

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
        versions: [
            {
                id: crypto.randomUUID(),
                index: 0,
                code: {
                    code_react: BUTTON_JS,
                    code_css: BUTTON_MODULE_CSS,
                    code_preview: BUTTON_PREVIEW,
                },
                date: new Date().toISOString(),
            },
        ],
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
            code: component.versions[0].code.code_react,
        };
        files[`/components/${component.name}.module.css`] = {
            code: component.versions[0].code.code_css,
        };
        files[`/preview/${component.name}Preview.js`] = {
            code: component.versions[0].code.code_preview,
        };
    });

    return files;
}

const initialFiles = getInitialFiles();

export { initialComponents, initialFiles };
