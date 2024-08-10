import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useStateBasketContext } from "@/context/StateBasketContext";

const LoginPage = () => {
  const { push } = useRouter();
  const { data: session } = useSession();
  const {isWrongPasswrod, setIsWrongPassword, isBtnLoading, setIsBtnLoading} = useStateBasketContext()

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    try {
      setIsBtnLoading(true);
      const response = await signIn("credentials", {
        redirect: false,
        nik: form.nik.value,
        password: form.password.value,
      });
      if (!response?.error) {
        push("/dashboard");
        form.reset();
        setIsBtnLoading(false)
        } else {
          setIsWrongPassword(true)
          setIsBtnLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container flex justify-center min-w-full min-h-screen">
      <div className="container flex flex-col w-1/3 mt-16">
        <h1 className="text-2xl font-bold text-center">LOGIN</h1>
        <div className="divider"></div>
        {isWrongPasswrod ? (
          <p className="text-center text-error mb-3">
            NIK atau Password salah!
          </p>
        ) : (
          ""
        )}
        <form onSubmit={handleLogin}>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-lg">NIK</span>
            </label>
            <input
              type="number"
              name="nik"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-lg">Password</span>
            </label>
            <input
              type="password"
              name="password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="divider"></div>
          <div className="flex justify-end">
            {!session ? (
              <button type="submit" className="btn btn-primary w-full">
                {isBtnLoading ? (
                  <div className="flex items-center">
                    <span className="loading loading-spinner me-2"></span>
                    Loading...
                  </div>
                ) : (
                  "LOGIN"
                )}
              </button>
            ) : (
              <Link
                href={"/dashboard"}
                className="btn
                bg-gray-300
                w-full">
                Login
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size="lg"
                  className="mt-0.5"
                />
              </Link>
            )}
          </div>
        </form>
        <p className="mt-3">
        Don{"'"}t have an account? <Link href={"/auth/register"} className="link text-primary">
            Sign Up Now
          </Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;