export const formatNumber = (
    n: string | number | undefined, 
    scaling: 1 | 1000 | 1000000, 
    decimals: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    plusSign?: boolean,
    ) => {
    if (n) {
        const result =  new Intl.NumberFormat('en-US', {
            // style: "currency",
            // currency: "EUR",
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        }).format(Number(n) / scaling)

        return plusSign && Number(result) > 0 ? `+${result}` : result;
    } else {
        return "-";
    }
}

export const formatDelta = (n: string | number | undefined, decimals: 0 | 1 | 2) => {
    if (n) {
        return new Intl.NumberFormat('en-US', {
            // style: "currency",
            // currency: "EUR",
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        }).formatToParts(Number(n)).filter(el => el.type === "plusSign")[0]
    } else {
        return "-";
    }
}