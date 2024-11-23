import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X } from 'lucide-react';

export const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setTranscript(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setTranscript('');
    }
    setIsListening(!isListening);
  };

  return (
    <>
      <motion.button
        className="fixed bottom-44 right-6 p-4 bg-purple-600 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-50 overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleListening}
      >
        <motion.div
          className="absolute inset-0 bg-purple-400"
          animate={{
            scale: isListening ? [1, 1.5, 1] : 1,
            opacity: isListening ? [0.5, 0, 0.5] : 0.5,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <Mic className="w-6 h-6 relative z-10" />
      </motion.button>

      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-72 right-6 w-64 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl p-4 z-50"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Listening...</span>
              <button
                onClick={toggleListening}
                className="p-1 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm text-gray-300 break-words">
              {transcript || 'Say something...'}
            </div>
            <div className="flex justify-center mt-2">
              <motion.div
                className="w-2 h-2 bg-purple-500 rounded-full mx-1"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.div
                className="w-2 h-2 bg-purple-500 rounded-full mx-1"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, delay: 0.2, repeat: Infinity }}
              />
              <motion.div
                className="w-2 h-2 bg-purple-500 rounded-full mx-1"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, delay: 0.4, repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};