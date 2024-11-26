import { createRoot } from 'react-dom/client'
import './index.css'
import AppContainer from "./containers/AppContainer.tsx";

createRoot(document.getElementById('root')!).render(
  <>
    <AppContainer />
  </>,
)

