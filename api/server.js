const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "secret",
    port: 5432,
});

const express = require("express");
const app = express();
app.use(express.json());

const getTableContent = async (tableName) => {
    const { rows } = await pool.query(`SELECT * FROM public.${tableName}`);
    return rows;
};

app.get("/doctors", async (req, res) => {
    try {
        const doctors = await getTableContent("doctor");
        res.json(doctors);
    } catch (error) {
        console.error(error);
    }
});

app.get("/patients", async (req, res) => {
    try {
        const patients = await getTableContent("patient");
        res.json(patients);
    } catch (error) {
        console.error(error);
    }
});

app.get("/rooms", async (req, res) => {
    try {
        const rooms = await getTableContent("room");
        res.json(rooms);
    } catch (error) {
        console.error(error);
    }
});

app.get("/visits", async (req, res) => {
    try {
        const visits = await getTableContent("visit");
        res.json(visits);
    } catch (error) {
        console.error(error);
    }
});

app.get("/services", async (req, res) => {
    try {
        const services = await getTableContent("service");
        res.json(services);
    } catch (error) {
        console.error(error);
    }
});

app.get("/service-lists", async (req, res) => {
    try {
        const servicesLists = await getTableContent("service_list");
        res.json(servicesLists);
    } catch (error) {
        console.error(error);
    }
});

