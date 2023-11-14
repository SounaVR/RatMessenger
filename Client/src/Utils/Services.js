export const baseUrl = "https://souna.ovh/api";

export const postRequest = async(url, body) => {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
}