# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



       <!-- <div className=" grid grid-cols-4 gap-4">
        <div className="w-60 p-2 bg-white rounded-xl transform transition-all hover:translate-y-2 duration-300  shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0">
            <img src={url_image} alt="" className="h-40 object-cover rounded-xl" />
            <div className="p-2">
              <h2 className="font-bold text-lg mb-2">Heading</h2>
              <span className="text-xlfont-semibold">Rs. 18.0000</span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis odio similique natus.</p>
            </div>
            <div className="flex items-center justify-center gap-2 mb-3">
          <button className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-blue-600 text-base"><TiShoppingCart className="text-2xl"/></button>
          <button className="px-3 py-1 rounded-lg bg-blue-300 hover:bg-gray-400 text-base">
            <NavLink to={`/detail/${1}`}>View Detail</NavLink>
          </button>
        </div>
        </div>
      </div>  -->



      {/*
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { AdminAddProdActionApi, AdminDeleteProdActionApi, getAllProdActionApi } from '../../../redux/productReducer/productsReducer';
import AddProductModal from './AddProductModal'; // Nhập modal

const Products = () => {
  const dispatch = useDispatch();
  const { arrProd } = useSelector(state => state.productsReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getProductApi = async () => {
    const action = getAllProdActionApi();
    dispatch(action);
  };

  useEffect(() => {
    getProductApi();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddProduct = (newProduct) => {
    const action = AdminAddProdActionApi(newProduct);
    dispatch(action); 
  };  

  const handleDeleteProduct = async(productId) => {
    await dispatch(AdminDeleteProdActionApi(productId));
    dispatch(getAllProdActionApi());
  };

  const columns = [
    { name: <h1 className="font-bold text-2xl">ID</h1>, selector: row => row.product_id, sortable: true },
    { name: <h1 className="font-bold text-2xl">NAME</h1>, selector: row => row.product_name, sortable: true },
    { 
      name: <h1 className="font-bold text-2xl">IMAGE</h1>, 
      cell: row => (
        <img 
          src={`http://localhost:8080/public${row.image_path}`}
          alt={row.product_name} 
          style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
        />
      ),
      ignoreRowClick: true, 
      allowOverflow: true, 
      button: true,
    },
    { name: <h1 className="font-bold text-2xl">PRICE</h1>, selector: row => row.output_price, sortable: true },
    { name: 'Actions', cell: row => (
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white px-2 py-1 rounded">Sửa</button>
          <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDeleteProduct(row.product_id)}>Xóa</button>
        </div>
      ), ignoreRowClick: true },
  ];

  return (
    <div className='container py-4 xl:py-12'>
      <div className='flex justify-between items-center py-4'>
        <input type="text" placeholder='Search...' className='text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pr-4 pl-10' />
        <button onClick={openModal} className="bg-green-500 text-white px-4 py-2 rounded">Add Product New</button>
      </div>
      <DataTable
        columns={columns}
        data={arrProd}
        selectableRows
        fixedHeader
        pagination
      />
      <AddProductModal isOpen={isModalOpen} onClose={closeModal} onAdd={handleAddProduct} /> 
    </div>
  );
};

export default Products;

*/}