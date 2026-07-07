import { useEffect, useState } from "react";

export function useTypewriter(messages: string[]) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const currentMessage = messages[messageIndex];
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < currentMessage.length) {
      timeoutId = setTimeout(() => {
        setText(currentMessage.slice(0, charIndex + 1));
        setCharIndex((index) => index + 1);
      }, 50);
    } else if (!deleting && charIndex === currentMessage.length) {
      timeoutId = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIndex > 0) {
      timeoutId = setTimeout(() => {
        setText(currentMessage.slice(0, charIndex - 1));
        setCharIndex((index) => index - 1);
      }, 22);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setMessageIndex((index) => (index + 1) % messages.length);
    }

    return () => clearTimeout(timeoutId);
  }, [charIndex, deleting, messageIndex, messages]);

  return text;
}
