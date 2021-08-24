import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

const MeContext = createContext<{ me: number | null }>({
  me: null,
});

interface MeProviderProps {
  children: JSX.Element | JSX.Element[];
}
const MeProvider = ({ children }: MeProviderProps): JSX.Element => {
  const [me, setMe] = useState<number | null>(null);

  useEffect(() => {
    const getMe = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.statusText === 'OK') {
          setMe(+response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getMe();
  }, []);
  return <MeContext.Provider value={{ me }}>{children}</MeContext.Provider>;
};

export { MeContext, MeProvider };
