import React, { useState } from "react";
import { UserLogin } from "../Types";
import { InfinitySpin } from "react-loader-spinner";
import { NavigateFunction, useNavigate } from "react-router";
import { signInApi } from "../Api";
import { useDispatch } from "react-redux";
import { signIn } from "../Store/authSlice";
import { Link } from "react-router-dom";

function SignIn() {
  const navigation: NavigateFunction  = useNavigate();
  const [user, setUser] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleSignIn = async(event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setLoading(true)
      const data = await signInApi(user)
      dispatch(signIn(data.user));      
    } catch (error:any) {
    }finally{
        setLoading(false)
    }
  };
  const handleForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <Link to="/">
            <h3 className="text-4xl font-bold text-purple-600">Chat Plus</h3>
          </Link>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={handleSignIn}>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleForm}
                  placeholder="example@example.com"
                  required
                  minLength={3}
                  maxLength={40}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleForm}
                  placeholder="password"
                  required
                  minLength={8}
                  maxLength={20}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="flex items-center justify-end mt-4">
              <Link
                className="text-sm text-gray-600 underline hover:text-gray-900"
                to="/signup"
              >
                Don't have a account?
              </Link>
              {loading ? (
                <InfinitySpin width="200" color="#4fa94d" />
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                >
                  Sign In
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
