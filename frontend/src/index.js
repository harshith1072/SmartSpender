import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalProvider } from './context/globalContext';
import { GlobalStyle } from './styles/GlobalStyle';
import { ClerkProvider } from '@clerk/clerk-react';
const PUBLISHABLE_KEY = 'pk_test_ZnVsbC1zYXdmaXNoLTM2LmNsZXJrLmFjY291bnRzLmRldiQ';
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <GlobalProvider>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
    </GlobalProvider>
  </React.StrictMode>
);

