import app from "./server";
import { environment } from "./config/environment";

const PORT = environment.PORT;

try {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error("Failed to start server:", error);
}
