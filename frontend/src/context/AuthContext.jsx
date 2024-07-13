import { createContext, useContext, useState } from "react";

//NOTE: WE USE CONTEXT API AS SOLUTION FOR GLOBAL STATE MANAGEMENT , ELIMINATING THE NEED FOR PROP DRILLING

// 1) CREATING CONTEXT BY NAME AUTH CONTEXT
export const AuthContext = createContext();

//3)CONSUMING CONTEXT , HERE I CREATED A HOOK , I COULD HAVE DONE
// function MyComponent() {
//  DIRECTLY INSIDE THE COMPONENTS
//     const contextValue = useContext(MyContext);
//     return (
//       <div>
//         {/* Use contextValue */}
//       </div>
//     );
//   }

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// 2) CREATING A CONTEXT PROVIDER IN WHICH WE WILL SPECIFY VALUES THAT SHOULD BE GLOBALLY AVAILABLE

// 2) WE WILL WRAP OUR APPLICATION WITH THIS PROVIDER
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-app-user")) || null //data pehle se h toh string se object m laao
  );
  console.log("auth user from context provider", authUser);
  return (
    //THIS AUTHCONTEXT is created above see , we added .Provider next to it
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
