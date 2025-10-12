const DebtOverview = ({ debts = [] }) => {
    const formatAmount = (amount, currency) => {
        return new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: currency === 'KHR' ? 0 : 2,
            maximumFractionDigits: currency === 'KHR' ? 0 : 2,
        }).format(amount);
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-white mb-4">Debt Overview</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                    <tr>
                        <th scope="col" className="px-4 py-3">Person</th>
                        <th scope="col" className="px-4 py-3">Status</th>
                        <th scope="col" className="px-4 py-3 text-right">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {debts.map((debt, index) => (
                        <tr key={`${debt.person}-${debt.currency}-${index}`} className="border-b border-gray-700 hover:bg-gray-700/50">
                            <td className="px-4 py-3 font-medium whitespace-nowrap">{debt.person}</td>
                            <td className="px-4 py-3">
                  <span className={`font-medium ${debt.type === 'lent' ? 'text-green-400' : 'text-red-400'}`}>
                    {debt.type === 'lent' ? 'Owes You' : 'You Owe'}
                  </span>
                            </td>
                            <td className="px-4 py-3 font-mono text-right whitespace-nowrap">
                                {formatAmount(debt.totalAmount, debt.currency)} {debt.currency}
                            </td>
                        </tr>
                    ))}
                    {debts.length === 0 && (
                        <tr>
                            <td colSpan="3" className="text-center py-4 text-gray-500">No open debts.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DebtOverview;