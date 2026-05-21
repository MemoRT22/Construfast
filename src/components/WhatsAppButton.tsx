import { useState } from 'react';

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {hovered && (
        <span className="bg-navy-800 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-lg animate-fade-in whitespace-nowrap">
          Escríbenos por WhatsApp
        </span>
      )}
      <a
        href="https://wa.me/524421797779?text=Hola%2C%20me%20interesa%20cotizar%20materiales"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="whatsapp-pulse w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
        aria-label="Contactar por WhatsApp"
      >
        <svg
          viewBox="0 0 32 32"
          fill="white"
          className="w-7 h-7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.004 2.667c-7.364 0-13.337 5.973-13.337 13.333 0 2.353.613 4.653 1.78 6.687l-1.887 6.88 7.04-1.847a13.28 13.28 0 006.404 1.633c7.36 0 13.333-5.973 13.333-13.333S23.364 2.667 16.004 2.667zm0 24.4a11.02 11.02 0 01-5.617-1.54l-.4-.24-4.18 1.1 1.117-4.08-.26-.42a10.98 10.98 0 01-1.69-5.887c0-6.08 4.947-11.027 11.03-11.027 6.084 0 11.03 4.947 11.03 11.027 0 6.084-4.946 11.067-11.03 11.067zm6.04-8.267c-.333-.167-1.96-.967-2.267-1.08-.306-.113-.527-.167-.747.167-.22.333-.86 1.08-1.053 1.3-.193.22-.387.247-.72.08-.333-.167-1.407-.52-2.68-1.653-.99-.88-1.66-1.967-1.853-2.3-.193-.333-.02-.513.147-.68.147-.147.333-.387.5-.58.167-.193.22-.333.333-.553.113-.22.057-.413-.027-.58-.087-.167-.747-1.8-1.023-2.467-.267-.647-.54-.56-.747-.567-.193-.013-.413-.013-.633-.013-.22 0-.58.08-.88.413-.3.333-1.153 1.127-1.153 2.747s1.18 3.187 1.347 3.407c.167.22 2.32 3.54 5.623 4.967.787.34 1.4.54 1.88.693.79.253 1.507.22 2.073.133.633-.093 1.96-.8 2.24-1.573.28-.773.28-1.44.193-1.573-.087-.14-.307-.22-.64-.387z" />
        </svg>
      </a>
    </div>
  );
}
