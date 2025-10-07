export default function StatCard({ title, value, icon: Icon, isCurrency = false, currency = 'USD' }) {

    const formatValue = () => {
        if (!isCurrency) return value;
        const numberFormat = currency === 'KHR'
            ? new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })
            : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
        return numberFormat.format(value);
    };

    const valueColor = value >= 0 ? 'text-green-400' : 'text-red-400';

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg shadow-md flex items-start">
            <div className="bg-gray-700 p-3 rounded-md mr-4">
                <Icon className="h-6 w-6 text-gray-300" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-400">{title}</p>
                <p className={`text-2xl font-bold ${isCurrency ? valueColor : 'text-white'}`}>
                    {formatValue()}
                </p>
            </div>
        </div>
    );
}