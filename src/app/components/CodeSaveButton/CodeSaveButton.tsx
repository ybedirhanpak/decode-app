"use client";

import classNames from "classnames";
import { useSandpack, SandpackFiles } from "@codesandbox/sandpack-react";

import styles from "./CodeSaveButton.module.css";

interface Props {
    className?: string;
    onSave?: (files: SandpackFiles) => void;
}

function CodeSaveButton({ className, onSave }: Props) {
    const { sandpack } = useSandpack();
    const { files } = sandpack;

    function handleClick() {
        onSave?.(files);
    }

    return (
        <button
            className={classNames(styles.codeSaveButton, className)}
            onClick={handleClick}
        >
            Save changes
        </button>
    );
}

export default CodeSaveButton;
