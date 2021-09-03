import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/common/Layout';
import { MeProvider } from './contexts';
import Main from './pages/main';
import Profile from './pages/profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: FC = () => {
  // const token = localStorage.getItem('token');

  // const [me, setMe] = useState<number | null>(null);

  // useEffect(() => {
  //   const getMe = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_BACK_URL}/users/me`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         },
  //       );

  //       if (response.statusText === 'OK') {
  //         setMe(response.data.userId);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getMe();
  // }, [token]);

  // if (!me) return <div>login page</div>;

  return (
    <MeProvider>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/profile/:userId" component={Profile} />
          </Switch>
        </Layout>
      </Router>
      <ToastContainer />
    </MeProvider>
  );
};

export default App;
