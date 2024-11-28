import { Footer } from '../../components/footer/footer';
import Header from './../../components/header/header';
import Feedback from './view_feedback';
export default function HomePage(){
    return(
    <>
         <Header/>

<div className="w-full h-screen bg-blue-900 flex flex-col items-center">
 
  <h1 className="text-white text-[50px] w-full text-center hidden lg:block"> Welcome to the Leonine Villa</h1>
    
  <h1 className="text-white text-[50px] w-full ext-centert lg:hidden"> Welcome to Sri Lanka</h1>

  <div className="border border-white bg-white mt-[20px] px-[10px] py-[20px] rounded-lg flex justify-center items-center">
<input type="date"/>
<input type="date"/>
<select>
  <option>Luxury</option>
  <option>Normal</option>
  <option>Low</option>
</select>
  </div>
</div>
<Feedback/>
<Footer/>
</>
);
}