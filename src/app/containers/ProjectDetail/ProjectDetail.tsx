"use client";

import { useState } from "react";
import { SandpackFiles } from "@codesandbox/sandpack-react";

import { ProjectVersion } from "@/app/model/ProjectVersion";
import { ProjectComponent } from "@/app/model/ProjectComponent";

import CodePreview from "@/app/components/CodePreview";
import VersionsPanel from "@/app/components/VersionsPanel";
import ComponentList from "@/app/components/ComponentList";

import { initialVersion, initialComponents } from "./initialData";
import CodeGenerate from "./CodeGenerate";

import styles from "./ProjectDetail.module.css";
import {
    getAppJs,
    getCSSForNewComponent,
    getPreviewJsForNewComponent,
    getReactJsForNewComponent,
} from "./files";

function ProjectDetail() {
    const [versions, setVersions] = useState([initialVersion]);
    const [activeVersion, setActiveVersion] = useState(initialVersion);
    const [components, setComponents] = useState(initialComponents);
    const [activeComponent, setActiveComponent] = useState<
        ProjectComponent | undefined
    >(initialComponents[0]);

    function updateAppJsForComponent(componentName: string) {
        const componentNames = components.map(component => component.name);

        const updatedActiveVersion: ProjectVersion = {
            ...activeVersion,
            files: {
                ...activeVersion.files,
                "App.js": getAppJs(componentNames, componentName),
            },
        };

        setVersions(prevVersions =>
            prevVersions.map(version =>
                version.id === activeVersion.id ? updatedActiveVersion : version
            )
        );

        setActiveVersion(updatedActiveVersion);
    }

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

    function handleExtendActiveVersion(files: SandpackFiles) {
        const newVersion: ProjectVersion = {
            id: crypto.randomUUID(),
            index: versions.length,
            files: { ...activeVersion.files, ...files },
            date: new Date().toISOString(),
        };

        setVersions(prevVersions => [...prevVersions, newVersion]);
        setActiveVersion(newVersion);
    }

    function handleVersionClick(version: ProjectVersion) {
        setActiveVersion(version);
    }

    function handleComponentClick(component: ProjectComponent) {
        updateAppJsForComponent(component.name);
        setActiveComponent(component);
    }

    function handleCreateComponent(componentName: string) {
        const newComponent: ProjectComponent = {
            id: crypto.randomUUID(),
            name: componentName,
            code: {
                code_react: getReactJsForNewComponent(componentName),
                code_css: getCSSForNewComponent(componentName),
                code_preview: getPreviewJsForNewComponent(componentName),
            },
        };

        const jsFilePath = `/components/${componentName}.js`;
        const cssFilePath = `/components/${componentName}.module.css`;
        const previewFilePath = `/preview/${componentName}Preview.js`;

        const updatedComponents = [...components, newComponent];
        const updatedComponentNames = updatedComponents.map(
            component => component.name
        );

        const updatedActiveVersion: ProjectVersion = {
            ...activeVersion,
            files: {
                ...activeVersion.files,
                "/App.js": getAppJs(updatedComponentNames, componentName),
                [jsFilePath]: newComponent.code.code_react,
                [cssFilePath]: newComponent.code.code_css,
                [previewFilePath]: newComponent.code.code_preview,
            },
        };

        setVersions(prevVersions =>
            prevVersions.map(version =>
                version.id === activeVersion.id ? updatedActiveVersion : version
            )
        );
        setActiveVersion(updatedActiveVersion);
        setComponents(updatedComponents);

        // To make sure that active component code is previewed
        setTimeout(() => {
            setActiveComponent(newComponent);
        });
    }

    function renderCodePreview() {
        const { files } = activeVersion;

        return (
            <CodePreview
                files={files}
                activeComponent={activeComponent}
                onSave={handleSaveFiles}
            />
        );
    }

    function renderComponents() {
        return (
            <ComponentList
                components={components}
                activeComponent={activeComponent}
                onComponentClick={handleComponentClick}
                onCreateComponent={handleCreateComponent}
            />
        );
    }

    return (
        <div className={styles.projectDetail}>
            <div className={styles.leftSidebar}>{renderComponents()}</div>
            <div className={styles.main}>
                {renderCodePreview()}
                <CodeGenerate onFilesGenerated={handleExtendActiveVersion} />
            </div>
            <div className={styles.rightSidebar}>
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
