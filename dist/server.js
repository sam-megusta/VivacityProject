"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
const port = 3001;
//const query = "query.sql";
//Enabled CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
//PostGRE
const pool = new pg_1.Pool({
    user: 'postgres',
    password: 'Sumeetraj#1997',
    host: 'localhost',
    database: 'PersonalInfo_db',
    port: 5432,
});
//Default port for PG -> 5432
app.get('/awesome/applicant', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const info = {
    //     name: 'Samuel Sumeet Raj Kumar',
    //     funFact: 'I can cook a really mean GOAT Biryani xD',
    //     hobbies: ['Playing the Guitar', 'Watching Historical Documentaries', 'Hiking', 'Playing Damsel in Distress'],
    // };
    try {
        const client = yield pool.connect();
        //const result = await client.query('SELECT * FROM Vivacity');
        const query = `
      SELECT "credentials", "details"
      FROM vivacity
      WHERE "credentials" IN ('Name', 'Age', 'University', 'Expertise', 'Course', 'Talents', 'Fun Fact', 'Hobbies')
      ORDER BY CASE "credentials"
        WHEN 'Name' THEN 1
        WHEN 'Age' THEN 2
        WHEN 'University' THEN 3
        WHEN 'Expertise' THEN 4
        WHEN 'Course' THEN 5
        WHEN 'Talents' THEN 6
        WHEN 'Fun Fact' THEN 7
        WHEN 'Hobbies' THEN 8
        ELSE 9
      END;
    `;
        const result = yield client.query(query);
        client.release();
        const applicant = result.rows;
        res.json(applicant);
    }
    catch (error) {
        console.error('Error fetching applicant data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    //res.send(info);
    //res.send('Hello, this is Express + TypeScript');
}));
app.use(express_1.default.json());
//Post request to update db
app.post('/awesome/applicant/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { credentials } = req.body;
        const { details } = credentials;
        const { Age, University, Expertise, Name, Course, Talents, "Fun Fact": FunFact, Hobbies } = details;
        const client = yield pool.connect();
        const query = `
          UPDATE vivacity
          SET "details" = CASE "credentials"
            WHEN 'Age' THEN '${Age}'
            WHEN 'University' THEN '${University}'
            WHEN 'Expertise' THEN '${Expertise}'
            WHEN 'Name' THEN '${Name}'
            WHEN 'Course' THEN '${Course}'
            WHEN 'Talents' THEN '${Talents}'
            WHEN 'Fun Fact' THEN '${FunFact}'
            WHEN 'Hobbies' THEN '${Hobbies}'
            ELSE "details"
          END
          WHERE "credentials" IN ('Age', 'University', 'Expertise', 'Name', 'Course', 'Talents', 'Fun Fact', 'Hobbies');
        `;
        yield client.query(query);
        client.release();
        console.log(req.body);
        res.status(200).json({ message: 'Fields updated successfully' });
        console.log("Fields updated succesfully");
    }
    catch (error) {
        console.error('Error updating fields:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.listen(port, () => {
    console.log(`[Server]: I am running at https://localhost:${port}`);
});
exports.default = app;
