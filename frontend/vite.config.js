import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        host: true,
        proxy: {
            "/api/doctors": "http://api:3000",
            "/api/visits": "http://api:3000",
            "/api/patients": "http://api:3000",
            "/api/rooms": "http://api:3000",
            "/api/services": "http://api:3000",
            "/api/service-lists": "http://api:3000",
            "/api/patient": "http://api:3000",
            "/api/visit": "http://api:3000",
            "/api/room": "http://api:3000",
            "/api/service": "http://api:3000",
            "/api/doctor": "http://api:3000",
            "/api/service-list": "http://api:3000",
            "/api/add-patient": "http://api:3000",
            "/api/add-visit": "http://api:3000",
            "/api/add-room": "http://api:3000",
            "/api/add-service": "http://api:3000",
            "/api/add-doctor": "http://api:3000",
            "/api/add-service-list": "http://api:3000",
        },
    },
});
