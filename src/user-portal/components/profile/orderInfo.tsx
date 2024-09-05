const Orders = () => {
  const orders = [
    { id: "0001", date: "2023-06-01", status: "Shipped", total: 99.99 },
    { id: "0002", date: "2023-05-15", status: "Delivered", total: 149.99 },
    { id: "0003", date: "2023-04-30", status: "Processing", total: 79.99 },
  ];

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">My Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg border p-4">
            <h3 className="font-medium">Order #{order.id}</h3>
            <p className="text-sm text-gray-600">Placed on: {order.date}</p>
            <p className="text-sm">Status: {order.status}</p>
            <p className="text-sm">Total: ${order.total.toFixed(2)}</p>
            <button className="mt-2 rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100 focus:outline-none focus:ring-2">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
