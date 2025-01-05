"use client";

import { useSandpack, SandpackFiles } from "@codesandbox/sandpack-react";

import Button from "../Button";

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
        <Button className={className} onClick={handleClick}>
            Save component version
        </Button>
    );
}

export default CodeSaveButton;
