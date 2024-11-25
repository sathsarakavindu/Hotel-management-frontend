

// import UserTag from "../userData/user_data";



// function Header(){
//    return(
//     <>
//     <header className="min-w-full bg-blue-400 flex sm:h-[70px] lg-h[100px] relative items-center p-[10px]">
//         <h1 className="text-white text-[30px]">Leonine villa</h1>
// <div className="ml-10 items-center text-center flex ">
//     <h2 className="cursor-pointer">Booking</h2>
//     <h2 className="ml-5 cursor-pointer" onClick={()=>{ location.href = "/categories"}}>Categories</h2>
//     <h2 className="ml-5 cursor-pointer" onClick={()=>{ location.href = "/about"}}>About</h2>
    
    
//     </div>
//     <div className="ml-[790px] flex">
//         <h2 className=" mr-5 cursor-pointer" onClick={()=>{ location.href = "/login"}}>Sign In</h2>
//         <h2 className=" cursor-pointer" onClick={()=>{ location.href = "/signup" }}>Sign Up</h2>
//     </div>

//         <UserTag imageLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEe4NVgnpy6YeUmawOljeUYRWv4rjkvUIlDldc6u6RADAK5PGpxngvq3c&s" name="Kavindu sathsara"/>
     
//     </header>
    
//     </>
//    );
// }

// export default Header;
import UserTag from "../userData/user_data";

function Header(){
   return(
    <header className="w-full bg-blue-400 flex flex-wrap items-center justify-between p-4">
        {/* Logo Section */}
        <div className="flex items-center">
            <h1 className="text-white text-2xl lg:text-3xl font-bold">Leonine Villa</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 mt-2 sm:mt-0">
            <h2 className="text-white cursor-pointer hover:text-gray-200" onClick={()=>{window.location.href = "/add-booking"}}>Booking</h2>
            <h2 className="text-white cursor-pointer hover:text-gray-200" onClick={() => { window.location.href = "/categories" }}>Categories</h2>
            <h2 className="text-white cursor-pointer hover:text-gray-200" onClick={() => { window.location.href = "/about" }}>About</h2>
        </nav>

        {/* Sign In/Sign Up Links and UserTag */}
        <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            {/* Conditional Rendering based on Authentication */}
            {!localStorage.getItem("token") ? (
                <>
                    <h2 className="text-white cursor-pointer hover:text-gray-200" onClick={() => { window.location.href = "/login" }}>Sign In</h2>
                    <h2 className="text-white cursor-pointer hover:text-gray-200" onClick={() => { window.location.href = "/signup" }}>Sign Up</h2>
                </>
            ) : (
                <UserTag 
                    imageLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEe4NVgnpy6YeUmawOljeUYRWv4rjkvUIlDldc6u6RADAK5PGpxngvq3c&s" 
                    name="" 
                />
            )}
        </div>
    </header>
    );
}

export default Header;
