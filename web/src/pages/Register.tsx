import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="bg-slate-50 flex items-center justify-center px-4 min-h-screen w-full">
      <div className="w-full max-w-md ">
        <RegisterForm />
      </div>
    </main>
  );
}
