import { useEffect, useState } from "react";
import { Footer } from "../../components/footer/footer";
import Header from "../../components/header/header";
import './sign Up Styles/signUp.css';
import axios from "axios";

export default function SignUp(){

  const [fname, getFName] = useState("");
  const [lname, getLName] = useState("");
  const [email, getEmail] = useState("");
  const [password, getPassword] = useState("");
  const [whatsapp, getwhatsapp] = useState("");
  const [telephone, getTelephone] = useState("");

  
    function submitData(){
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(()=>{

        const userData = {
          firstName: fname,
          lastName: lname,
          email: email,
          password: password,
          whatsapp: whatsapp,
          phone: telephone,
          type: 'customer',
          disabled: false,
          emailVerified: false
        }
        
        console.log(fname);
        console.log(lname);
    
    axios.post(import.meta.env.VITE_BACKEND_URL + '/api/users',
      userData
    ).then((res)=>{
      console.log(res);
      location.href = '/login';
    }).catch((e)=>{
      console.log(e);
    });
    
    
      }, [fname, lname, email, password, whatsapp, telephone]);
    
    }

return(
  <>
  <Header />
  <div className="w-full h-screen pic-bg-signup flex items-center justify-center px-4">
      <div className="bg-white max-w-lg w-full p-6 sm:p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <form className="space-y-4">
              <div className="flex flex-wrap gap-4">
                  <input
                  required
                      type="text"
                      placeholder="First Name"
                      className="flex-1 min-w-[45%] px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                      onChange={(e)=>{
                          getFName(e.target.value);
                      }}
                  />
                  <input
                      type="text"
                      placeholder="Last Name"
                      className="flex-1 min-w-[45%] px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                      onChange={(e)=>{
                        getLName(e.target.value);
                      }}
                  />
              </div>
              <input
                  required
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e)=>{
                    getEmail(e.target.value);
                  }}
             />
              <input
                  required
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e)=>{
                    getPassword(e.target.value);
                  }}
              />
              <input
                  type="text"
                  placeholder="WhatsApp No"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e)=>{
                    getwhatsapp(e.target.value);
                  }}
              />
              <input
                   required
                  type="text"
                  placeholder="Contact No"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e)=>{
                    getTelephone(e.target.value);
                  }}
              />
              <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                  onClick={()=>submitData()}
              >
                  Register
              </button>
          </form>
      </div>
  </div>
  <Footer />
</>
);
  
}