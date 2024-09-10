import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LayoutBuilder from './LayoutBuilder';
import AlphabetGrid from './Alphabet';

function App() {
  
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
       

        <nav className="bg-gray-800 text-white p-4">
          <ul className="flex justify-center space-x-8">
            <li>
              <Link
                to="/layout-builder"
                className="hover:bg-gray-700 px-3 py-2 rounded transition duration-200"
              >
                Layout Builder
              </Link>
            </li>
            <li>
              <Link
                to="/alphabet-grid"
                className="hover:bg-gray-700 px-3 py-2 rounded transition duration-200"
              >
                Alphabet Tile Interaction
              </Link> 
            </li>
          </ul>
        </nav>

        <main className="flex-grow p-6">
          <Routes>
            <Route path="/layout-builder" element={<LayoutBuilder />} />
            {/* <Route path="/alphabet-grid" element={<AlphabetGrid />} /> */}
          </Routes>
        </main>

        <main className="flex-grow p-6">
          <AlphabetGrid />
        </main>
      </div>
    </Router>
  );
}

export default App;
