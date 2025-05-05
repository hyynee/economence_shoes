export const productColumns = (handleDeleteProduct, handleEditProduct) => [
  {
    name: 'ID',
    selector: row => row.product_id,
    sortable: true,
    width: '100px',
    cell: row => (
      <span className="id">
        #{row.product_id}
      </span>
    ),
  },
  {
    name: 'PRODUCT',
    selector: row => row.product_name,
    sortable: true,
    cell: row => (
      <div className="product-cell">
        <div className="image-container">
          <img
            src={`http://localhost:8080/public${row.image_path}`}
            alt={row.product_name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/40';
            }}
          />
        </div>
        <div>
          <div className="product-name">
            {row.product_name}
          </div>
          <div className="category">
            {row?.category_id || 'No category'}
          </div>
        </div>
      </div>
    ),
  },
  {
    name: 'PRICE',
    selector: row => row.output_price,
    sortable: true,
    width: '120px',
    cell: row => (
      <span className="price">
        ${row.output_price}
      </span>
    ),
  },
  {
    name: 'STOCK',
    selector: row => row.quantity,
    sortable: true,
    width: '120px',
    cell: row => (
      <span className={`stock ${row.quantity > 10 ? 'green' : row.quantity > 0 ? 'yellow' : 'red'}`}>
        {row.quantity} in stock
      </span>
    ),
  },
  {
    name: 'ACTIONS',
    width: '180px',
    cell: row => (
      <div className="actions">
        <button
          onClick={() => handleEditProduct(row)}
          className="edit"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteProduct(row.product_id)}
          className="delete"
        >
          Delete
        </button>
      </div>
    ),
    ignoreRowClick: true,
  },
];