export async function getToken(firstName, lastName, username, password) {
    if (!firstName || !lastName || !username || !password) {
        throw new Error('Missing required parameters');
    }

    const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
    };

    const bodyContent = JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "email": username,
        "password": password
    });

    const response = await fetch("https://thinking-tester-contact-list.herokuapp.com/users", {
        method: "POST",
        body: bodyContent,
        headers: headersList
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch token: ${response.status} ${response.statusText}`);
    }

    const responseBody = await response.json();
    const token = responseBody.token;
    if (!token) {
        throw new Error('Token is missing in the response');
    }

    return token;
}