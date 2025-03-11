// src/util/productHelper.js
export const productColumns = (handleDeleteProduct, handleEditProduct) => [
  {
    name: <h1 className="font-semibold text-lg text-gray-700 text-center">ID</h1>,
    selector: row => <span className="text-[16px]">{row.product_id}</span>,
    sortable: true,
  },
  {
    name: <h1 className="font-semibold text-lg text-gray-700 text-center">NAME</h1>,
    selector: row => <span className="text-[16px]">{row.product_name}</span>,
    sortable: true,
  },
  {
    name: <h1 className="font-semibold text-lg text-gray-700 text-center">IMAGE</h1>,
    cell: row => (
      <img
        src={`http://localhost:8080/public${row.image_path}`}
        alt={row.product_name}
        className="w-20 h-20 object-cover mx-auto rounded-lg shadow-md"
      />
    ),
    ignoreRowClick: true,
  },
  {
    name: <h1 className="font-semibold text-lg text-gray-700 text-center">PRICE</h1>,
    selector: row => <span className="text-[16px]">{row.output_price}$</span>,
    sortable: true,
  },
  {
    name: <h1 className="font-semibold text-lg text-gray-700 text-center">Quantity</h1>,
    selector: row => <span className="text-[16px]">Kho còn: {row.quantity}</span>,
    sortable: true,
  },
  {
    name: <h1 className="font-semibold text-lg text-gray-700 text-center">ACTIONS</h1>,
    cell: row => (
      <div className="flex justify-center gap-2">
        <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-all duration-200"
          onClick={() => handleEditProduct(row)}
        >Edit</button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all duration-200"
          onClick={() => handleDeleteProduct(row.product_id)}>
          Delete
        </button>
      </div>
    ),
    ignoreRowClick: true
  },
];
