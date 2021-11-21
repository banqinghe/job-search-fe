import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-gray-200 flex-1"></div>
      <Footer />
    </div>
  );
}

export default App
