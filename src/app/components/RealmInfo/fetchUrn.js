export const fetchData = async (linkItemUrn) => {
    const firstEndpoint = `https://ep.atomicalswallet.com/proxy/blockchain.atomicals.get_state?params=["${linkItemUrn}"]&pretty`;
  
    try {
      // Fetch data from the first endpoint
      const firstResponse = await fetch(firstEndpoint);
      const firstResponseJson = await firstResponse.json();
      console.log("First Endpoint Response:", firstResponseJson);
  
      if (firstResponseJson.result) {
        // Extract the result from the first response
        const secondEndpoint = `https://ep.atomicalswallet.com/proxy/blockchain.atomicals.get_state?params=["${firstResponseJson.result}"]&pretty`;
  
        // Fetch data from the second endpoint
        const secondResponse = await fetch(secondEndpoint);
        const secondResponseJson = await secondResponse.json();
        console.log("Second Endpoint Response:", secondResponseJson);
  
        if (secondResponseJson.result && secondResponseJson.result.data && secondResponseJson.result.data.image) {
          // Extract and return the image data
          return secondResponseJson.result.data.image;
        } else {
          console.error("Error: Unable to retrieve image data from the second endpoint");
        }
      } else {
        console.error("Error: Unable to retrieve result from the first endpoint");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  
    return null; // Return null or handle the case where image data is not available
  };
  