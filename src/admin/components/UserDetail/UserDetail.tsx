import { Link, useParams } from "react-router-dom";
import { userRows } from "../../lib/data";
import { Button, Label, TextInput } from "flowbite-react";
const UserDetail = () => {
  const { id } = useParams();

  const user = userRows.find((user) => user.id === Number(id));

  return (
    <div className="bg-white rounded-lg p-4 max-h-md flex flex-col flex-[4] space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-normal">Edit User</h2>
        <Link to="/newUser">
          <button className="px-4 py-2 bg-green-400 rounded-lg text-white hover:bg-green-500">
            Create
          </button>
        </Link>
      </div>

      <div className="flex flex-1 items-start gap-8">
        <div className="max-w-2xl  sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto  bg-white shadow-xl rounded-lg text-gray-900">
          <div className="rounded-t-lg h-32 overflow-hidden">
            <img
              className="object-cover object-top w-full"
              src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="Mountain"
            />
          </div>
          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
            <img
              className="object-cover object-center h-32"
              src={user?.avatar}
            />
          </div>
          <div className="text-center mt-2">
            <h2 className="font-semibold">{user?.username}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
          <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
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
          <div className="p-4 border-t mx-8 mt-2">
            <button className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">
              Message
            </button>
          </div>
        </div>

        <div className="flex flex-col flex-[4] ">
          <h3 className="text-base font-light mb-4">Edit</h3>
          <form className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="email" />
              </div>
              <TextInput
                id="email1"
                type="email"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Address" />
              </div>
              <TextInput id="email1" type="text" placeholder="Nepal" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Phone Number" />
              </div>
              <TextInput
                id="email1"
                type="number"
                placeholder="+977 9860756619"
                required
              />
            </div>
            <Button type="submit">Update</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
