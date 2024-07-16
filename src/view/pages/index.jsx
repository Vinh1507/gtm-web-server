import 'bootstrap/dist/css/bootstrap.min.css';


import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

// import LocalStorageService from '../../service/LocalStorageService';

export default function HomePageComponent() {
  const navigate = useNavigate();
  useEffect(() => {
    // if (LocalStorageService.getToken()) {
    //   navigate('/home');
    //   return;
    // }
    navigate('/login');
  }, [navigate]);
}
