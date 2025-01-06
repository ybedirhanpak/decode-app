"use client";

import { useEffect, useState } from "react";
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFiles,
    SandpackFileExplorer,
    useSandpack,
} from "@codesandbox/sandpack-react";

import { ProjectComponent } from "@/app/model/ProjectComponent";
import Button from "../Button";
import CodeSaveButton from "../CodeSaveButton";

import styles from "./CodePreview.module.css";

interface Props {
    files: SandpackFiles;
    activeComponent?: ProjectComponent;
    onSave?: (files: SandpackFiles) => void;
}

function CodePreview(props: Props) {
    const { files } = props;
    return (
        <div className={styles.codePreview}>
            <SandpackProvider files={files} theme="dark" template="react">
                <CodePreviewContent {...props} />
            </SandpackProvider>
        </div>
    );
}

function CodePreviewContent({ activeComponent, onSave }: Props) {
    const [isFileExplorerVisible, setIsFileExplorerVisible] = useState(false);
    const { sandpack } = useSandpack();

    function handleToggleFileExplorer() {
        setIsFileExplorerVisible(prev => !prev);
    }

    useEffect(() => {
        // When active component changes, set the active file to the component file
        if (
            !isFileExplorerVisible &&
            activeComponent &&
            sandpack.activeFile !== `/components/${activeComponent.name}.js`
        ) {
            sandpack.setActiveFile(`/components/${activeComponent?.name}.js`);
        }
    }, [activeComponent, sandpack, isFileExplorerVisible]);

    function renderToggleFileExplorerButton() {
        const action = isFileExplorerVisible ? "Hide" : "Show";

        return (
            <Button variant="accent" onClick={handleToggleFileExplorer}>
                {action} Files
            </Button>
        );
    }

    return (
        <div className={styles.content}>
            <SandpackLayout className={styles.layout}>
                {isFileExplorerVisible && <SandpackFileExplorer />}
                <SandpackCodeEditor showTabs={false} showRunButton={false} />
                <SandpackPreview showOpenInCodeSandbox={false} />
            </SandpackLayout>
            <div className={styles.footer}>
                {renderToggleFileExplorerButton()}
                <CodeSaveButton onSave={onSave} />
            </div>
        </div>
    );
}

export default CodePreview;
