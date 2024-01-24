import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            "/api/doctors": "http://localhost:3000",
            "/api/visits": "http://localhost:3000",
            "/api/patients": "http://localhost:3000",
            "/api/rooms": "http://localhost:3000",
            "/api/services": "http://localhost:3000",
            "/api/service-lists": "http://localhost:3000",
            "/api/patient": "http://localhost:3000",
            "/api/visit": "http://localhost:3000",
            "/api/room": "http://localhost:3000",
            "/api/service": "http://localhost:3000",
            "/api/doctor": "http://localhost:3000",
            "/api/service-list": "http://localhost:3000",
            "/api/add-patient": "http://localhost:3000",
            "/api/add-visit": "http://localhost:3000",
            "/api/add-room": "http://localhost:3000",
            "/api/add-service": "http://localhost:3000",
            "/api/add-doctor": "http://localhost:3000",
            "/api/add-service-list": "http://localhost:3000",
        },
    },
});
