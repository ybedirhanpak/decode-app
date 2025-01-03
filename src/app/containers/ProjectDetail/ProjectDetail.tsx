"use client";

import { useState } from "react";
import { SandpackFiles } from "@codesandbox/sandpack-react";

import CodePreview from "@/app/components/CodePreview";
import VersionsPanel from "@/app/components/VersionsPanel";
import { ProjectVersion } from "@/app/model/ProjectVersion";

import { exampleFiles } from "./exampleFiles";
import styles from "./ProjectDetail.module.css";

const initialVersion: ProjectVersion = {
    id: crypto.randomUUID(),
    index: 0,
    files: exampleFiles,
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

        return (
            <CodePreview
                files={files}
                onSave={handleSaveFiles}
            />
        );
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
