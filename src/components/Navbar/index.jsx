import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const isAuthPage = () => {
    return router.pathname === "/auth/login";
  };
  const isRootPage = () => {
    return router.pathname === "/";
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <Link href={"/"} className="text-xl ms-2 font-bold">
        CV Anugrah Ikhsan Keluarga
        </Link>
      </div>
      <div className="navbar-end">
        {!isAuthPage() && !isRootPage() && (
          <div className="me-4">
            {session ? (
              <button
                onClick={handleSignOut}
                className="btn btn-sm btn-warning text-white hover:bg-yellow-400 hover:border-yellow-400">
                Sign Out
              </button>
            ) : (
              <Link
                href={"/auth/login"}
                className="btn btn-sm bg-emerald-600 text-white hover:bg-emerald-600">
                Sign In
              </Link>
            )}
          </div>
        )}
        {session
          ? isAuthPage() && (
              <button
                onClick={handleSignOut}
                className="btn btn-sm btn-warning text-white hover:bg-yellow-400 hover:border-yellow-400">
                Sign Out
              </button>
            )
          : ""}
      </div>
    </div>
  );
};
export default Navbar;
