"use client";

import { useTranslations } from "next-intl";

const PHONE = "38640842594"; // Slovenian number for click-to-chat (no '+' in URL)

export default function WhatsAppButton() {
  const t = useTranslations("whatsapp");
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(t("prefill"))}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("aria")}
      className="fixed bottom-6 left-6 z-50 group flex items-center gap-2"
    >
      <span className="hidden sm:inline-block bg-white text-forest-900 text-xs font-medium px-3 py-1.5 rounded-full shadow-md border border-beige-200 opacity-0 group-hover:opacity-100 transition-opacity">
        {t("tooltip")}
      </span>
      <span
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:scale-105 transition-transform"
        style={{ background: "#25D366" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="white"
          aria-hidden
        >
          <path d="M16.003 3C9.374 3 4 8.374 4 15.003c0 2.385.69 4.61 1.882 6.482L4 29l7.713-1.836a11.95 11.95 0 0 0 4.29.787h.005C22.629 27.951 28 22.578 28 15.95 28 8.374 22.629 3 16.003 3Zm0 22.116h-.004a9.94 9.94 0 0 1-5.06-1.385l-.363-.215-4.578 1.09 1.111-4.46-.236-.378a9.93 9.93 0 0 1-1.516-5.27c.002-5.49 4.473-9.961 9.97-9.961 2.66 0 5.16 1.04 7.04 2.92a9.886 9.886 0 0 1 2.917 7.046c0 5.491-4.471 9.962-9.962 9.962Zm5.46-7.46c-.298-.149-1.766-.872-2.04-.972-.273-.099-.471-.149-.67.149-.198.297-.768.971-.942 1.17-.174.198-.347.223-.645.075-.297-.149-1.255-.463-2.39-1.475-.884-.787-1.48-1.76-1.654-2.057-.173-.298-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.074-.149-.67-1.616-.918-2.213-.241-.58-.487-.501-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.521.074-.793.372-.273.298-1.041 1.018-1.041 2.482 0 1.465 1.066 2.881 1.215 3.08.149.198 2.097 3.202 5.082 4.491.71.307 1.264.49 1.696.626.713.227 1.362.195 1.875.118.572-.085 1.766-.722 2.015-1.42.249-.697.249-1.295.174-1.42-.074-.124-.272-.198-.57-.347Z" />
        </svg>
      </span>
    </a>
  );
}
