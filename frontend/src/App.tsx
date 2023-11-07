import { BrowserRouter,Routes ,Route} from 'react-router-dom'
import './App.css'
import Home from '@/views/Home/index';
import MainLayout from './layout/MainLayout';

const App = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
}

// NotFound component for 404 errors
const NotFound = () => {
    return (
        <div>
            <h2>404 Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
        </div>
    )
}

export default App
