'use client';

import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './components/message-button';

// Define a type for your messages
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

// Define the new, simpler structure of the API response
interface RecommendationApiResponse {
  recommendation: string;
}

interface GenericApiResponse {
  answer: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Initial greeting message
    setMessages([
      { id: '1', text: 'Hello there! How can I assist you today? I can help find the right person for a project based on their skills and experience.', sender: 'bot', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || isLoading) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // --- Call your new Generic API Route ---
      const responseGeneric = await fetch('/api/generic-request', {
        method: 'POST', // Assuming your generic-request endpoint is a POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage.text }), // Pass the user's message
      });

      if (!responseGeneric.ok) {
        const errorData = await responseGeneric.json();
        throw new Error(errorData.error || 'Failed to fetch data from generic API');
      }

      const genericData: GenericApiResponse = await responseGeneric.json();
      const genericAnswer = genericData.answer; // Get the answer from the generic API

      // --- Call your existing Data Extraction API Route ---
      const responseExtract = await fetch('/api/extract-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage.text }),
      });

      if (!responseExtract.ok) {
        const errorData = await responseExtract.json();
        throw new Error(errorData.error || 'Failed to fetch data from extraction API');
      }

      const dataExtract: RecommendationApiResponse = await responseExtract.json();
      const recommendationText = dataExtract.recommendation; // Get the recommendation from the extraction API

      // --- Concatenate the responses with a divisor ---
      const combinedText =
        `${genericAnswer}\n\n` +
        `----------------------------------------------\n\n` +
        `${recommendationText}`;

      const botResponse: Message = {
        id: Date.now().toString() + '-bot',
        text: combinedText, // Use the combined text
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);

    } catch (error) {
      console.error('Error sending message to API:', error);
      const errorBotResponse: Message = {
        id: Date.now().toString() + '-error',
        text: `Error: Could not get a response. Please try again.`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prevMessages) => [...prevMessages, errorBotResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen flex flex-col">
      {/* Chat Header */}
      <header className="bg-white dark:bg-gray-800 p-4 shadow-md flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Routify Assistant</h1>
      </header>

      {/* Chat Messages Area */}
      <section className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && (
          <MessageBubble message={{ id: 'loading', text: 'Finding the best candidates...', sender: 'bot', timestamp: '' }} />
        )}
        <div ref={messagesEndRef} />
      </section>

      {/* Chat Input Area */}
      <footer className="bg-white dark:bg-gray-800 p-4 shadow-t-md">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., I need a JS developer for the mobile app..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </footer>
    </main>
  );
}