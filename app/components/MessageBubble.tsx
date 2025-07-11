
import { useState } from 'react';
import { motion } from 'framer-motion';

const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      role="listitem"
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2 px-2`}
    >
      <div
        className={`relative max-w-[90%] sm:max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl shadow-md transition-colors duration-200
          ${isUser
            ? 'bg-blue-600 text-white rounded-br-md'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 rounded-bl-md'}
        `}
      >
        {/* Message text with manual 3-line clamp */}
        <p
          className={`text-sm md:text-base leading-relaxed break-words whitespace-pre-wrap overflow-hidden transition-all duration-200 ease-in-out ${
            expanded ? '' : 'max-h-[4.5em]'
          }`}
          style={!expanded ? { display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' } : {}}
        >
          {message.text}
        </p>

        {/* Toggle button */}
        {(message.text.length > 180 || message.text.includes('\n')) && (
          <button
            onClick={() => setExpanded(!expanded)}
            className={`text-xs font-medium mt-2 ${
              isUser ? 'text-blue-200' : 'text-blue-600 dark:text-blue-400'
            } hover:underline float-right`}
          >
            {expanded ? 'Show less ▲' : 'Show more ▼'}
          </button>
        )}
console.log('Timestamp:', message.timestamp);
console.log('Date:', new Date(message.timestamp));
        {/* Timestamp */}
        <time
          dateTime={message.timestamp}
          title={new Date(message.timestamp).toLocaleString()}
          className={`text-[11px] mt-1 block text-right clear-both ${
            isUser ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </time>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
