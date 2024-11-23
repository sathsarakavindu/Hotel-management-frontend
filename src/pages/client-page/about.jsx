


import "./styles/about.css";
import { Footer } from "./../../components/footer/footer";
import Header from "../../components/header/header";

export default function About() {
    return (
        <>
            <Header />
            <div className="about-bg">
                <div className="relative z-10 flex items-center justify-center h-full flex-col top-0 px-4">
                    <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 text-center">
                        About Us
                    </h1>

                    <div className="bg-blue-100 w-full max-w-2xl p-6 rounded-3xl shadow-md">
                        <p className="text-gray-800 text-justify leading-relaxed">
                            Welcome to <strong>Leonine Villa</strong>, where luxury meets tranquility. Nestled in the heart of serene surroundings, Leonine Villa is your perfect getaway destination, offering a harmonious blend of modern elegance and timeless hospitality. From our beautifully designed rooms and state-of-the-art amenities to our personalized service, every detail is crafted to ensure an unforgettable experience. Whether you are here for a relaxing retreat, a family vacation, or a business trip, Leonine Villa promises to provide an unparalleled stay. Discover the perfect balance of comfort and sophistication at Leonine Villa—your home away from home.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
