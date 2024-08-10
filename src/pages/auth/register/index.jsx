import { useStateBasketContext } from "@/context/StateBasketContext";
import axios from "axios";
import { useRouter } from "next/router";

const RegisterPage = () => {
  const { push } = useRouter();
  const { password, setPassword, errorMessage, setErrorMessage} =
    useStateBasketContext();

  const handleRegister = async (event) => {
  event.preventDefault();
  const form = event.target;
  if (password === form.password.value) {
    const data = {
      nik: form.nik.value,
      password: form.password.value,
    };
    try {
      const result = await axios.post("/api/auth/register", data);
      if (result.status === 200) {
        form.reset();
        push("/auth/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("NIK Tidak Terdaftar!");
    }
  } else {
    setErrorMessage("Password Konfirmasi Salah!");
  }
};


  return (
    <div className="container min-w-full min-h-screen">
      <div className="container flex flex-col w-1/2 mx-auto mt-16 px-20">
        <h1 className="text-2xl font-bold text-center">REGISTER</h1>
        <div className="divider"></div>
        <form onSubmit={handleRegister}>
          {errorMessage !== "" ? (
            <p className="text-error text-center font-semibold underline underline-offset-4">
              {errorMessage}
            </p>
          ) : (
            ""
          )}
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
            <div className="flex items-center justify-between">
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Password Baru
                </span>
              </label>
              <label className="label">
                <span className="label-text font-bold text-lg">*</span>
              </label>
            </div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <div className="flex items-center justify-between">
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Konfirmasi Password
                </span>
              </label>
              <label className="label">
                <span className="label-text font-bold text-lg">*</span>
              </label>
            </div>
            <input
              type="password"
              name="password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="divider"></div>
          <button type="submit" className="btn btn-primary w-full">
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
};
export default RegisterPage;
