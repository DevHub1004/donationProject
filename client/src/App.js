import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Upload" element={<UploadPage />} />
      </Routes>
    );
}

export default App;
