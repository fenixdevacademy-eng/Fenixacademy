"use client";
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';

const languages = [
  { code: 'pt-BR', label: 'Português' },
  { code: 'en', label: 'English' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    router.push(`/${locale}`);
  };

  return (
    <select
      className="bg-gray-200 px-2 py-1 rounded text-sm"
      value={i18n.language}
      onChange={handleChange}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>{lang.label}</option>
      ))}
    </select>
  );
} 