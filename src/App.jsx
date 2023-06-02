import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookList from './components/bookList/booklist';
import BookDetails from './components/bookDetails/BookDetails';
import Header from './components/header/Header'

import './App.css'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books/:slug" element={<BookDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;