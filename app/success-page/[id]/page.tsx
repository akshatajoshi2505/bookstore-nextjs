'use client';

const SuccessPage = () => {
    // const router = useRouter();
    // const { orderId } = router.query;
    const orderId = window.location.pathname.split('/').pop();
    console.log("orderId : " + orderId);
    return (
        <main className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <h1 className="text-4xl font-bold text-center mb-4">Thank you for your order!</h1>
                    <p className="text-xl text-center mb-8">Your order ID is: <span className="font-semibold">{orderId}</span></p>
                    <div className="text-center">
                        <a href="/orders" className="inline-block px-7 py-3 text-sm font-semibold text-white uppercase transition duration-300 ease-in-out bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 mr-4">View All Orders</a>
                        {/* Optional: Add a button for returning to the homepage or shopping cart */}
                        <a href="/products" className="inline-block px-7 py-3 text-sm font-semibold text-gray-700 uppercase transition duration-300 ease-in-out bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">Continue Shopping</a>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SuccessPage;
