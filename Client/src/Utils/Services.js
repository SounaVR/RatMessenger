export const baseUrl = "http://localhost:5000";

export const postRequest = async (url, body, token) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body
    });

    const data = await response.json();

    if (!response.ok) {
        let errorMessage;

        if (data?.message) {
            errorMessage = data.message;
        } else {
            errorMessage = data;
        }

        return { error: true, errorMessage };
    }

    return data;
};

export const getRequest = async (url, token) => {
    const response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        let errorMessage;

        if (data?.message) {
            errorMessage = data.message;
        } else {
            errorMessage = data;
        }

        return { error: true, errorMessage };
    }

    return data;
};