
export const UseFetch = async (endpoint, method = 'GET', data, token= "") => {

    const apiUrlBase = import.meta.env.VITE_API_URL_BASE;
    const url = apiUrlBase + endpoint //endpoint = "/productos"


    let response;
    try {
        if (method === 'GET') {
            response = await fetch(url)
        }
        if (method === 'POST') {
            response = await fetch(url, {
                method: 'POST',
                body: data,
                headers: {
                    Athorization: token
                }
            })
        }
        let result = await response.json();
        return result;
    } catch (error) { console.error }
}

