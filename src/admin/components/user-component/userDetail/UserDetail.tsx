import { useParams } from "react-router-dom";
import { userRows } from "../../../lib/data";
const UserDetail = () => {
  const { id } = useParams();

  const user = userRows.find((user) => user.id === Number(id));

  return (
    <div className="max-h-md flex flex-col space-y-5 rounded-lg bg-white p-4">
      <div className="flex flex-1 items-start gap-8">
        <div className="max-w-2xl rounded-lg bg-white text-gray-900 shadow-xl sm:mx-auto sm:max-w-sm md:mx-auto md:max-w-sm lg:mx-auto lg:max-w-sm xl:mx-auto xl:max-w-sm">
          <div className="h-32 overflow-hidden rounded-t-lg">
            <img
              className="w-full object-cover object-top"
              src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="Mountain"
            />
          </div>
          <div className="relative mx-auto -mt-16 h-32 w-32 overflow-hidden rounded-full border-4 border-white">
            <img
              className="h-32 object-cover object-center"
              src={user?.avatar}
            />
          </div>
          <div className="mt-2 text-center">
            <h2 className="font-semibold">{user?.username}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
          <ul className="mt-2 flex items-center justify-around py-4 text-gray-700">
            <li className="flex flex-col items-center justify-between">
              <svg
                className="w-4 fill-current text-blue-900"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
              </svg>
              <div>{user?.status}</div>
            </li>
            <li className="flex flex-col items-center justify-around">
              <svg
                className="w-4 fill-current text-blue-900"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
              </svg>
              <div>{user?.transaction}</div>
            </li>
          </ul>
          <div className="mx-8 mt-2 border-t p-4">
            <button className="mx-auto block w-1/2 rounded-full bg-gray-900 px-6 py-2 font-semibold text-white hover:shadow-lg">
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
