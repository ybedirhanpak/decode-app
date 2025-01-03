import { SandpackFiles } from "@codesandbox/sandpack-react";

const BUTTON_JS = `import React from "react";
import styles from "./Button.module.css";

function Button({
    variant = "primary",
    disabled = false,
    children,
    onClick
}) {
    return (
        <button
            className={\`\${styles.button} \${styles[variant]} \${disabled ? styles.disabled : ""}\`}
            onClick={onClick}
            disabled={disabled}
        >
            <span className={styles.content}>{children}</span>
        </button>
    );
}

export default Button;
`;

const BUTTON_MODULE_CSS = `.button {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    font-family: "Inter", sans-serif;
    font-size: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.primary {
    background-color: #66785f;
    color: #fff;
}

.primary:hover {
    background-color: #556849;
}

.primary:active {
    background-color: #495c3e;
}

.primary.disabled {
    background-color: #bcc5b2;
    color: #e2e2e2;
    cursor: default;
}

.secondary {
    background-color: #4b5945;
    color: #fff;
}

.secondary:hover {
    background-color: #3f4c3b;
}

.secondary:active {
    background-color: #364032;
}

.secondary.disabled {
    background-color: #a8b0a2;
    color: #e2e2e2;
    cursor: default;
}

.accent {
    background-color: #eff3ea;
    color: #171717;
}

.accent:hover {
    background-color: #d9e0cf;
}

.accent:active {
    background-color: #c4d1b7;
}

.accent.disabled {
    background-color: #e8ece3;
    color: #a3a3a3;
    cursor: default;
}

.content {
    display: flex;
    gap: 4px;
    align-items: center;
}
`;

const APP_JS = `// App.js
import React from "react";
import Button from "./Button";

import styles from "./App.module.css";

function App() {
    return (
        <div className={styles.app}>
            <section>
                <h2>Primary</h2>
                <div className={styles.row}>
                    <Button>Default</Button>
                    <Button disabled>Disabled</Button>
                    <Button className={styles.hover}>Hover</Button>
                    <Button className={styles.pressed}>Pressed</Button>
                </div>
            </section>
            <hr />
            <section>
                <h2>Secondary</h2>
                <div className={styles.row}>
                    <Button variant="secondary">Default</Button>
                    <Button variant="secondary" disabled>Disabled</Button>
                    <Button variant="secondary" className={styles.hover}>Hover</Button>
                    <Button variant="secondary" className={styles.pressed}>Pressed</Button>
                </div>
            </section>
            <hr />
            <section>
                <h2>Accent</h2>
                <div className={styles.row}>
                    <Button variant="accent">Default</Button>
                    <Button variant="accent" disabled>Disabled</Button>
                    <Button variant="accent" className={styles.hover}>Hover</Button>
                    <Button variant="accent" className={styles.pressed}>Pressed</Button>
                </div>
            </section>
        </div>
    );
}

export default App;
`;

const APP_MODULE_CSS = `/* App.module.css */
.app {
    font-family: Arial, sans-serif;
    margin: 20px;
}

h2 {
    font-size: 16px;
    margin-bottom: 8px;
}

.row {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

hr {
    margin: 20px 0;
    border: none;
    border-top: 1px solid #ccc;
}

.hover {
    background-color: inherit; /* No visual effect; for showcasing state in storybook-like use */
}

.pressed {
    background-color: inherit; /* No visual effect; for showcasing state in storybook-like use */
}
`;

const exampleFiles: SandpackFiles = {
    "/App.js": {
        code: APP_JS,
    },
    "/App.module.css": {
        code: APP_MODULE_CSS,
    },
    "/Button.js": {
        code: BUTTON_JS,
    },
    "/Button.module.css": {
        code: BUTTON_MODULE_CSS,
    },
};

export { exampleFiles };
