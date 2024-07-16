import { useRouteError } from "react-router-dom";

type Error = {
  statusText?: string;
  message: string;
};

export default function ErrorPage() {
  const error = useRouteError() as Error;
  return (
    <div>
      <h1>if you see this, something went wrong</h1>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}
