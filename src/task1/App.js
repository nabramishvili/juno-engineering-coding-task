import logo from '../logo.svg';
import './App.css';
import ImageCarousel from "./ImageCarousel";

function App() {
  return (
      <div className="carousel_wrapper">
        <div className="carousel">
          <ImageCarousel />
        </div>
      </div>
  );
}

export default App;
