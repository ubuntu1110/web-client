// src/utils/api.ts
export const fetchUsers = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users`);
    const data = await response.json();
    return data;
};
