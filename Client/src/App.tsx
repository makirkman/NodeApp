import 'dotenv/config' ;
import { NodeGallery } from './model';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Nodes</h1>
        <NodeGallery></NodeGallery>
      </header>
    </div>
  );
}

export default App;
