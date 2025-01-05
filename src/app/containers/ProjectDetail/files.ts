const BUTTON_JS = `import styles from "./Button.module.css";

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
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    font-size: 12px;
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

const BUTTON_PREVIEW = `import Button from "../components/Button";

export default function Preview() {
    return (
        <div>
            <div>
                <p>Primary:</p>
                <Button>
                    Primary Button
                </Button>
            </div>
            <br />
            <div>
                <p>Disabled:</p>
                <Button disabled>
                    Disabled Button
                </Button>
            </div>
        </div>
    );
}
`;

const APP_JS = `import ButtonPreview from "./preview/ButtonPreview";
import styles from "./App.module.css";

function App() {
    function renderPreview() {
        return <ButtonPreview />;
    }

    return (
        <div className={styles.app}>
            {renderPreview()}
        </div>
    );
}

export default App;
`;

const APP_MODULE_CSS = `/* App.module.css */
.app {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    padding: 12px;
    display: flex;
}

h2 {
    font-size: 16px;
    margin: 0 0 8px 0;
}

p {
    font-size: 12px;
    margin: 0 0 8px 0;
}

.row {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
}

hr {
    margin: 12px 0;
    border: none;
    border-top: 1px solid #ccc;
}

.sidebar {
    width: 200px;
    padding: 12px;
    border-right: 1px solid #ccc;
}

.preview {
    flex-grow: 1;
    padding: 12px 24px;
}

.componentItem {
    padding: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
    background-color: #efefef;
    color: #171717;
    border-radius: 4px;
}

.componentItem.active {
    background-color: #eff3ea;
    color: #171717;
}

.placeholder {
    color: #888;
    font-size: 14px;
}
`;

function getAppJsPreviewImports(componentNames: string[]) {
    return componentNames
        .map(
            componentName =>
                `import ${componentName}Preview from "./preview/${componentName}Preview";`
        )
        .join("\n");
}

function getAppJs(componentNames: string[], activeComponentName: string) {
    return `${getAppJsPreviewImports(componentNames)}
import styles from "./App.module.css";

function App() {
    return (
        <div className={styles.app}>
            <${activeComponentName}Preview />
        </div>
    );
}

export default App;
        `;
}

function getReactJsForNewComponent(componentName: string) {
    return `import styles from "./${componentName}.module.css";

function ${componentName}() {
    return (
        <div className="styles.${componentName}">
            <p>${componentName}</p>
        </div>
    );    
}

export default ${componentName};
`;
}

function getCSSForNewComponent(componentName: string) {
    return `.${componentName} {
    /* Add styles here */
}
`;
}

function getPreviewJsForNewComponent(componentName: string) {
    return `import ${componentName} from "../components/${componentName}";

function ${componentName}Preview() {
    return (
        <div>
            <${componentName} />
        </div>
    );
}

export default ${componentName}Preview;
`;
}

export {
    BUTTON_JS,
    BUTTON_MODULE_CSS,
    BUTTON_PREVIEW,
    APP_JS,
    APP_MODULE_CSS,
    getAppJs,
    getReactJsForNewComponent,
    getCSSForNewComponent,
    getPreviewJsForNewComponent,
};
