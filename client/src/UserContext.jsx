/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';
// не понял почему не работает useNavigate
// использовать контекст конечно рановато, но я на него наткнулся и решил изучить, очень полезная штука и удобная :)
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const cookieUser = Cookies.get('user');
    return cookieUser ? JSON.parse(cookieUser) : null;
  });

  const login = (userData) => {
    Cookies.set('user', JSON.stringify(userData), { expires: 7 });
    setUser(userData);
    window.location.href = '/';
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('user');
    window.location.href = '/';
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
