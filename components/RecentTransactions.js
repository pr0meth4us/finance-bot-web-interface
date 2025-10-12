const RecentTransactions = ({ transactions = [] }) => {
    const formatTimestamp = (isoString) => {
        return new Date(isoString).toLocaleDateString('en-CA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatAmount = (amount, currency) => {
        return new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: currency === 'KHR' ? 0 : 2,
            maximumFractionDigits: currency === 'KHR' ? 0 : 2,
        }).format(amount);
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-white mb-4">
                Recent Transactions
            </h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                    <tr>
                        <th scope="col" className="px-4 py-3">Date</th>
                        <th scope="col" className="px-4 py-3">Type</th>
                        <th scope="col" className="px-4 py-3">Category</th>
                        <th scope="col" className="px-4 py-3">Description</th>
                        <th scope="col" className="px-4 py-3 text-right">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((tx) => (
                        <tr key={tx._id} className="border-b border-gray-700 hover:bg-gray-700/50">
                            <td className="px-4 py-3 whitespace-nowrap">{formatTimestamp(tx.timestamp)}</td>
                            <td className="px-4 py-3">
                  <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                          tx.type === 'income'
                              ? 'bg-green-900 text-green-300'
                              : 'bg-red-900 text-red-300'
                      }`}
                  >
                    {tx.type}
                  </span>
                            </td>
                            <td className="px-4 py-3">{tx.categoryId}</td>
                            <td className="px-4 py-3 truncate max-w-xs">{tx.description || '-'}</td>
                            <td className="px-4 py-3 font-mono text-right whitespace-nowrap">
                                {formatAmount(tx.amount, tx.currency)} {tx.currency}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentTransactions;