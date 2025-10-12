'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import SummaryCard from '@/components/SummaryCard';
import ExpenseChart from '@/components/ExpenseChart';
import RecentTransactions from '@/components/RecentTransactions';
import DebtOverview from '@/components/DebtOverview';
import {
  fetchDetailedSummary,
  fetchDetailedReport,
  fetchRecentTransactions,
  fetchOpenDebts,
} from '@/lib/data';

export default function Dashboard({ onLogout }) {
  const [summary, setSummary] = useState(null);
  const [report, setReport] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      const [summaryData, reportData, transactionsData, debtsData] =
          await Promise.all([
            fetchDetailedSummary(),
            fetchDetailedReport(startOfMonth, today),
            fetchRecentTransactions(),
            fetchOpenDebts(),
          ]);

      setSummary(summaryData);
      setReport(reportData);
      setTransactions(transactionsData);
      setDebts(debtsData);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError(
          'Could not connect to the backend. Please ensure the Flask service is running and refresh.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getSummaryValue = (data, currency) => {
    if (!data) return 0;
    // Note: Backend format is different for summary vs. debts
    if (data.total) return data.total; // For single debt item
    const item = data.find((d) => d['_id'] === currency);
    return item ? item.total : 0;
  };

  const totalOwedToYouUSD = getSummaryValue(summary?.debts_owed_to_you, 'USD');
  const totalOwedByYouUSD = getSummaryValue(summary?.debts_owed_by_you, 'USD');
  const totalOwedToYouKHR = getSummaryValue(summary?.debts_owed_to_you, 'KHR');
  const totalOwedByYouKHR = getSummaryValue(summary?.debts_owed_by_you, 'KHR');


  return (
      <main className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <Header onRefresh={fetchData} onLogout={onLogout} />

          {loading && <p className="text-center mt-8 animate-pulse">Loading financial data...</p>}
          {error && <p className="text-center text-red-400 mt-8">{error}</p>}

          {!loading && !error && summary && (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  <SummaryCard
                      title="USD Balance"
                      value={summary.balances?.USD}
                      currency="USD"
                  />
                  <SummaryCard
                      title="KHR Balance"
                      value={summary.balances?.KHR}
                      currency="KHR"
                  />
                  <SummaryCard
                      title="Owed to You"
                      value={totalOwedToYouUSD}
                      currency="USD"
                      secondaryValue={totalOwedToYouKHR}
                      secondaryCurrency="KHR"
                      className="text-green-400"
                  />
                  <SummaryCard
                      title="You Owe"
                      value={totalOwedByYouUSD}
                      currency="USD"
                      secondaryValue={totalOwedByYouKHR}
                      secondaryCurrency="KHR"
                      className="text-red-400"
                  />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                  {/* Left Column: Chart & Debts */}
                  <div className="lg:col-span-1 flex flex-col gap-6">
                    <ExpenseChart data={report?.expenseBreakdown} />
                    <DebtOverview debts={debts} />
                  </div>

                  {/* Right Column: Transactions */}
                  <div className="lg:col-span-2">
                    <RecentTransactions transactions={transactions} />
                  </div>
                </div>
              </>
          )}
        </div>
      </main>
  );
}