

import UserTag from "../userData/user_data";



function Header(){
   return(
    <>
    <header className="min-w-full bg-blue-400 flex sm:h-[50px] lg-h[100px] relative items-center p-[10px]">
        <h1 className="text-white text-[30px]">Leonine villa</h1>
<div className="ml-10 items-center text-center flex ">
    <h2 className="cursor-pointer">Booking</h2>
    <h2 className="ml-5 cursor-pointer" onClick={()=>{ location.href = "/categories"}}>Categories</h2>
    <h2 className="ml-5 cursor-pointer" onClick={()=>{ location.href = "/about"}}>About</h2>
    
    
    </div>
    <div className="ml-[790px] flex">
        <h2 className=" mr-5 cursor-pointer" onClick={()=>{ location.href = "/login"}}>Sign In</h2>
        <h2 className=" cursor-pointer" onClick={()=>{ location.href = "/signup" }}>Sign Up</h2>
    </div>

        <UserTag imageLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEe4NVgnpy6YeUmawOljeUYRWv4rjkvUIlDldc6u6RADAK5PGpxngvq3c&s" name="Kavindu sathsara"/>
     
    </header>
    
    </>
   );
}

export default Header;