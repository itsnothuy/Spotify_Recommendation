// index.js (just for running the server)
const app = require("./server.js");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));