
import app from "#server";
import ENV from "#env";
import { connectDB } from "#connection";
import { initUserTable } from "#models";

import "#syncRoutes";

const PORT = ENV.PORT;

const start = async () => {

    try {
        await connectDB();
        await initUserTable();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Startup failed:", err);
        process.exit(1);
    }

}

start();