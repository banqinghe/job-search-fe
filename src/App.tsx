import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './views/person/Register';
import NoContent from './views/NoContent';
import { GlobalState } from '@/store/state';

function App() {
  const isBarDisplay = useSelector<GlobalState>(state => state.isBarDisplay);

  return (
    <div className="flex flex-col min-h-screen">
      <Header style={isBarDisplay ? undefined : { display: 'none' }} />
      <main className="relative flex-1 flex">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<NoContent />}></Route>
          <Route path="*" element={<Navigate to="/404" replace />}></Route>
        </Routes>
      </main>
      <Footer style={isBarDisplay ? undefined : { display: 'none' }} />
    </div>
  );
}

export default App
