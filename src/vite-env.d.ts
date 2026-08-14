/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BANK_ACCOUNT_NAME?: string;
  readonly VITE_BANK_SORT_CODE?: string;
  readonly VITE_BANK_ACCOUNT_NUMBER?: string;
  readonly VITE_BANK_IBAN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
