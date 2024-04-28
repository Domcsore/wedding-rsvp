import { supabaseClient } from "@/clients/supabase";
import { AdminHeading } from "@/components/admin/Heading";
import * as jose from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const login = async (formData: FormData) => {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
      return;
    }

    const { data, error } = await supabaseClient
      .from("users")
      .select("email, password")
      .eq("email", email.toString());

    if (error) {
      console.log(error);
      return;
    }

    if (
      !data.length ||
      email.toString() !== data[0].email ||
      password !== data[0].password
    ) {
      return;
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({
      "urn:example:claim": true,
      role: "admin",
    })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("2h")
      .sign(secret);

    const cookieStore = cookies();
    cookieStore.set("jwt", jwt);

    redirect("/admin");
  };

  return (
    <>
      <AdminHeading>Sign In</AdminHeading>
      <form className="form-group mx-auto max-w-sm" action={login}>
        <div className="form-field">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input className="input max-w-full" type="text" name="email" />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input className="input max-w-full" type="password" name="password" />
        </div>
        <div className="form-control">
          <button className="btn btn-primary w-full" type="submit">
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
