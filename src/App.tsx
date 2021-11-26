import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './views/person/Register';
import NoContent from './views/NoContent';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="relative flex-1 flex">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<NoContent />}></Route>
          <Route path="*" element={<Navigate to="/404" replace />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App
