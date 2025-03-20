// auth.js
import { PublicClientApplication } from '@azure/msal-browser';

// MSAL configuration object
const msalConfig = {
    auth: {
        clientId: "8794ae66-81d9-4b1d-8dd5-b146c546dea2", // Replace with your Application (client) ID from Entra ID
        authority: "https://login.microsoftonline.com/common", // This supports multiple account types
        redirectUri: window.location.origin // Redirect back to the current site
    },
    cache: {
        cacheLocation: "sessionStorage", // Options: "localStorage" or "sessionStorage"
        storeAuthStateInCookie: false // Set to true if you're having issues on IE11 or Edge
    }
};

// Create an instance of PublicClientApplication
const msalInstance = new PublicClientApplication(msalConfig);

// Define a login request
const loginRequest = {
    scopes: ["User.Read"] // Basic permission to read user profile
};

// A simple function to trigger login using a popup
export function login() {
    msalInstance.loginPopup(loginRequest)
        .then(loginResponse => {
            console.log("Login successful!", loginResponse);
            // You can now get tokens or update the UI as needed.
            // For example, you could display the user's name:
             document.getElementById("user-info").innerText = `Hello, ${loginResponse.account.name}`;
        })
        .catch(error => {
            console.error("Login failed:", error);
        });
}

// Optionally, export the instance if needed elsewhere
export { msalInstance };