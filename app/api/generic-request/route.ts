import { NextResponse } from 'next/server';
import OpenAI from "openai";

// Define the expected structure for the request body
interface RequestBody {
  message: string;
}

// The successful response is now a single string
interface ApiResponseTwo {
  answer: string;
}

export async function POST(request: Request) {
  try {
    const { message }: RequestBody = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Ensure your OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API Key is not configured.' }, { status: 500 });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openaiResponse = await openai.responses.create({
      prompt: {
        "id": "pmpt_687166560b088190bfc64f2da5cb20390414d0beb8ccc877", // The ID of your pre-defined prompt
        "version": "2" // The version of that prompt
      },
      // CORRECTED: Pass the user's message to the 'input' array
      input: [
        { "role": "user", "content": message }
      ],
      // reasoning: {}, // Optional: Uncomment if you need to use this
      max_output_tokens: 2048, // Maximum tokens the model should generate
      store: true // Whether to store this specific response for future reference/conversation state
    });

    // CORRECTED: Access the generated text from the response object
    const answerText = openaiResponse.output_text;

    if (!answerText) {
        // Handle cases where the AI might not return any text (unlikely for typical prompts, but good practice)
        console.warn('OpenAI response did not contain output_text.');
        return NextResponse.json({ answer: 'No response generated.' }, { status: 500 });
    }

    return NextResponse.json<ApiResponseTwo>({ answer: answerText }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    // You might want to be more specific with error handling based on 'error' type
    if (error instanceof OpenAI.APIError) {
        // Handle OpenAI specific errors
        console.error('OpenAI API Error:', error.status, error.message);
        return NextResponse.json({ error: `OpenAI API Error: ${error.message}` }, { status: error.status || 500 });
    } else if (error instanceof Error) {
        // Generic error
        return NextResponse.json({ error: `Failed to process your request: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred.' }, { status: 500 });
  }
}