/**
 * Fetches the employee array from the external JSONPlaceholder API.
 * @returns {Promise<Array>} A promise that resolves to the array of user data.
 */
export async function getEmployees() {
    const apiEndpoint = "https://jsonplaceholder.typicode.com/users";

    try {
        const response = await fetch(apiEndpoint);
        
        // Check if the network response was successful (status 200-299)
        if (!response.ok) {
            throw new Error(`Network response error: ${response.status} ${response.statusText}`);
        }
        
        // Parse the incoming JSON stream into a JavaScript Array
        const employeesData = await response.json();
        return employeesData;
        
    } catch (error) {
        console.error("Failed to fetch employees from remote API:", error.message);
        // Return an empty array as a fallback to prevent UI crashes
        return [];
    }
}
