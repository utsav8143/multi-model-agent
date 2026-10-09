import {
  streamText,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
  type UIMessage,
} from "ai"
import { google } from "@ai-sdk/google"

export const maxDuration=30;

export async function POST(req:Request) {
    const {messages} : {messages:UIMessage[]}= await req.json();

    const result=streamText({
        model:google("gemini-3.8-flash"),
        messages:await convertToModelMessages(messages),
    });
    return createUIMessageStreamResponse({
        stream:toUIMessageStream({stream: result.stream}),
    });
}