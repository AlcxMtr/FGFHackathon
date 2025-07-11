// context/chat-context.tsx
'use client';

import React, {
  createContext,
  useState,
  useEffect, // useEffect is still needed for the initial greeting logic in ChatPage
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
}

// Create the context with a default undefined value
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Define the props for the ChatProvider
interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  // Initialize messages state as an empty array.
  // This means messages will be reset whenever ChatProvider mounts (e.g., on full page refresh).
  const [messages, setMessages] = useState<Message[]>([]);

  // Removed the useEffect for localStorage saving/loading.

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