// context/chat-context.tsx
'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';

// Define the Message interface (ensure it's consistent across your app)
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

// Define the shape of the context value
interface ChatContextType {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  addMessage: (message: Message) => void;
  // You can add other functions here like clearChat, etc.
}

// Create the context with a default undefined value
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Define the props for the ChatProvider
interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  // Initialize messages state from localStorage or an empty array
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') { // Check if window is defined (client-side)
      const savedMessages = localStorage.getItem('chatMessages');
      return savedMessages ? JSON.parse(savedMessages) : [];
    }
    return [];
  });

  // Effect to save messages to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') { // Check if window is defined (client-side)
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Helper function to add a message
  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // Provide the context value
  const contextValue: ChatContextType = {
    messages,
    setMessages,
    addMessage,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
}

// Custom hook to easily consume the chat context
export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}