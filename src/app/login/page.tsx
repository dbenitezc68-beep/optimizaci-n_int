import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mb-2 inline-flex items-center gap-2 font-semibold tracking-wide text-slate-100">
            <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />
            INTEREMPREX
          </div>
          <h1 className="text-xl font-bold text-white">
            Panel de gestión interno
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Procesos, clientes y pagos en un solo sitio.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
