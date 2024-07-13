import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
export default function Login() {
  const [loginInput, setLoginInput] = useState({
    userName: "",
    password: "",
  });
  const { loading, login } = useLogin();
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("LOGIN INFO BEFORE SENDING", loginInput);
    await login(loginInput);
  }
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-grey-300">
          Login
          <span className="text-blue-500"> ChatApp</span>
        </h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={loginInput.userName}
              onChange={(e) =>
                setLoginInput({ ...loginInput, userName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={loginInput.password}
              onChange={(e) =>
                setLoginInput({ ...loginInput, password: e.target.value })
              }
            />
          </div>
          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account ?
          </Link>
          <button className="btn btn-block btn-sm mt-2" disabled={loading}>
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

///
//STARTED CODE FOR THIS FILE
// export default function Login() {
//   return (
//     <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//       <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//         <h1 className="text-3xl font-semibold text-center text-grey-300">
//           Login
//           <span className="text-blue-500"> ChatApp</span>
//         </h1>
//         <form>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Username</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter username"
//               className="w-full input input-bordered h-10"
//             />
//           </div>
//           <div>
//             <label className="label">
//               <span className="text-base label-text">Password</span>
//             </label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               className="w-full input input-bordered h-10"
//             />
//           </div>
//           <a
//             href="#"
//             className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
//           >
//             {"Don't"} have an account ?
//           </a>
//         </form>
//         <button className="btn btn-block btn-sm mt-2">Login</button>
//       </div>
//     </div>
//   );
// }
