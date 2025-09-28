import { defineConfig } from "vite";
import fs from "fs";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const dataGeneratorPlugin = async function () {
  const { createVoicemailDump } = await import("./data_generator.mjs");
  const data = createVoicemailDump(1000);
  fs.writeFileSync(
    "./public/voicemail_data.json",
    JSON.stringify(data, null, 2)
  );
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    {
      name: "generate-voicemails",
      buildStart: dataGeneratorPlugin,
    },
  ],
});
