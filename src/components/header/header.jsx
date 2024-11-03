import UserTag from "../userData/user_data";

function Header(){
   return(
    <header className="w-full bg-blue-400 flex h-[100px] relative items-center p-[10px]">
        <h1 className="text-white text-[30px]">Leonine villa</h1>
<div className="ml-10 items-center text-center flex ">
    <h2 >Booking</h2>
    <h2 className="ml-5 ">Categories</h2>
    <h2 className="ml-5 ">About</h2>
    </div>

        <UserTag imageLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEe4NVgnpy6YeUmawOljeUYRWv4rjkvUIlDldc6u6RADAK5PGpxngvq3c&s" name="Kavindu sathsara"/>
     
    </header>
   );
}

export default Header;