export default (name: string, owneraddress: string): string => {
    return `
        {
            getNameInfo(name: "${name}") {
                name
                punycoded
                tags
                priceusd
                purchasedbyaddress
                disabled 
            }
        }
    `;
}
