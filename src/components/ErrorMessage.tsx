export function ErrorMessage({ message }: { message: string }) {
  return (
    <section className="py-16 text-center">
      <div className="max-w-md mx-auto px-4">
        <p className="text-red-600 font-medium">{message}</p>
        <p className="text-gray-600 text-sm mt-2">Please check your connection and try again.</p>
      </div>
    </section>
  );
}
