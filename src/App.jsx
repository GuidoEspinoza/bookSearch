import { 
  BrowserRouter 
  // Routes, 
  // Route 
} from 'react-router-dom';
import Header from './components/header/header';
import BookList from './components/bookList/booklist';

import './App.css'

function App() {

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <BookList />
      </div>
    </BrowserRouter>
  )
}

export default App
