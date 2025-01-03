"use client";

import {
    SandpackProvider,
    SandpackLayout,
    SandpackFileExplorer,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFiles,
} from "@codesandbox/sandpack-react";

const BUTTON_CODE = `import React from 'react';

export default function Button({ children, onClick }) {
    return (
        <button
            style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
            }}
            onClick={onClick}
        >
            {children}
        </button>
    );
}`;

const APP_CODE = `import React from 'react';
import Button from './Button';

export default function App() {
    return (
        <div>
            <h1>Hello, decode!</h1>
            <Button onClick={() => alert('Hello, decode!')}>
                Click me
            </Button>
        </div>
    );
}`;

export default function CodePreview() {
    const files: SandpackFiles = {
        "/App.js": {
            code: APP_CODE,
        },
        "/Button.js": {
            code: BUTTON_CODE,
        },
    };

    return (
        <SandpackProvider files={files} theme="dark" template="react">
            <SandpackLayout>
                <SandpackFileExplorer />
                <SandpackCodeEditor closableTabs showTabs />
                <SandpackPreview />
            </SandpackLayout>
        </SandpackProvider>
    );
}
