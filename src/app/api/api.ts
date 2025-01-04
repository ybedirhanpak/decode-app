type GenerateCodeResponse = {
    success: boolean;
    data: {
        code_react: string;
        code_css: string;
    };
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function generateCode(input: string): Promise<GenerateCodeResponse> {
    const url = `${API_URL}/generate`;

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
