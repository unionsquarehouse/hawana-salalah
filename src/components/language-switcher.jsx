'use client';
import React, { useEffect, useState } from 'react';
import { parseCookies, setCookie } from 'nookies';
import { FaGlobe } from 'react-icons/fa';

const COOKIE_NAME = 'googtrans';

const LanguageSwitcher = ({ isHomePage, scrolled }) => {
  const [currentLanguage, setCurrentLanguage] = useState();
  const [languageConfig, setLanguageConfig] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();
    const existingLanguageCookieValue = cookies[COOKIE_NAME];

    let languageValue;
    if (existingLanguageCookieValue) {
      const sp = existingLanguageCookieValue.split('/');
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }

    if (global.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
      languageValue = global.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
    }

    if (languageValue) {
      setCurrentLanguage(languageValue);
    }

    if (global.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguageConfig(global.__GOOGLE_TRANSLATION_CONFIG__);
    }

    const handleClickOutside = (e) => {
      if (!e.target.closest('#language-switcher')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (!currentLanguage || !languageConfig) return null;

  const switchLanguage = (lang) => () => {
    setCookie(null, COOKIE_NAME, '/auto/' + lang);
    window.location.reload();
  };

  const currentLanguageTitle =
    languageConfig.languages.find((l) => l.name === currentLanguage)?.title ||
    languageConfig.languages.find((l) => l.name === languageConfig.defaultLanguage)?.title ||
    'Language';

  const textColor = isHomePage && !scrolled ? 'text-white border-white/30' : 'text-white border-white/30';
  const hoverBg = isHomePage && !scrolled ? 'hover:bg-white/10' : 'hover:bg-gray-100';

  return (
    <div className="relative inline-block z-50 text-left" id="language-switcher">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full transition ${textColor} ${hoverBg}`}
      >
        <FaGlobe className="text-sm" />
        <span className="text-sm">{currentLanguageTitle}</span>
        <svg
          className="w-4 h-4 ml-1"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {dropdownOpen && (
        <div className="absolute mt-2 w-48 bg-white text-black rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
          {languageConfig.languages.map((ld) => (
            <button
              key={ld.name}
              onClick={switchLanguage(ld.name)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                ld.name === currentLanguage ? 'bg-gray-100 font-semibold' : ''
              }`}
            >
              {ld.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export { LanguageSwitcher, COOKIE_NAME };
