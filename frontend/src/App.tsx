import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/common/Layout';
import Main from './pages/Main';

const App: FC = () => {
  const token = localStorage.getItem('token');

  const [me, setMe] = useState<number | null>(null);

  useEffect(() => {
    const getMe = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.statusText === 'OK') {
          setMe(response.data.userId);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getMe();
  }, [token]);

  if (!me) return <div>login page</div>;

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Main} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
