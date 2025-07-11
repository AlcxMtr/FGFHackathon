'use client'; // This is a Client Component, essential for using useState and useEffect

import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './components/message-button'


// Define a type for your messages
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot'; // 'user' for messages sent by the user, 'bot' for AI responses
  timestamp: string; // Time the message was sent/received (e.g., "10:00 AM")
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]); // State to hold all chat messages
  const [input, setInput] = useState<string>(''); // State for the current message in the input field
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref to scroll the chat to the bottom

  // Effect to load initial dummy messages when the component mounts
  useEffect(() => {
    setMessages([
      { id: '1', text: 'Hello there! How can I assist you today?', sender: 'bot', timestamp: '8:05 AM' },
      { id: '2', text: 'Tell me about the weather in Toronto.', sender: 'user', timestamp: '8:06 AM' },
    ]);
  }, []);

  // Effect to scroll to the latest message whenever messages are updated
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handler for sending a message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    if (input.trim() === '') return; // Don't send empty messages

    const newMessage: Message = {
      id: Date.now().toString(), // Unique ID for the message
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Add the new user message to the chat
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput(''); // Clear the input field

    // --- Simulate an AI response ---
    // In a real application, you would send `newMessage.text` to your backend/AI API here.
    // The AI's actual response would then be added to the messages state.
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now().toString() + '-bot',
        text: `I'm a demo bot! You asked: "${newMessage.text}". I cannot provide live weather, but it's currently 8:11 AM on Friday, July 11, 2025 in Toronto, Ontario, Canada.`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000); // Simulate a 1-second delay for the bot to "type"
  };

  return (
    <main className="h-screen flex flex-col">
      {/* Chat Header */}
      <header className="bg-white dark:bg-gray-800 p-4 shadow-md flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Welcome to routify!</h1>
        {/* You could add a user avatar, settings, or other icons here */}
      </header>

      {/* Chat Messages Area */}
      <section className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        {/* This empty div helps in scrolling to the bottom of the chat */}
        <div ref={messagesEndRef} />
      </section>

      {/* Chat Input Area */}
      <footer className="bg-white dark:bg-gray-800 p-4 shadow-t-md">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Send
          </button>
        </form>
      </footer>
    </main>
  );
}