const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

const API_KEY = "YOUR_API_KEY"
const API_BASE = "YOUR_API_URL";

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/chat", async (req, res) => {
    try {
        const messages = req.body.messages;
        const response = await axios.post(
            `${API_BASE}/chat/completions`,
            {
                model: "gpt-4o-mini",
                messages: messages,
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );
        res.json(response.data.choices[0].message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
