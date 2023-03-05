import './App.css';
import MyContainer from './components/Beforelogin/MyContainer';
import Showpage from './components/Beforelogin/Showpage';
import Login from './components/Beforelogin/Login';
import Register from './components/Beforelogin/Register';
import Registersuccessful from './components/Beforelogin/Registersuccessful';
import BeNoteCard from './components/Beforelogin/BeNoteCard';
import Belearnmore from './components/Beforelogin/Belearnmore';
import Bsearch from './components/Beforelogin/Bsearch';

import Repe from './components/Errorpage/Repaswordsimple';
import Reue from './components/Errorpage/Reusersame';
import Lope from './components/Errorpage/Loginpassworderror';
import Loue from './components/Errorpage/Loginuserde';

import Lpost from './components/Afterlogin/Lpost';
import Lheader from './components/Afterlogin/Lheader';
import Lcreatpost from './components/Afterlogin/Lcreatpost';
import Notecard from './components/Afterlogin/Notecard';
import Learnmore from './components/Afterlogin/Learnmore';
import Lpostedit from './components/Afterlogin/Lpostedit';
import Lreply from './components/Afterlogin/Lreply';
import Lreplyedit from './components/Afterlogin/Lreplyedit';
import Luserprofile from './components/Afterlogin/Luserprofile';
import Lsearch from './components/Afterlogin/Lsearch';

import Acommentdelete from './components/Adminpage/Acommentdelete';
import Aheader from './components/Adminpage/Aheader';
import Alearnmore from './components/Adminpage/Alearnmore';
import Apost from './components/Adminpage/Apost';
import Apostdelete from './components/Adminpage/Apostdelete';
import Apostedit from './components/Adminpage/Apostedit';
import Asearch from './components/Adminpage/Asearch';
import Acommentedit from './components/Adminpage/Acommentedit';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/MyContainer" element={<MyContainer />} />
        <Route path="/" element={<Showpage />} />
        <Route path="/Showpage" element={<Showpage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Registersuccessful" element={<Registersuccessful />} />
        <Route path="/BeNoteCard" element={<BeNoteCard />} />
        <Route path="/Belearnmore" element={<Belearnmore />} />
        <Route path="/Bsearch" element={<Bsearch />} />
        

        <Route path="/Repe" element={<Repe />} />
        <Route path="/Reue" element={<Reue />} />
        <Route path="/Lope" element={<Lope />} />
        <Route path="/Loue" element={<Loue />} />


        <Route path="/Lpost" element={<Lpost />} />
        <Route path="/Lheader" element={<Lheader />} />
        <Route path="/Lcreatpost" element={<Lcreatpost />} />
        <Route path="/Notecard" element={<Notecard />} />
        <Route path="/Learnmore" element={<Learnmore />} />
        <Route path="/Lpostedit" element={<Lpostedit />} />
        <Route path="/Lreply" element={<Lreply />} />
        <Route path="/Lreplyedit" element={<Lreplyedit />} />
        <Route path="/Luserprofile" element={<Luserprofile />} />
        <Route path="/Lsearch" element={<Lsearch />} />
        

        <Route path="/Acommentdelete" element={<Acommentdelete />} />
        <Route path="/Aheader" element={<Aheader />} />
        <Route path="/Alearnmore" element={<Alearnmore />} />
        <Route path="/Apost" element={<Apost />} />
        <Route path="/Apostdelete" element={<Apostdelete />} />
        <Route path="/Apostedit" element={<Apostedit />} />
        <Route path="/Asearch" element={<Asearch />} />
        <Route path="/Acommentedit" element={<Acommentedit />} />
        
        
      </Routes>
    </Router>
    </>
  );
}

export default App;
