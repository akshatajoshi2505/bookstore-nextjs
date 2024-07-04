'use client';

const SuccessPage = () => {
    const orderId = window.location.pathname.split('/').pop();
    console.log("orderId : " + orderId);
    return (
        <main className="min-h-screen bg-teal-50 flex flex-col justify-center py-12">
            <div className="relative py-3 sm:max-w-lg sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 shadow-xl transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-6 py-10 bg-white shadow-2xl sm:rounded-3xl sm:p-16">
                    <h1 className="text-3xl font-extrabold text-center mb-6 text-teal-900">Thank You for Your Order!</h1>
                    <p className="text-lg text-center mb-8 text-gray-800">Your order ID is: <span className="font-semibold text-teal-600">{orderId}</span></p>
                    <div className="text-center">
                        <a
                            href="/orders"
                            className="inline-block px-8 py-3 text-base font-semibold text-white uppercase transition duration-300 ease-in-out bg-teal-600 rounded-full cursor-pointer hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        >
                            View All Orders
                        </a>
                        <a
                            href="/products"
                            className="inline-block px-8 py-3 text-base font-semibold text-teal-800 uppercase transition duration-300 ease-in-out bg-white border border-teal-300 rounded-full cursor-pointer hover:bg-teal-50 mt-4 sm:mt-0 ml-4"
                        >
                            Continue Shopping
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SuccessPage;
