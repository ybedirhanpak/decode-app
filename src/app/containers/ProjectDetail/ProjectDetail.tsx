"use client";

import { useState } from "react";
import { SandpackFiles } from "@codesandbox/sandpack-react";

import CodePreview from "@/app/components/CodePreview";
import VersionsPanel from "@/app/components/VersionsPanel";
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
    index: 0,
    files: initialFiles,
    date: new Date().toISOString(),
};

function ProjectDetail() {
    const [versions, setVersions] = useState([initialVersion]);
    const [activeVersion, setActiveVersion] = useState(initialVersion);

    function handleSaveFiles(files: SandpackFiles) {
        const newVersion: ProjectVersion = {
            id: crypto.randomUUID(),
            index: versions.length,
            files,
            date: new Date().toISOString(),
        };

        setVersions(prevVersions => [...prevVersions, newVersion]);
        setActiveVersion(newVersion);
    }

    function handleVersionClick(version: ProjectVersion) {
        setActiveVersion(version);
    }

    function renderCodePreview() {
        const { files } = activeVersion;

        return <CodePreview files={files} onSave={handleSaveFiles} />;
    }

    return (
        <div className={styles.projectDetail}>
            <div className={styles.editor}>{renderCodePreview()}</div>
            <div className={styles.versions}>
                <VersionsPanel
                    versions={versions}
                    activeVersion={activeVersion}
                    onVersionClick={handleVersionClick}
                />
            </div>
        </div>
    );
}

export default ProjectDetail;
