const SummaryCard = ({ title, value = 0, currency, secondaryValue, secondaryCurrency, className = '' }) => {
    const formatValue = (val, curr) => {
        if (typeof val !== 'number') val = 0;
        if (curr === 'KHR') {
            return new Intl.NumberFormat('en-US', {
                style: 'decimal',
                maximumFractionDigits: 0,
            }).format(val);
        }
        return new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(val);
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between">
            <div>
                <h3 className="text-sm font-medium text-gray-400">{title}</h3>
                <p className={`text-2xl font-semibold mt-1 ${className}`}>
                    {formatValue(value, currency)}{' '}
                    <span className="text-lg font-medium text-gray-500">{currency}</span>
                </p>
            </div>
            {secondaryValue > 0 && (
                <p className={`text-md font-semibold mt-1 ${className}`}>
                    {formatValue(secondaryValue, secondaryCurrency)}{' '}
                    <span className="text-sm font-medium text-gray-500">{secondaryCurrency}</span>
                </p>
            )}
        </div>
    );
};

export default SummaryCard;