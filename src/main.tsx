import { createRoot } from 'react-dom/client'
import AppContainer from "./containers/AppContainer.tsx";
import './index.css'
import 'react-loading-skeleton/dist/skeleton.css'

createRoot(document.getElementById('root')!).render(
  <>
    <AppContainer />
  </>,
)

