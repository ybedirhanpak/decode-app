import { useState } from "react";
import { SandpackFiles } from "@codesandbox/sandpack-react";

import Button from "@/app/components/Button";
import { generateCode } from "@/app/data/actions";

import styles from "./CodeGenerate.module.css";

interface Props {
    onFilesGenerated: (files: SandpackFiles) => void;
}

function CodeGenerate({ onFilesGenerated }: Props) {
    const [inputValue, setInputValue] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    function handleInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setInputValue(event.target.value);
    }

    async function handleGenerateCode() {
        if (isGenerating) {
            return;
        }

        setIsGenerating(true);
        const code = await generateCode(inputValue);

        if (!code) {
            // TODO: Show error message to user
            setIsGenerating(false);
            return;
        }

        const { code_react, code_css } = code;

        const files = {
            "/Button.js": {
                code: code_react,
            },
            "/Button.module.css": {
                code: code_css,
            },
        };

        setIsGenerating(false);
        onFilesGenerated(files);
    }

    return (
        <div className={styles.codeGenerate}>
            <textarea
                placeholder="Create a new version with AI"
                onInput={handleInput}
            />
            <Button onClick={handleGenerateCode} disabled={isGenerating}>
                {isGenerating ? "Generating..." : "Generate Code"}
            </Button>
        </div>
    );
}

export default CodeGenerate;
