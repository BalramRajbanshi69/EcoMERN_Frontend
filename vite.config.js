// import { defineConfig } from "vite";
// import path from "path";
import tailwindcss from "@tailwindcss/vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [tailwindcss(), react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });




import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [tailwindcss(),react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});