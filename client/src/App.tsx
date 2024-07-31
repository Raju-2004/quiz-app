import './App.css'

import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainRoutes from './main-route'
import { Provider } from 'react-redux'
import appStore from './store/AppStore'

function App() {
  return (
    <Provider store={appStore}>
      <div>
        <BrowserRouter>
          <MainRoutes />
          <ToastContainer />
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
