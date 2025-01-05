import { useRef, useState } from "react";

import Button from "@/app/components/Button";
import { generateCode } from "@/app/data/actions";

import styles from "./CodeGenerate.module.css";
import { ProjectComponent } from "@/app/model/ProjectComponent";
import { GeneratedComponentCode } from "@/app/model/Code";
import { showToast } from "@/app/utils/toast";

interface Props {
    activeComponent: ProjectComponent;
    onCodeGenerated: (code: GeneratedComponentCode, component: ProjectComponent) => void;
}

// Fun generation messages while waiting for the code to be generated
const GENERATING_MESSAGES = [
    "Generating code...",
    "Almost there...",
    "Just a few more seconds...",
    "Code is almost ready...",
    "Just a bit more...",
    "You are about to see magic...",
    "Convincing the AI to work faster...",
    "AI is working hard...",
    "Results will be great...",
    "Finishing up...",
];

function CodeGenerate({ activeComponent, onCodeGenerated }: Props) {
    const [inputValue, setInputValue] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const toastIntervalId = useRef<number | null>(null);
    const toastMessageIndex = useRef(0);

    function showLoadingToast() {
        showToast(GENERATING_MESSAGES[toastMessageIndex.current], 4000);
        toastMessageIndex.current = (toastMessageIndex.current + 1) % GENERATING_MESSAGES.length;
    }

    function handleInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setInputValue(event.target.value);
    }

    async function handleGenerateCode() {
        if (isGenerating) {
            return;
        }

        setIsGenerating(true);

        // Define an interval to show toast messages every 4 seconds
        // This is useful for long-running tasks, to keep the user informed about the progress
        if (toastIntervalId.current) {
            window.clearInterval(toastIntervalId.current);
        }

        toastIntervalId.current = window.setInterval(() => {
            showLoadingToast();
        }, 4000);

        // Show the first toast message immediately
        showLoadingToast();

        const code = await generateCode(inputValue, activeComponent);

        if (!code) {
            setIsGenerating(false);
            return;
        }

        setIsGenerating(false);
        onCodeGenerated(code, activeComponent);

        // Clear the interval and reset the message index
        window.clearInterval(toastIntervalId.current);
        toastMessageIndex.current = 0;

        showToast("Code generated successfully");
    }

    return (
        <div className={styles.codeGenerate}>
            <textarea placeholder="Create a new version with AI" onInput={handleInput} />
            <Button onClick={handleGenerateCode} disabled={isGenerating}>
                {isGenerating ? "Generating..." : "Generate Code"}
            </Button>
        </div>
    );
}

export default CodeGenerate;
