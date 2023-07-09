import express, {Express, Request, Response} from 'express';
import {Pool} from 'pg';

const app: Express = express();
const port = 3000;
//Enabled CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  //PostGRE
  const pool = new Pool({
    user: 'postgres',
    password: 'Sumeetraj#1997',
    host: 'localhost',
    database: 'PersonalInfo_db',
    port: 5432,
  })

  //Default port for PG -> 5432
app.get('/awesome/applicant', async (req: Request, res: Response)=>{
    // const info = {
    //     name: 'Samuel Sumeet Raj Kumar',
    //     funFact: 'I can cook a really mean GOAT Biryani xD',
    //     hobbies: ['Playing the Guitar', 'Watching Historical Documentaries', 'Hiking', 'Playing Damsel in Distress'],
        
    // };
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Vivacity');
        client.release();
    
        const applicant = result.rows;
        res.json(applicant);
      } catch (error) {
        console.error('Error fetching applicant data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    //res.send(info);
    //res.send('Hello, this is Express + TypeScript');
});

app.listen(port, ()=> {
console.log(`[Server]: I am running at https://localhost:${port}`);
});
export default app;