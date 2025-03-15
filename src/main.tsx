import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from '../src/module/index'
import { store } from './core/context/store';
import './main.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        <App />
      </Provider>
  </StrictMode>,
)
