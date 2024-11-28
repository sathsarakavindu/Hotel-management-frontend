// import axios from "axios";
// import { useEffect, useRef, useState } from "react";

// const Gallery = () => {
//   const [galleryList, setGalleryList] = useState([]);
//   const [isLoading, setLoading] = useState(false);
//   const galleryRef = useRef(null);

//   useEffect(() => {
//     if (!isLoading) {
//       axios
//         .get(import.meta.env.VITE_BACKEND_URL + "/api/gallery")
//         .then((results) => {
//           console.log("Gallery data", results.data.data);
//           setGalleryList(results.data.data);
//           setLoading(true);
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     }
//   }, [isLoading]);

//   const scrollLeft = () => {
//     galleryRef.current.scrollBy({
//       left: -300,
//       behavior: "smooth",
//     });
//   };

//   const scrollRight = () => {
//     galleryRef.current.scrollBy({
//       left: 300,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="w-full flex flex-col items-center bg-gradient-to-b from-gray-50 to-gray-200 py-10">
//       {/* Title */}
//       <h1 className="text-5xl font-extrabold text-gray-800 mb-8">
//         Gallery
//       </h1>

//       <div className="relative w-full max-w-7xl">
//         {/* Left Scroll Button */}
//         <button
//           onClick={scrollLeft}
//           className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-900 to-gray-700 text-white p-4 rounded-full shadow-lg hover:scale-105 focus:outline-none z-10"
//         >
//           &lt;
//         </button>

//         {/* Gallery Container */}
//         <div
//           ref={galleryRef}
//           className="flex overflow-x-scroll scrollbar-hide space-x-6 px-4"
//         >
//           {galleryList.length === 0 ? (
//             <p className="text-gray-500 text-xl mx-auto">
//               No gallery items found.
//             </p>
//           ) : (
//             galleryList.map((image) => (
//               <div
//                 key={image.id}
//                 className="min-w-[300px] bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-transform duration-300"
//               >
//                 <img
//                   src={image.image}
//                   alt={image.name}
//                   className="w-full h-64 object-cover"
//                 />
//                 <div className="p-4">
//                   <h2 className="text-2xl font-semibold text-gray-800">
//                     {image.name}
//                   </h2>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Right Scroll Button */}
//         <button
//           onClick={scrollRight}
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-gray-900 to-gray-700 text-white p-4 rounded-full shadow-lg hover:scale-105 focus:outline-none z-10"
//         >
//           &gt;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Gallery;

import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Gallery() {
  const [galleryList, setGalleryList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const scrollContainerRef = useRef(null); // Reference for scrolling container

  useEffect(() => {
    if (!isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/gallery")
        .then((results) => {
          console.log("Gallery data:", results.data.data);
          setGalleryList(results.data.data);
          setLoading(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isLoading]);

  // Scroll Left
  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -300, // Adjust scroll distance
      behavior: "smooth",
    });
  };

  // Scroll Right
  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 300, // Adjust scroll distance
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full min-h-[70px] flex flex-col bg-gradient-to-b from-gray-100 to-gray-300 py-10">
      <div className="w-full p-4 flex-grow">
        <h1 className="text-center text-black font-extrabold text-4xl mb-6">
          Gallery
        </h1>

        {/* Horizontal Scrolling Section */}
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 z-10"
          >
            &lt;
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 z-10"
          >
            &gt;
          </button>

          {/* Gallery Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide px-8 py-4"
          >
            {galleryList.map((image, index) => (
              <div
                key={index}
                className="min-w-[300px] bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between border border-gray-200 hover:shadow-2xl transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={image.image}
                  alt={image.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                  {image.name}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
