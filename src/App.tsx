
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './pages';
import './styles/style.css';
export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    </div>
  )
}

export default App


