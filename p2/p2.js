document.getElementById('converter-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const sourceCurrency = document.getElementById('source-currency').value;
    const targetCurrency = document.getElementById('target-currency').value;
    const amount = document.getElementById('amount').value;

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${sourceCurrency}`);
        const data = await response.json();

        const exchangeRate = data.rates[targetCurrency];
        const convertedAmount = amount * exchangeRate;

        document.getElementById('result').innerHTML = `
            <p>Converted Amount: ${convertedAmount.toFixed(2)} ${targetCurrency}</p>
            <p>Exchange Rate: 1 ${sourceCurrency} = ${exchangeRate.toFixed(4)} ${targetCurrency}</p>
        `;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        document.getElementById('result').innerHTML = `<p>Error fetching exchange rates. Please try again later.</p>`;
    }
});
