import { useState } from 'react';
import { useCart } from '@/app/lib/CartContext';

const CheckoutForm = () => {
    const [formState, setFormState] = useState({
        customerName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });
    const { cart } = useCart();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({...prevState, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const order = {
            productName: '',
            price: '',
            quantity: '',
            customerName: formState.customerName,
            cardNumber: formState.cardNumber,
            expiryDate: formState.expiryDate,
            cvv: formState.cvv,
        };

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 m-auto">
            <div>
                <label htmlFor="customerName" className="block">Customer Name</label>
                <input
                    id="customerName"
                    name="customerName"
                    type="text"
                    value={formState.customerName}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
            </div>
            <div>
                <label htmlFor="cardNumber" className="block">Card Number</label>
                <input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    value={formState.cardNumber}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    pattern="[0-9]{16}" // Simple validation for 16 digits
                    required
                />
            </div>
            <div>
                <label htmlFor="expiryDate" className="block">Expiry Date</label>
                <input
                    id="expiryDate"
                    name="expiryDate"
                    type="text"
                    value={formState.expiryDate}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    pattern="\d{2}/\d{2}" // Validation for MM/YYYY format
                    required
                />
            </div>
            <div>
                <label htmlFor="cvv" className="block">CVV</label>
                <input
                    id="cvv"
                    name="cvv"
                    type="text"
                    value={formState.cvv}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    pattern="[0-9]{3}" // Simple validation for 3 digits
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
            </button>
        </form>
    );
};

export default CheckoutForm;
