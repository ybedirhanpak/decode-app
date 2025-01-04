type GenerateCodeResponse = {
    success: boolean;
    data: {
        code_react: string;
        code_css: string;
    };
};

const BASE_API_URL = "http://localhost:7001/api";

export async function generateCode(input: string): Promise<GenerateCodeResponse> {
    const url = `${BASE_API_URL}/generate`;

    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            input,
        }),
    })
        .then(response => response.json())
        .catch(error => {
            console.error("Failed to generate code", error);
            return { success: false, data: { code_react: "", code_css: "" } };
        });
}
