import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/home';
import Register from './views/person/Register';
import Personal from './views/person/Personal';
import PersonalInfo from './views/person/PersonalInfo';
import PersonalStar from './views/person/PersonalStar';
import PersonalRecords from './views/person/PersonalRecords';
import NoContent from './views/NoContent';
import { GlobalState } from '@/store/state';

function App() {
  const isBarDisplay = useSelector<GlobalState>(state => state.isBarDisplay);

  return (
    <div className="flex flex-col min-h-screen">
      <Header style={isBarDisplay ? undefined : { display: 'none' }} />
      <main className="relative flex-1 flex">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/personal" element={<Personal />}>
            <Route index element={<PersonalInfo />} />
            <Route path="star" element={<PersonalStar />} />
            <Route path="records" element={<PersonalRecords />} />
          </Route>
          <Route path="/404" element={<NoContent />}></Route>
          <Route path="*" element={<Navigate to="/404" replace />}></Route>
        </Routes>
      </main>
      <Footer style={isBarDisplay ? undefined : { display: 'none' }} />
    </div>
  );
}

export default App
