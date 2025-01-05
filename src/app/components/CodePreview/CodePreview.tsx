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
import CodeSaveButton from "../CodeSaveButton";
import { ProjectComponent } from "@/app/model/ProjectComponent";

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
        if (activeComponent) {
            const componentPath = `/components/${activeComponent.name}.js`;
            sandpack.setActiveFile(componentPath);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeComponent]);

    function renderToggleFileExplorerButton() {
        const action = isFileExplorerVisible ? "Hide" : "Show";

        return (
            <button
                className={styles.fileExplorerButton}
                onClick={handleToggleFileExplorer}
            >
                {action} Files
            </button>
        );
    }

    return (
        <div className={styles.content}>
            <SandpackLayout className={styles.layout}>
                {isFileExplorerVisible && <SandpackFileExplorer />}
                <SandpackCodeEditor showTabs={false} showRunButton={false} />
                <SandpackPreview
                    actionsChildren={renderToggleFileExplorerButton()}
                    showOpenInCodeSandbox={false}
                />
            </SandpackLayout>
            <CodeSaveButton className={styles.saveButton} onSave={onSave} />
        </div>
    );
}

export default CodePreview;
