import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <Header />

      <div className="md:container md:mx-auto">
        <main>
            <Outlet />
        </main>
      </div>
    </>
  );
}
