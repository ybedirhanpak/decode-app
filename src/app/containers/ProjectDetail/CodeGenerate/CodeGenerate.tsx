import { useState } from "react";

import Button from "@/app/components/Button";
import { generateCode } from "@/app/data/actions";

import styles from "./CodeGenerate.module.css";
import { ProjectComponent } from "@/app/model/ProjectComponent";
import { GeneratedComponentCode } from "@/app/model/Code";
import { showToast } from "@/app/utils/toast";

interface Props {
    activeComponent: ProjectComponent;
    onCodeGenerated: (
        code: GeneratedComponentCode,
        component: ProjectComponent
    ) => void;
}

function CodeGenerate({ activeComponent, onCodeGenerated }: Props) {
    const [inputValue, setInputValue] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    function handleInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setInputValue(event.target.value);
    }

    async function handleGenerateCode() {
        if (isGenerating) {
            return;
        }

        showToast("Generating code...");
        setIsGenerating(true);
        const code = await generateCode(inputValue, activeComponent);

        if (!code) {
            setIsGenerating(false);
            return;
        }

        setIsGenerating(false);
        onCodeGenerated(code, activeComponent);

        showToast("Code generated successfully");
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
