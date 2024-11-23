import { useLocation } from "react-router-dom";
import { Footer } from "../../components/footer/footer";
import Header from "../../components/header/header";
import HotelCard from "../../components/HotelCard/hotelCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FilteredCategory() {
  const [categoryRoomList, setCategoryRoomList] = useState([]);
  const [isCategoryListLoaded, setIsCategoryListLoaded] = useState(false);

  const location = useLocation();
  const { category_name } = location.state || {};
  const { category_price } = location.state || {};

  useEffect(() => {
    if (!isCategoryListLoaded) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/room/by-category/${category_name}`)
        .then((res) => {
          console.log(res.data.rooms);
          setCategoryRoomList(res.data.rooms);
          setIsCategoryListLoaded(true);
          console.log("Updated categoryRoomList length:", categoryRoomList.length);
          console.log(`Price ${category_price}`);
        })
        .catch((err) => console.error(err));
    }
  }, [isCategoryListLoaded]);

  return (
    <>
      <Header />
      <div className="bg-white flex flex-col w-full h-screen items-center">
        <h2 className="text-2xl font-bold mb-6 mt-6">
          {category_name ? (
            <>
              <strong>{category_name}</strong>
            </>
          ) : null}
        </h2>
        {console.log(`Category length is ${categoryRoomList.length}`)}
        {categoryRoomList.length > 0 ? (
          categoryRoomList.map((room, index) => (
            // <HotelCard key={index} hotel={room} />
            <HotelCard key={index} hotel={room} categoryPrice={category_price} />

          ))
        ) : (
          <p>No rooms available for this category {categoryRoomList.length}.</p>
        )}
      </div>
      <Footer />
    </>
  );
}
