import { FaWhatsapp } from "react-icons/fa";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/573106408460?text=Hola%2C%20me%20interesa%20cotizar%20un%20proyecto"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contáctame por WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20bc5a] text-white shadow-xl shadow-[#25D366]/30 hover:scale-110 transition-all duration-300"
    >
      <FaWhatsapp className="w-7 h-7" />
    </a>
  );
}
