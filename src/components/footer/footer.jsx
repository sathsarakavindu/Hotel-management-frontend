export function Footer() {
    return (
        <>
            <footer className="bg-blue-200 w-full p-6 flex flex-col items-center text-center">
                <div className="text-sm sm:text-base max-w-4xl px-4">
                    All material herein © 2005–2024 Leonine Company Pte. Ltd. All Rights Reserved.
                </div>
                <div className="text-sm sm:text-base max-w-4xl px-4 mt-2">
                    Leonine is part of Booking Holdings Inc., the world leader in online travel & related services.
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                    <a href="#" className="text-sm sm:text-base hover:underline">
                        Agoda
                    </a>
                    <a href="#" className="text-sm sm:text-base hover:underline">
                        Booking.com
                    </a>
                    <a href="#" className="text-sm sm:text-base hover:underline">
                        Priceline
                    </a>
                    <a href="#" className="text-sm sm:text-base hover:underline">
                        OpenTable.com
                    </a>
                </div>
            </footer>
        </>
    );
}
