import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Login/Login.jsx';
import ForgotPassword from './components/Login/Forgotpass.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import FormPage from './components/Form-Services/FormPage.jsx';
import FormComponent from './components/Form-Services/RespondForm.jsx';
import DynamicForm from './components/Form-Services/CreateForm.jsx';
import MailForm from './components/Mail-Services/MailFlooding.jsx';
import UploadXLFilePage from './components/Excel-Services/ExcelServices.jsx';
import FolderPage from './components/FileStorage-service/MainPageService.jsx';
import ImageGallery from './components/FileStorage-service/fivefolders/Imagehandleserv/ImageFileHandler.jsx';
import FileGallery from './components/FileStorage-service/fivefolders/FileHandleServ/FileDisppage.jsx';
import AudioGallery from './components/FileStorage-service/fivefolders/Audiohandleserv/AudioService.jsx';
import SignUpForm from './components/Signup/Signup.jsx';
import VideoGallery from './components/FileStorage-service/fivefolders/VideoHandleserv/Videosserv.jsx';
import ScratchGall from './components/FileStorage-service/fivefolders/Scratchhandleserv/scratch.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/navbar' element={<Navbar/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/form-page' element={<FormPage/>}/>
          <Route path='/respond-to-a-form' element={<FormComponent/>}/>
          <Route path='/create-a-form' element={<DynamicForm/>}/>
          <Route path='/email-flooding-service' element={<MailForm/>}/>
          <Route path='/excel-xlsx-service' element={<UploadXLFilePage/>}/>
          <Route path='/folder-display-page' element={<FolderPage/>}/>
          <Route path='/images' element={<ImageGallery/>}/>
          <Route path='/files' element={<FileGallery/>}/>
          <Route path='/audios' element={<AudioGallery/>}/>
          <Route path='/sign-up' element={<SignUpForm/>}/>
          <Route path='/videos' element={<VideoGallery/>}/>
          <Route path='/scratchs' element={<ScratchGall/>}/>
        </Routes>
      </Router>
    </>
      
  );
};

export default App;