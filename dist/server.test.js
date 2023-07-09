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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("./server"));
const app = require('./server').default;
describe('GET /awesome/applicant', () => {
    it('should return the applicant information', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/awesome/applicant');
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
    }));
});
