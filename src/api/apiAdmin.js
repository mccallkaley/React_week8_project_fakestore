import apiClientWithToken from "./clientTokenAuth";

const endpoint = "/api/admin";

export const getIsAdmin = async (token) =>{
    const response = await apiClientWithToken(token).get(endpoint)
    if (400 <= response.status && response.status < 500){return 400;}
    if (500 <= response.status && response.status < 600){return 500;}
    if (response.ok){return response.data.isAdmin;}
    return
}