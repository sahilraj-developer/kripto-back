// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../auth/AuthProvider";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login }:any = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     login({ email }); // Simulate authentication
//     navigate("/client"); // Redirect after login
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <form onSubmit={handleLogin} className="p-6 bg-white shadow-md rounded">
//         <h2 className="text-xl font-bold mb-4">Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border p-2 w-full mb-2"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-2 w-full mb-4"
//         />
//         <button className="bg-blue-500 text-white p-2 w-full rounded" type="submit">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;







import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login }:any  = useAuth();
  const navigate = useNavigate();

  // const handleLogin = (e: { preventDefault: () => void; }) => {
  //   e.preventDefault();
  //   setIsLoading(true);
    
  //   // Simulate authentication with a slight delay for better UX
  //   setTimeout(() => {
  //     login({ email });
  //     setIsLoading(false);
  //     navigate("/client");
  //   }, 800);
  // };



  const handleLogin = async (e: { preventDefault: () => void }) => {
  e.preventDefault();
  setIsLoading(true);

try {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/user/login`,
    { email, password }, // Pass data directly, no need to stringify
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // Handle success
  login(response.data); // Assuming login() saves token or user data
  navigate("/client");

} catch (error: any) {
  console.error("Login error:", error.response?.data?.message || error.message);
  alert(error.response?.data?.message || "Login failed");
} finally {
  setIsLoading(false);
}

};


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center">
            <h1 className="text-3xl font-boldtext-black mb-1">Welcome Back</h1>
            <p className="text-black">Sign in to continue to your account</p>
          </div>

          {/* Form */}
          <div className="px-8 pb-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-black block">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white bg-opacity-20 border border-transparent focus:border-indigo-300 text-white rounded-xl placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-black block">
                    Password
                  </label>
                  <a href="#" className="text-sm text-black hover:text-white transition">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white bg-opacity-20 border border-transparent focus:border-indigo-300 text-white rounded-xl placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition duration-200 flex items-center justify-center ${isLoading ? 'opacity-80' : ''}`}
              >
                {isLoading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                ) : null}
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

