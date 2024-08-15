import { Button, CustomBreakcrumb } from "../components";
import { useAuthContext } from "../context/useAuthContext";

const menuItems = [
  { name: "Profile", active: true },
  { name: "My Returns", active: false },
  { name: "History", active: false },
  { name: "My Payment Methods", active: false },
];
const ProfilePage = () => {
  const { logout } = useAuthContext();

 
  return (
    <div className="mx-4 my-12 sm:mx-8 lg:mx-72">
      <CustomBreakcrumb breadcrumbTitle="Profile" />

      <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
        <div className="col-span-2 hidden sm:block">
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-light transition ${
                  item.active
                    ? "border-l-primary text-primary/45"
                    : "border-transparent hover:border-l-primary hover:text-primary/25"
                }`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-8 overflow-hidden sm:px-8 sm:shadow">
          <p className="py-2 text-xl font-semibold">Email Address</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-600">
              Your email address is <strong>john.doe@company.com</strong>
            </p>
            <div className="inline-flex text-sm font-semibold text-primary">
              Welcome, Back!
            </div>
          </div>
          <hr className="mb-8 mt-4" />

          <Button onClick={logout}>Log Out</Button>
        </div>
      </div>
    </div>
  );
};

export { ProfilePage };