app.get("/doctor-by-name", async (req, res) => {
    const doctor_name = req.query.name;
    try {
        const { rows } = await pool.query(
            `SELECT * FROM public.doctor WHERE full_name = '${doctor_name}'`
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
    }
});

app.get("/patient-by-name", async (req, res) => {
    const patient_name = req.query.name;
    try {
        const { rows } = await pool.query(
            `SELECT * FROM public.patient WHERE full_name = '${patient_name}'`
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
    }
});

app.get("/room-by-number", async (req, res) => {
    const room_number = Number(req.query.number);
    try {
        const { rows } = await pool.query(
            `SELECT * FROM public.room WHERE number = ${room_number}`
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
    }
});

app.get("/room-by-number", async (req, res) => {
    const room_number = Number(req.query.number);
    try {
        const { rows } = await pool.query(
            `SELECT * FROM public.room WHERE number = ${room_number}`
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
    }
});

app.get("/visit-by-date", async (req, res) => {
    const visit_date = req.query.date;
    try {
        const { rows } = await pool.query(
            `SELECT * FROM public.visit WHERE visit_date = '${visit_date}'`
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
    }
});

app.get("/service-list-by-visit", async (req, res) => {
    const visit_date = req.query.date;
    const patient_passport = req.query.passport;
    try {
        const { rows } = await pool.query(
            `SELECT * FROM public.service_list WHERE visit_date = '${visit_date}' AND patient_passport = '${patient_passport}'`
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
    }
});

app.post("/add-doctor", async (req, res) => {
    const {
        full_name,
        sex,
        profile,
        category,
        phone_number,
        experience_years,
    } = req.body;
    try {
        await pool.query(
            `INSERT INTO public.doctor values ('${full_name}', '${sex}', '${profile}', '${category}', '${phone_number}', '${experience_years}')`
        );
        res.send("Doctor created");
    } catch (error) {
        console.error(error);
    }
});

app.post("/add-patient", async (req, res) => {
    const { full_name, birthday, sex, phone_number, passport, snils } =
        req.body;
    try {
        await pool.query(
            `INSERT INTO public.patient values ('${full_name}', '${birthday}', '${sex}', '${phone_number}', '${passport}', '${snils}')`
        );
        res.send("Patient created");
    } catch (error) {
        console.error(error);
    }
});

app.post("/add-room", async (req, res) => {
    const { number, floor_number, features } = req.body;
    try {
        await pool.query(
            `INSERT INTO public.room values ('${number}', '${floor_number}', '${features}')`
        );
        res.send("Room created");
    } catch (error) {
        console.error(error);
    }
});

app.post("/add-service", async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO public.service values ('${name}', '${description}', ${price})`
        );
        console.log(result);
        res.send("Service created");
    } catch (error) {
        console.error(error);
    }
});

app.post("/add-visit", async (req, res) => {
    const {
        visit_date,
        duration_in_minutes,
        patient_passport,
        doctor_name,
        room_number,
    } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO public.visit values ('${visit_date}', ${duration_in_minutes}, '${patient_passport}', '${doctor_name}', ${room_number})`
        );
        console.log(result);
        res.send("Visit created");
    } catch (error) {
        console.error(error);
    }
});

app.post("/add-service-list", async (req, res) => {
    const {
        visit_date,
        patient_passport,
        doctor_name,
        room_number,
        service_name,
    } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO public.service_list values ('${visit_date}', '${patient_passport}', '${doctor_name}', ${room_number}, '${service_name}' )`
        );
        console.log(result);
        res.send("Service_list created");
    } catch (error) {
        console.error(error);
    }
});

app.delete("/visit", async (req, res) => {
    const { visit_date, passport } = req.query;
    try {
        const result = await pool.query(
            `DELETE FROM public.visit WHERE visit_date = '${visit_date}' AND patient_passport = '${passport}'`
        );
        res.send("Visit deleted");
        console.log(result);
    } catch (error) {
        console.error(error);
    }
});

app.delete("/patient", async (req, res) => {
    const { passport } = req.query;
    try {
        const result = await pool.query(
            `DELETE FROM public.patient WHERE passport = '${passport}'`
        );
        console.log(result);
        res.send("Patient deleted");
    } catch (error) {
        console.error(error);
    }
});

app.patch("/doctor", async (req, res) => {
    const full_name = req.query.name;
    const { profile, category, phone_number, experience_years } = req.body;

    try {
        const result = await pool.query(
            `UPDATE public.doctor SET
            ${profile ? `profile = '${profile}'` : ""}
            ${category ? `category = '${category}'` : ""}
            ${phone_number ? `phone_number = '${phone_number}'` : ""}
            ${experience_years ? `experience_years = ${experience_years}` : ""}
            WHERE full_name = '${full_name}'`
        );
        console.log(result);
        res.send("Doctor updated");
    } catch (error) {
        console.error(error);
    }
});

app.patch("/patient", async (req, res) => {
    const { passport } = req.query;
    const { full_name, birthday, phone_number, snils } = req.body;

    try {
        const result = await pool.query(
            `UPDATE public.patient SET
            ${full_name ? `full_name = '${full_name}'` : ""}
            ${birthday ? `birthday = '${birthday}'` : ""}
            ${phone_number ? `phone_number = ${phone_number}` : ""}
            ${snils ? `snils = ${snils}` : ""}
            WHERE passport = '${passport}'`
        );
        console.log(result);
        res.send("Patient updated");
    } catch (error) {
        console.error(error);
    }
});

app.patch("/room", async (req, res) => {
    const { number } = req.query;
    const { floor_number, features } = req.body;

    try {
        const result = await pool.query(
            `UPDATE public.room SET
            ${floor_number ? `floor_number = '${floor_number}'` : ""}
            ${features ? `features = '${features}'` : ""}
            WHERE number = ${number}`
        );
        console.log(result);
        res.send("Room updated");
    } catch (error) {
        console.error(error);
    }
});

app.patch("/service", async (req, res) => {
    const { name } = req.query;
    const { description, price } = req.body;

    try {
        const result = await pool.query(
            `UPDATE public.service SET
            ${description ? `description = '${description}'` : ""}
            ${price ? `price = '${price}'` : ""}
            WHERE name = '${name}'`
        );
        console.log(result);
        res.send("Service updated");
    } catch (error) {
        console.error(error);
    }
});

app.patch("/visit", async (req, res) => {
    const visit_date = req.query.visit_date;
    const patient_passport = req.query.passport;
    const { duration_in_minutes } = req.body;

    try {
        const result = await pool.query(
            `UPDATE public.visit SET
            ${
                duration_in_minutes
                    ? `duration_in_minutes = ${duration_in_minutes}`
                    : ""
            }
            WHERE visit_date = '${visit_date}' AND patient_passport = '${patient_passport}'`
        );
        console.log(result);
        res.send("Visit updated");
    } catch (error) {
        console.error(error);
    }
});

app.listen(3000);
