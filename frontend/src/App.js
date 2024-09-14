import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import PostPage from './components/PostPage';
import PostForm from './components/PostForm';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/post/:id' element={<PostPage />}/>
        <Route path='/new-post' element={<PostForm />}/>
        <Route path='/edit-post/:id' element={<PostForm />}/>
      </Routes>
    </Router>
  );
}

export default App;

