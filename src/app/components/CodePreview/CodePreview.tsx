"use client";

import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFiles,
} from "@codesandbox/sandpack-react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - This package don't have any type definitions
import { SandpackFileExplorer } from "sandpack-file-explorer";
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
                        <SandpackPreview/>
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
