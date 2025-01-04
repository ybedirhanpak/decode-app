import { generateComponentCodeStream } from "../api";
import { GeneratedComponentCode } from "../model/Code";
import {
    CodeBlockDeltaMessage,
    CodeBlockJSONDelta,
    CodeBlockStartMessage,
    StreamMessage,
} from "../model/StreamMessage";

function extractComponentCodeFromMessages(
    messages: StreamMessage[]
): GeneratedComponentCode | null {
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
        message =>
            message.type === "content_block_stop" && message.index === index
    );

    if (!contentBlockEndMessage) {
        console.error("Content block end message not found");
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

async function generateCode(input: string) {
    const streamResult = await generateComponentCodeStream(input);

    const { success, messages } = streamResult;

    if (!success) {
        console.error("Code generation failed", messages);
        return null;
    }

    return extractComponentCodeFromMessages(messages);
}

export { generateCode };
