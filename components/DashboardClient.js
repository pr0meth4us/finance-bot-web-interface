"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, logout } from "@/lib/auth";
import StatCard from "./StatCard";
import ExpensePieChart from "./ExpensePieChart";
import { DollarSign, Landmark, ArrowLeftRight, PiggyBank } from "lucide-react";

export default function DashboardClient() {
  const router = useRouter();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Protect this page
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }

    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/summary/detailed`);
        if (!res.ok) throw new Error("Failed to fetch summary");
        const data = await res.json();
        setSummary(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (loading) {
    return <p className="text-gray-400">Loading your dashboard...</p>;
  }

  if (!summary) {
    return <p className="text-red-400">Could not load dashboard data.</p>;
  }

  const usdBalance = summary.balances?.USD ?? 0;
  const khrBalance = summary.balances?.KHR ?? 0;
  const owedToYouUSD = summary.debts_owed_to_you?.find(d => d._id === 'USD')?.total ?? 0;
  const owedByYouUSD = summary.debts_owed_by_you?.find(d => d._id === 'USD')?.total ?? 0;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="USD Balance" value={usdBalance} icon={DollarSign} isCurrency={true} currency="USD" />
        <StatCard title="KHR Balance" value={khrBalance} icon={Landmark} isCurrency={true} currency="KHR" />
        <StatCard title="Net Debt (USD)" value={owedToYouUSD - owedByYouUSD} icon={ArrowLeftRight} isCurrency={true} currency="USD" />
        <StatCard title="This Month's Net (USD)" value={summary.periods?.this_month?.net_usd ?? 0} icon={PiggyBank} isCurrency={true} currency="USD" />
      </div>

      <div className="p-6 bg-gray-800/50 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">This Month&#39;s Expenses</h2>
        <div style={{ width: '100%', height: 400 }}>
          <ExpensePieChart data={summary.periods?.this_month ?? {}} />
        </div>
      </div>

      <button onClick={handleLogout} className="mt-8 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold">
        Logout
      </button>
    </>
  );
}