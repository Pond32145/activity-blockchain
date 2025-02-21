import { useState } from 'react';
import Logo from '../images/logoit.png';

export default function SignInSide() {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      username: data.get('username'),
      password: data.get('password'),
    };

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok && result.status === 'ok') {
        localStorage.setItem('token', result.token);
        localStorage.setItem('role', result.role);
        if (result.role === 'admin') {
          window.location = '/admin/dashboard'; // Redirect to admin dashboard
        } else if (result.role === 'teacher') {
          window.location = '/teacher/calendar'; // Redirect to teacher dashboard
          localStorage.setItem('staff_ID', result.staff_ID);
        } else {
          window.location = '/activity/calendar'; // Redirect to user dashboard
          localStorage.setItem('std_ID', result.std_ID);
        }
      } else {
        setErrorMessage('Login failed. Please check your username and password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <section className="min-h-screen flex items-stretch text-white ">
        <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)' }}>
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">INFORMATION TECHNOLOGY</h1>
            <p className="text-3xl my-4">ยินดีต้อนรับเข้าสู่ระบบกิจกรรมของสาขาเทคโนโลยีสารสนเทศ</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="w-full lg:w-1/2 bg-gray-900 flex flex-col items-center justify-center relative">
          <div className="grid grid-cols-1 w-11/12 sm:w-3/4 lg:w-2/3">
            <div className="flex flex-col items-center">
              <img src={Logo} alt="" className='w-60 -mb-14' />
              <h2 className="text-3xl font-extrabold text-white">LOGIN</h2>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className="mt-4">
              <label htmlFor="username" className="text-sm font-bold text-white">Username</label>
              <input type="username" id="username" name="username" className="w-full p-2 mt-1 text-white bg-gray-800 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="text-sm font-bold text-white">Password</label>
              <input type="password" id="password" name="password" className="w-full p-2 mt-1 text-white bg-gray-800 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>
            <div className="flex items-center justify-between mt-4">
              <div>
                <a href="#" className="text-sm font-semibold text-purple-600 hover:text-white">Forgot your password?</a>
              </div>
            </div>
            <div className="mt-6">
              <button className="w-full p-3 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:border-purple-300">Sign In</button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
