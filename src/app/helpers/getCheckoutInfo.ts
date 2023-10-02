export default (name: string, owneraddress: string): string => {
    return `
        {
            getCheckoutInfo(name: "${name}", owneraddress: "${owneraddress}") {
                name
                expectedowneraddress
                pricesats 
                payaddress
                pricegooduntil
                namereserve {
                    name
                    priceusd
                }
            }
        }
    `;
}
