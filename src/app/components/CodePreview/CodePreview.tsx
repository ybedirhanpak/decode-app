"use client";

import {
    SandpackProvider,
    SandpackLayout,
    SandpackFileExplorer,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFiles,
} from "@codesandbox/sandpack-react";
import CodeSaveButton from "../CodeSaveButton";

import styles from "./CodePreview.module.css";

interface Props {
    files: SandpackFiles;
    onSave?: (files: SandpackFiles) => void;
}

export default function CodePreview({ files, onSave }: Props) {
    return (
        <div className={styles.codePreview}>
            <SandpackProvider files={files} theme="dark" template="react">
                <div className={styles.sandpack}>
                    <SandpackLayout className={styles.sandpackLayout}>
                        <SandpackFileExplorer />
                        <SandpackCodeEditor closableTabs showTabs />
                        <SandpackPreview />
                    </SandpackLayout>
                    <CodeSaveButton
                        className={styles.saveButton}
                        onSave={onSave}
                    />
                </div>
            </SandpackProvider>
        </div>
    );
}
