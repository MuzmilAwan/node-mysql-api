// app.js file

import app from "#server";
import ENV from "#env";
import { connectDB } from "#connection";
import { userTable } from "#models";
import { cleanUp }  from "#utils";
import "#syncRoutes";


const PORT = ENV.PORT;

const start = async () => {

    try {
        await connectDB();
        await userTable();
        cleanUp();
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Startup failed:", err);
        process.exit(1);
    }

}

start();