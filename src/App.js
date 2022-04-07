import './App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/home';
import LogIn from './pages/login';
import SignIn from './pages/signin';
import User from './pages/user';
import Meet from './pages/meet';
import { UserProvider } from './hooks/use-user';
import AppBarNew from './components/app-bar';


function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <div className="App">
          <AppBarNew />
          <Routes>
            <Route exact path='/'element={<LogIn />} />
            <Route path='/home'element={<Home />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/user' element={<User />} />
            <Route path='/meet' element={<Meet />} />
          </Routes>
        </div>
        </UserProvider>
    </BrowserRouter>
  );
}

export default App;
