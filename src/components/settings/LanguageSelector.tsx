import React, { useEffect, useRef, useState } from 'react';
declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}
import { Check, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';



const LanguageSelector: React.FC<{ variant?: 'default' | 'outline' | 'minimal' }> = ({
  variant = 'default',
}) => {
  const { language, changeLanguage, supportedLanguages } = useLanguage();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const translateRef = useRef(false);

  const loadGoogleTranslateScript = () => {
    if (translateRef.current) return;
  
    // Define this BEFORE appending the script
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          autoDisplay: false,
        },
        'hidden_translate_element'
      );
      setScriptLoaded(true);
    };
  
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.id = 'google-translate-script';
    document.body.appendChild(script);
    translateRef.current = true;
  };
  



  const triggerTranslation = (langCode: string) => {
    const googleLangMap: Record<string, string> = {
      en: 'en',     // English
      hi: 'hi',     // Hindi
      ta: 'ta',     // Tamil
      te: 'te',     // Telugu
      kn: 'kn',     // Kannada
      mr: 'mr',     // Marathi
      es: 'es',     // Spanish
      fr: 'fr',     // French

      // Add more as needed
    };

    const googleCode = googleLangMap[langCode] || 'en';

    const selectEl = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (selectEl) {
      selectEl.value = googleCode;
      selectEl.dispatchEvent(new Event('change'));
    }
  };

  const waitForSelectAndTrigger = (langCode: string, retries = 10) => {
    const selectEl = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (selectEl) {
      selectEl.value = langCode;
      selectEl.dispatchEvent(new Event('change'));
    } else if (retries > 0) {
      setTimeout(() => waitForSelectAndTrigger(langCode, retries - 1), 300);
    }
  };
  
  const handleChangeLanguage = (langCode: string) => {
    changeLanguage(langCode);
    if (!translateRef.current) {
      loadGoogleTranslateScript();
      setTimeout(() => waitForSelectAndTrigger(langCode), 30);
    } else {
      waitForSelectAndTrigger(langCode);
    }
  };
  

  const currentLanguage =
    supportedLanguages.find((l) => l.code === language)?.name || 'English';

  const renderDropdown = () => (
    
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant === 'outline' ? 'outline' : 'default'}
          size="sm"
          className="flex items-center gap-2"
        >
          <Globe className="h-4 w-4" />
          <span>{currentLanguage}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {supportedLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleChangeLanguage(lang.code)}
            className="flex items-center justify-between"
          >
            <span>{lang.name}</span>
            {language === lang.code && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <>
      {renderDropdown()}

      {/* Hidden container for Google Translate */}
      <div id="hidden_translate_element" style={{ display: 'none' }}></div>

      {/* Optional: hide the ugly Google bar injected at top of page */}
      <style>
        {`
         .skiptranslate {
    display: none !important;
}

body {
    top: 0px !important;
}
        `}
      </style>
    </>
  );
};

export default LanguageSelector;
