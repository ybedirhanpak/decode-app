import type Anthropic from "@anthropic-ai/sdk";

export type StreamMessage = Anthropic.MessageStreamEvent;
export type CodeBlockStartMessage = Anthropic.ContentBlockStartEvent;
export type CodeBlockDeltaMessage = Anthropic.ContentBlockDeltaEvent;
export type CodeBlockJSONDelta = Anthropic.InputJSONDelta;
