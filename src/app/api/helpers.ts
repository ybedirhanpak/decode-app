import { StreamMessage } from "../model/StreamMessage";

const MESSAGE_START = "S-";
const MESSAGE_END = "-E";

/**
 * Each message is hidden in the chunk by the following pattern:
 * S-json1-E
 * S-json2-E
 */
function getMessagesFromChunk(chunk: string): StreamMessage[] {
    const messages: StreamMessage[] = [];

    let startIndex = chunk.indexOf(MESSAGE_START);
    let endIndex = chunk.indexOf(MESSAGE_END);

    while (startIndex !== -1 && endIndex !== -1) {
        const message = chunk.substring(
            startIndex + MESSAGE_START.length,
            endIndex
        );

        try {
            messages.push(JSON.parse(message));
        } catch (error) {
            console.error("Failed to parse message", message, error);
        }

        startIndex = chunk.indexOf(MESSAGE_START, endIndex);
        endIndex = chunk.indexOf(MESSAGE_END, startIndex);
    }

    return messages;
}

export { getMessagesFromChunk };
