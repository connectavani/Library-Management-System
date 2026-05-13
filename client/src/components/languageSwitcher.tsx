import { useTranslation } from 'react-i18next';
export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang); 
    localStorage.setItem('lang', lang);
  };

  return (
    <div>
      <select
        value={i18n.language}
        onChange={handleChange}
        className='text-[#ff680B] border border-[#ff680B] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff680B]'
      >
        <option value='en'>English</option>
        <option value='hi'>हिंदी</option>
        <option value='mr'>मराठी  </option>
      </select>
    </div>
  );
}
