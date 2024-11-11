import Blog from "./containers/Blog/Blog";

import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename="/">
      <div className="App">
        <Blog />
      </div>
    </BrowserRouter>
  );
}

export default App;
