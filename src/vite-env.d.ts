/// <reference types="vite/client" />

// Типы для Яндекс Карт
declare const ymaps: any;

// Типы для Яндекс Путешествий
interface Window {
  YaTravelAffiliate?: {
    createWidget: (params: any) => void;
  };
}

declare module 'figma:asset/*' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module 'gform-quick-submit' {
  export class GFromQuickSubmitFormPOST {
    constructor(formId: string);
    submit(data: Record<string, string>): Promise<any>;
  }
}