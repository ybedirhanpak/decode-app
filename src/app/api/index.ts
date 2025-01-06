import { GeneratedComponentCode } from "../model/Code";
import { StreamMessage } from "../model/StreamMessage";
import { getMessagesFromChunk } from "./helpers";

type GenerateCodeResponse = {
    success: boolean;
    data: GeneratedComponentCode;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function generateComponentCode(input: string): Promise<GenerateCodeResponse> {
    const url = `${API_URL}/component`;

    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            input,
        }),
    })
        .then(response => response.json())
        .catch(error => {
            console.error("Failed to generate code", error);
            return { success: false, data: { code_react: "", code_css: "" } };
        });
}

export async function generateComponentCodeStream(input: string, onChunkReceived?: (chunk: string) => void) {
    const url = `${API_URL}/edge/component`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            input,
        }),
    });

    const reader = response.body!.getReader();
    const decoder = new TextDecoder("utf-8");

    const messages: StreamMessage[] = [];

    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }

        const chunk = decoder.decode(value, { stream: true });
        onChunkReceived?.(chunk);

        getMessagesFromChunk(chunk).forEach(message => {
            messages.push(message);
        });
    }

    return {
        success: true,
        messages,
    };
}
