const UserDialogContent = ({ info }: any) => {
  return (
    <div className="m-10 max-w-sm">
      <div className="rounded-lg border bg-white px-4 pb-10 pt-8 shadow-lg">
        <div className="relative mx-auto w-36 rounded-full">
          <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
          <img
            className="mx-auto h-auto w-full rounded-full"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
          {info.name}
        </h1>
        <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">
          {info.email}
        </h3>
        <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">
          {info.phone}
        </p>
        <ul className="mt-3 divide-y rounded bg-gray-100 px-3 py-2 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
          <li className="flex items-center py-3 text-sm">
            <span>Status</span>
            <span className="ml-auto">
              <span className="rounded-full bg-green-200 px-2 py-1 text-xs font-medium text-green-700">
                {info.isEmailVerified ? "Verified" : "Not Verified"}
              </span>
            </span>
          </li>
          <li className="flex items-center py-3 text-sm">
            <span>Joined On</span>
            <span className="ml-auto">
              {new Date(info.createdAt).toDateString()}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDialogContent;
