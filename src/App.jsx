import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookList from './components/bookList/booklist';
import BookDetails from './components/bookDetails/BookDetails';
import BookFormNew from './components/bookFormNew/BookFormNew';
import BookFavorites from './components/bookFavorites/BookFavorites';
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
          <Route path="/form-new-book" element={<BookFormNew />} />
          <Route path="/favorites" element={<BookFavorites />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;