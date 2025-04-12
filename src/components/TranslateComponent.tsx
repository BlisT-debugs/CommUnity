import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

interface GoogleTranslateOptions {
  pageLanguage: string;
  includedLanguages?: string;
  layout?: unknown;
  autoDisplay?: boolean;
  multilanguagePage?: boolean;
}

const TranslateComponent: React.FC = () => {
  const googleTranslateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initTranslate = () => {
      if (!window.google || !window.google.translate) {
        console.error('Google Translate API not loaded');
        return;
      }

      if (!googleTranslateRef.current) return;

      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "af,ach,ak,am,ar,az,be,bem,bg,bh,bn,br,bs,ca,chr,ckb,co,crs,cs,cy,da,de,ee,el,en,eo,es,es-419,et,eu,fa,fi,fo,fr,fy,ga,gaa,gd,gl,gn,gu,ha,haw,hi,hr,ht,hu,hy,ia,id,ig,is,it,iw,ja,jw,ka,kg,kk,km,kn,ko,kri,ku,ky,la,lg,ln,lo,loz,lt,lua,lv,mfe,mg,mi,mk,ml,mn,mo,mr,ms,mt,ne,nl,nn,no,nso,ny,nyn,oc,om,or,pa,pcm,pl,ps,pt-BR,pt-PT,qu,rm,rn,ro,ru,rw,sd,sh,si,sk,sl,sn,so,sq,sr,sr-ME,st,su,sv,sw,ta,te,tg,th,ti,tk,tl,tn,to,tr,tt,tum,tw,ug,uk,ur,uz,vi,wo,xh,yi,yo,zh-CN,zh-TW,zu",
            layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
            autoDisplay: false,
          },
          googleTranslateRef.current
        );
      } catch (error) {
        console.error('Error initializing Google Translate:', error);
      }
    };

    window.googleTranslateElementInit = initTranslate;

    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = () => {
      console.error('Failed to load Google Translate script');
    };

    document.body.appendChild(script);

    return () => {
      // Clean up
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      delete window.googleTranslateElementInit;
    };
  }, []);

  return <div ref={googleTranslateRef} id="google_translate_element" />;
};

export default TranslateComponent;