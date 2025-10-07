import DashboardClient from "@/components/DashboardClient";

export default function Home() {
  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-6">
          Your Finance Dashboard
        </h1>
        <DashboardClient />
      </div>
    </main>
  );
}