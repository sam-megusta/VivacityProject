import request from 'supertest';
import server from './server';
const app = require('./server').default; 

describe('GET /awesome/applicant', () => {
    it('should return the applicant information', async () => {
      const response = await request(server).get('/awesome/applicant');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { credentials: 'Name', details: 'Samuel' },
        { credentials: 'Age', details: '25' },
        { credentials: 'University', details: 'UT Dallas' },
        { credentials: 'Expertise', details: 'FullStack Development, Data Science' },
        { credentials: 'Course', details: 'Master of Science in Information Technology and Management' },
        { credentials: 'Talents', details: 'Playing the Guitar, Singing, Cooking, Doordashing' },
        { credentials: 'Fun Fact', details: 'Got a ticket for driving too slow' },
        { credentials: 'Hobbies', details: 'Watching Murder Mysteries, History Geek, Playing Damsel in Distress, Hitting the Gym' }
      ]);
    });
  });

