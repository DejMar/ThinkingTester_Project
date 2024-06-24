import { request } from '@playwright/test';

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

export async function addUserThroughAPI(firstName, lastName, birthDate, email, phone, street1, street2, city, stateProvince, zipCode, country) {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjViNDYxY2ExZjk4MTAwMTNlZmQ1ZDMiLCJpYXQiOjE3MTcyNTc3NTZ9.lecYBwOycLlt8Ll7v5bCyANtTcw1ev1YHcfQE59PzLY",
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
           "firstName": firstName,
           "lastName": lastName,
           "birthdate": birthDate,
           "email": email,
           "phone": phone,
           "street1": street1,
           "street2": street2,
           "city": city,
           "stateProvince": stateProvince,
           "postalCode": zipCode,
           "country": country
       });
       
       let response = await fetch("https://thinking-tester-contact-list.herokuapp.com/contacts", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.text();
       console.log(data);
       
}


