import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import ThemeProvider from './components/theme/ThemeProvider'
import { Toaster } from './components/ui/sonner'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
  {/* <StrictMode> */}
    <ThemeProvider>
    <App />
     <Toaster />
    </ThemeProvider>
  {/* </StrictMode> */}
  </Provider>
  </BrowserRouter>,
)
