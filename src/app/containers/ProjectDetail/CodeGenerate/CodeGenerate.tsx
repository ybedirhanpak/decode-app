import { SandpackFiles } from "@codesandbox/sandpack-react";

import styles from "./CodeGenerate.module.css";
import { useState } from "react";
import { generateComponentCode } from "@/app/api/api";
import Button from "@/app/components/Button";

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
        const generatedResult = await generateComponentCode(inputValue);

        if (!generatedResult.success) {
            setIsGenerating(false);
            return;
        }

        const { code_react, code_css } = generatedResult.data;

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
