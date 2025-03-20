// auth.js
import { PublicClientApplication } from '@azure/msal-browser';

// MSAL configuration object
const msalConfig = {
    auth: {
        clientId: "8794ae66-81d9-4b1d-8dd5-b146c546dea2", // Your Application (client) ID from Entra ID
        authority: "https://login.microsoftonline.com/737b9d9f-9b7b-4dd2-b7d3-aef85aef5565", // Tenant-specific endpoint
        redirectUri: "https://cs-exam-game-v5.vercel.app" // Must match a redirect URI registered in Entra ID
    },
    cache: {
        cacheLocation: "sessionStorage", // Options: "sessionStorage" or "localStorage"
        storeAuthStateInCookie: false // Set to true for legacy browsers like IE11 or Edge if needed
    }
};

// Create an instance of PublicClientApplication with the config
const msalInstance = new PublicClientApplication(msalConfig);

// Define a login request with the required scopes
const loginRequest = {
    scopes: ["User.Read"] // Permission to read basic profile information
};

// A simple function to trigger login using a popup
export function login() {
    msalInstance.loginPopup(loginRequest)
        .then(loginResponse => {
            console.log("Login successful!", loginResponse);
            // Update the UI with the user's name if the element exists
            const userInfoEl = document.getElementById("user-info");
            if (userInfoEl) {
                userInfoEl.innerText = `Hello, ${loginResponse.account.name}`;
            }
        })
        .catch(error => {
            console.error("Login failed:", error);
        });
}

// Optionally, export the instance if needed elsewhere
export { msalInstance };