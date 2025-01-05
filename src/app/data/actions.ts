import { generateComponentCodeStream } from "../api";
import { GeneratedComponentCode } from "../model/Code";
import { ProjectComponent } from "../model/ProjectComponent";
import {
    CodeBlockDeltaMessage,
    CodeBlockJSONDelta,
    CodeBlockStartMessage,
    MessageDelta,
    StreamMessage,
} from "../model/StreamMessage";
import { showToast } from "../utils/toast";

function extractComponentCodeFromMessages(messages: StreamMessage[]): GeneratedComponentCode | null {
    // Find the index of the message where message type is tool_use and tool name is get_component_code
    const contentBlockStartMessage = messages.find(
        message =>
            message.type === "content_block_start" &&
            message.content_block.type === "tool_use" &&
            message.content_block.name === "get_component_code"
    );

    if (!contentBlockStartMessage) {
        console.error("Content block start message not found");
        return null;
    }

    const index = (contentBlockStartMessage as CodeBlockStartMessage).index;

    // Find the content end message with the same index
    const contentBlockEndMessage = messages.find(
        message => message.type === "content_block_stop" && message.index === index
    );

    if (!contentBlockEndMessage) {
        const messageWithStopReason = messages.find(
            message => message.type === "message_delta" && message.delta.stop_reason
        );

        if (messageWithStopReason) {
            const toastMessage = `Code generation failed. Stop reason: ${
                (messageWithStopReason as MessageDelta).delta.stop_reason
            }`;

            showToast(toastMessage);
        }

        console.error("Content block end message not found", messageWithStopReason);
        return null;
    }

    // Find all delta messages with the same index
    const codeBlockDeltaMessages = messages.filter(
        message =>
            message.type === "content_block_delta" &&
            message.index === index &&
            message.delta.type === "input_json_delta"
    ) as CodeBlockDeltaMessage[];

    // Build the code from the delta messages
    const data = codeBlockDeltaMessages.reduce((acc, message) => {
        return acc + (message.delta as CodeBlockJSONDelta).partial_json;
    }, "");

    return JSON.parse(data);
}

function removeImportLines(code: string) {
    // If no import lines found, return the code as is
    if (!code.includes("import")) {
        return code;
    }

    // Split code into lines
    const codeLines = code.split("\n");

    // Remove import lines until the first non-import line
    let importLineIndex = 0;
    for (let i = 0; i < codeLines.length; i++) {
        if (codeLines[i].startsWith("import")) {
            importLineIndex = i;
        } else {
            break;
        }
    }

    // Remove import lines
    const importRemovedLines = codeLines.slice(importLineIndex + 1);
    // Find the index of the first non-empty line
    const firstNonEmptyLineIndex = importRemovedLines.findIndex(line => line.trim() !== "");
    const cleanedLines = importRemovedLines.slice(firstNonEmptyLineIndex);

    // Finalize the code
    const cleanCode = cleanedLines.join("\n");
    return cleanCode;
}

async function generateCode(userPrompt: string, component: ProjectComponent) {
    const componentNamePrompt = `component_name: ${component.name}`;
    const input = `${componentNamePrompt}\n${userPrompt}`;

    const streamResult = await generateComponentCodeStream(input);

    const { success, messages } = streamResult;

    if (!success) {
        console.error("Code generation failed", messages);
        return null;
    }

    const code = extractComponentCodeFromMessages(messages);

    if (!code) {
        console.error("Generated code not found");
        return null;
    }

    code.code_react = removeImportLines(code.code_react);
    code.code_preview = removeImportLines(code.code_preview);

    // eslint-disable-next-line quotes
    const importReact = `import React from "react";\n`;

    // Add import line to the react file
    const importCSS = `import styles from "./${component.name}.module.css";\n`;
    code.code_react = [importReact, importCSS, code.code_react].join("\n");

    // Add import line to the preview file
    const importComponent = `import ${component.name} from "../components/${component.name}";\n`;
    code.code_preview = [importReact, importComponent, code.code_preview].join("\n");

    return code;
}

export { generateCode };
