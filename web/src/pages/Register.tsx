import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="fixed inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-800 dark:to-gray-900 transition-colors duration-200 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <RegisterForm />
      </div>
    </main>
  );
}
