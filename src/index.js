import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Xwrapper } from 'react-xarrows';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { persistor, store } from './store/';
import { PersistGate } from 'redux-persist/integration/react';


//internationalization
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import global_es from './locales/es/global.json';
import global_en from './locales/en/global.json';


const languages = ['es', 'en'];
const selectedLang = (navigator.language || navigator.userLanguage).split('-')[0];
const locale = languages.find((item)=>item===selectedLang) ? selectedLang : 'es';

i18next.init({
  interpolation: { escapeValue: false },
  lng: locale,
  resources: {
    es: {
      global: global_es
    },
    en: {
      global: global_en
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Xwrapper>
            <App />
          </Xwrapper>
        </BrowserRouter>
      </PersistGate>
    </I18nextProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
