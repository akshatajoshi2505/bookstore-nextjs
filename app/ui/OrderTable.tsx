const OrderTable = () => {
    return (
        <table className="w-full border-collapse border">
            <thead>
            <tr>
                <th className="py-2 px-4 border">Order #</th>
                <th className="py-2 px-4 border">Product Name</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Quantity</th>
                <th className="py-2 px-4 border">Status</th>
            </tr>
            </thead>
            <tbody>
                <tr key={1}>
                <td className="py-2 px-4 border">{'TBA'}</td>
                <td className="py-2 px-4 border">{'TBA'}</td>
                <td className="py-2 px-4 border">{'TBA'}</td>
                <td className="py-2 px-4 border">{'TBA'}</td>
                <td className="py-2 px-4 border">{'TBA'}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default OrderTable;
