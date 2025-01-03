"use client";

import { useState } from "react";
import { SandpackFiles } from "@codesandbox/sandpack-react";

import CodePreview from "@/app/components/CodePreview";
import { ProjectVersion } from "@/app/model/ProjectVersion";

import styles from "./ProjectDetail.module.css";

const BUTTON_CODE = `import React from 'react';

export default function Button({ children, onClick }) {
    return (
        <button
            style={{
                padding: '6px 12px',
                backgroundColor: '#1B1833',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
            }}
            onClick={onClick}
        >
            {children}
        </button>
    );
}`;

const APP_CODE = `import { useState } from 'react';
import Button from './Button';

export default function App() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <div>
            <h1>Hello! start de-coding!</h1>
            <Button onClick={handleClick}>
                Count: {count}
            </Button>
        </div>
    );
}`;

const initialFiles: SandpackFiles = {
    "/App.js": {
        code: APP_CODE,
    },
    "/Button.js": {
        code: BUTTON_CODE,
    },
};

const initialVersion: ProjectVersion = {
    id: crypto.randomUUID(),
    files: initialFiles,
    date: new Date().toISOString(),
};

function ProjectDetail() {
    const [versions, setVersions] = useState([initialVersion]);

    function handleSaveFiles(files: SandpackFiles) {
        const newVersion = {
            id: crypto.randomUUID(),
            files,
            date: new Date().toISOString(),
        };

        setVersions((prevVersions) => [...prevVersions, newVersion]);
    }

    function renderCodePreview() {
        const latestVersion = versions[versions.length - 1];
        const { files } = latestVersion;

        return (
            <CodePreview files={files} onSave={handleSaveFiles} />
        );
    }

    return (
        <div className={styles.projectDetail}>
            <code>Total number of versions: {versions.length}</code>
            {renderCodePreview()}
        </div>
    );
}

export default ProjectDetail;
