import { Link } from "react-router-dom";
import useCart from "../../../../hooks/useCart";

const MyCart = () => {
  const [carts] = useCart();

  const totalPrice = carts?.reduce((total, item) => {
    const floatPrice = parseFloat(item.price);

    if (!isNaN(floatPrice)) {
      return total + floatPrice;
    } else {
      return total;
    }
  }, 0);

  console.log(carts);

  return (
    <div>
      <h2>My Cart</h2>
      <p>Total Price: {totalPrice}</p>

      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>

                <th scope="col" className="px-6 py-3">
                  Instructor Name
                </th>

                <th scope="col" className="px-6 py-3">
                  Pay Now
                </th>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart) => (
                <tr
                  key={cart._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img className="w-[100px] rounded-md" src={cart?.image} />
                  </th>

                  <td className="px-6 py-4 text-black font-semibold">
                    {cart?.title}
                  </td>

                  <td className="px-6 py-4">
                    <h2>{cart?.price}</h2>
                  </td>
                  <td className="px-6 py-4">
                    <h2>{cart?.instructor_name}</h2>
                  </td>
                  <Link to="/payment">
                    <td>Pay</td>
                  </Link>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
