

import Header from './../../components/header/header';




export default function HomePage(){

    return(
    <>
         <Header/>

<div className="w-full h-screen bg-blue-900 flex flex-col justify-center items-center">
  <div className="border border-white bg-white h-[100px] w-[700px] rounded-lg flex justify-center">
<input type="date"/>
<input type="date"/>
<select>
  <option>Luxury</option>
  <option>Normal</option>
  <option>Low</option>
</select>
  </div>
  <h1 className="text-white text-[50px]"> Welcome to the Leonine Villa</h1>
</div>


    
        </>
    );
}