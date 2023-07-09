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
        const result = yield client.query('SELECT * FROM Vivacity');
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
app.listen(port, () => {
    console.log(`[Server]: I am running at https://localhost:${port}`);
});
exports.default = app;
