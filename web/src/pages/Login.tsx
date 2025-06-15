import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <main className="fixed inset-0 bg-gray-100  flex items-center justify-center bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md px-4">
        <LoginForm />
      </div>
    </main>
  );
}
