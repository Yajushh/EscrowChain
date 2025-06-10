import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <main className="bg-slate-50 min-h-screen w-full flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
