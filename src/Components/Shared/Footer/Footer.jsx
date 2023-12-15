import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-48">
      <footer className="bg-[#0766AD] rounded-lg shadow m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://flowbite.com/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <Link to="/">
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                  Learn Craft
                </span>
              </Link>

              {/* <img src={logo} className="w-48" alt="" /> */}
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-[#F4F27E] sm:mb-0 ">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-white sm:text-center ">
            © 2023{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Learn Craft™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
