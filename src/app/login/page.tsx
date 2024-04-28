import * as jose from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const login = async (formData: FormData) => {
    "use server";

    if (!formData.has("email") || !formData.has("password")) {
      return;
    }

    const email = formData.get("email");
    const password = formData.get("password");

    if (email !== "admin" && password !== "admin") {
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
    <form action={login}>
      <input type="text" name="email" placeholder="email" />
      <input type="password" name="password" placeholder="password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
