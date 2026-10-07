import { myAxios } from "../api/axios";
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const csrf = () => myAxios.get("/sanctum/csrf-cookie");

  //bejelentkezett felhasználó adatainak lekérése
  const getUser = async () => {
    try {
        const response = await myAxios.get("/api/user", {
        validateStatus: (status) => status === 200 || status === 401,
        });

        if (response.status === 401) {
        setUser(null);
        return null;
        }

        setUser(response.data);
        return response.data;
    } catch (error) {
        setUser(null);
        return null;
    }
  };

  const logout = async () => {
    await csrf();
    await myAxios.post("/logout");
    setUser(null);
  };

    const loginReg = async ({ ...adat }, vegpont) => {
    //lekérjük a csrf tokent
    await csrf();


    setErrors({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });

    try {
      await myAxios.post(vegpont, adat);

      await getUser();
    } catch (error) {
      if (error?.response?.status === 422) {
        setErrors(error.response.data.errors);
      }

      throw error;
    }
  };

  useEffect(() => {
    // laravel_session is HttpOnly — JS cannot read it; always ask the API
    getUser().finally(() => setAuthLoading(false));
  }, []);

        return (
            <AuthContext.Provider value={{ logout, loginReg, errors, getUser, user, authLoading }}>
            {children}
            </AuthContext.Provider>
        );
    };
export default function useAuthContext() {
  return useContext(AuthContext);

}