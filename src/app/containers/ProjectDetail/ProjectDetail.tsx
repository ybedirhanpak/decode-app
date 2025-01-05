"use client";

import { useState } from "react";
import { SandpackFiles } from "@codesandbox/sandpack-react";

import {
    ProjectComponent,
    ProjectComponentVersion,
} from "@/app/model/ProjectComponent";

import CodePreview from "@/app/components/CodePreview";
import VersionsPanel from "@/app/components/VersionsPanel";
import ComponentList from "@/app/components/ComponentList";

import { initialFiles, initialComponents } from "./initialData";
import CodeGenerate from "./CodeGenerate";

import styles from "./ProjectDetail.module.css";
import {
    getAppJs,
    getCSSForNewComponent,
    getPreviewJsForNewComponent,
    getReactJsForNewComponent,
} from "./files";
import { GeneratedComponentCode } from "@/app/model/Code";

function ProjectDetail() {
    const [files, setFiles] = useState(initialFiles);
    const [components, setComponents] = useState(initialComponents);
    const [activeComponentName, setActiveComponentName] = useState<string>(
        initialComponents[0].name
    );
    const [activeComponentVersionIndices, setActiveComponentVersionIndices] =
        useState({
            [initialComponents[0].name]: 0,
        });

    const activeComponent = components.find(
        component => component.name === activeComponentName
    )!;

    function updateAppJsForComponent(componentName: string) {
        const componentNames = components.map(component => component.name);

        const updatedFiles: SandpackFiles = {
            ...files,
            "App.js": {
                code: getAppJs(componentNames, componentName),
            },
        };

        setFiles(updatedFiles);
    }

    function handleSaveChanges(files: SandpackFiles) {
        // Find files of active component
        const jsFilePath = `/components/${activeComponent.name}.js`;
        const cssFilePath = `/components/${activeComponent.name}.module.css`;
        const previewFilePath = `/preview/${activeComponent.name}Preview.js`;

        const jsFile = files[jsFilePath];
        const cssFile = files[cssFilePath];
        const previewFile = files[previewFilePath];

        const updatedCode: GeneratedComponentCode = {
            code_react: typeof jsFile === "string" ? jsFile : jsFile.code,
            code_css: typeof cssFile === "string" ? cssFile : cssFile.code,
            code_preview:
                typeof previewFile === "string"
                    ? previewFile
                    : previewFile.code,
        };

        const newIndex = activeComponent.versions.length;

        const newVersion: ProjectComponentVersion = {
            id: crypto.randomUUID(),
            index: newIndex,
            date: new Date().toISOString(),
            code: updatedCode,
        };

        const updatedComponent: ProjectComponent = {
            ...activeComponent,
            versions: [...activeComponent.versions, newVersion],
        };

        const updatedComponents = components.map(component =>
            component.id === activeComponent.id ? updatedComponent : component
        );

        const updatedFiles: SandpackFiles = {
            ...files,
            [jsFilePath]: updatedCode.code_react,
            [cssFilePath]: updatedCode.code_css,
            [previewFilePath]: updatedCode.code_preview,
        };

        setFiles(updatedFiles);
        setComponents(updatedComponents);
        setActiveComponentVersionIndices({
            ...activeComponentVersionIndices,
            [activeComponent.name]: newIndex,
        });
    }

    function handleExtendActiveVersion(files: SandpackFiles) {
        console.log("files generated: ", files);
    }

    function handleVersionClick(version: ProjectComponentVersion) {
        setActiveComponentVersionIndices({
            ...activeComponentVersionIndices,
            [activeComponent.name]: version.index,
        });

        // Update files
        const jsFilePath = `/components/${activeComponent.name}.js`;
        const cssFilePath = `/components/${activeComponent.name}.module.css`;
        const previewFilePath = `/preview/${activeComponent.name}Preview.js`;

        const updatedFiles: SandpackFiles = {
            ...files,
            [jsFilePath]: version.code.code_react,
            [cssFilePath]: version.code.code_css,
            [previewFilePath]: version.code.code_preview,
        };

        setFiles(updatedFiles);
    }

    function handleComponentClick(component: ProjectComponent) {
        updateAppJsForComponent(component.name);
        setTimeout(() => {
            setActiveComponentName(component.name);
        });
    }

    function handleCreateComponent(componentName: string) {
        const newComponent: ProjectComponent = {
            id: crypto.randomUUID(),
            name: componentName,
            versions: [
                {
                    id: crypto.randomUUID(),
                    index: 0,
                    date: new Date().toISOString(),
                    code: {
                        code_react: getReactJsForNewComponent(componentName),
                        code_css: getCSSForNewComponent(componentName),
                        code_preview:
                            getPreviewJsForNewComponent(componentName),
                    },
                },
            ],
        };

        const jsFilePath = `/components/${componentName}.js`;
        const cssFilePath = `/components/${componentName}.module.css`;
        const previewFilePath = `/preview/${componentName}Preview.js`;

        const updatedComponents = [...components, newComponent];
        const updatedComponentNames = updatedComponents.map(
            component => component.name
        );

        const updatedFiles: SandpackFiles = {
            ...files,
            "/App.js": getAppJs(updatedComponentNames, componentName),
            [jsFilePath]: newComponent.versions[0].code.code_react,
            [cssFilePath]: newComponent.versions[0].code.code_css,
            [previewFilePath]: newComponent.versions[0].code.code_preview,
        };

        setFiles(updatedFiles);
        setActiveComponentVersionIndices({
            ...activeComponentVersionIndices,
            [componentName]: 0,
        });
        setComponents(updatedComponents);

        // To make sure that active component code is previewed
        setTimeout(() => {
            setActiveComponentName(newComponent.name);
        });
    }

    function renderCodePreview() {
        return (
            <CodePreview
                files={files}
                activeComponent={activeComponent}
                onSave={handleSaveChanges}
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

    function renderVersionsPanel() {
        const { versions } = activeComponent;
        const activeIndex = activeComponentVersionIndices[activeComponent.name];

        const activeVersion = versions.find(
            version => version.index === activeIndex
        )!;

        return (
            <VersionsPanel
                versions={versions}
                activeVersion={activeVersion}
                onVersionClick={handleVersionClick}
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
            <div className={styles.rightSidebar}>{renderVersionsPanel()}</div>
        </div>
    );
}

export default ProjectDetail;
