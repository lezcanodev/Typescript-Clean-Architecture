import "dotenv/config";
process.env.DB_DATABASE = process.env.DB_DATABASE_TEST;
import PostgressDataSource from "@common/infrastructure/datasource/postgres";
import { serverExpress } from "@common/main/factory/express.factory";
import request from 'supertest';
import path from "path";


const {app, server} = serverExpress({
    port: Number(process.env.port) || 3000
});  

describe('Post router',  () => {

    beforeAll(async () => {
        expect(process.env.DB_DATABASE).toBe(process.env.DB_DATABASE_TEST);
        await PostgressDataSource.initialize();

        expect(PostgressDataSource.isInitialized).toBe(true);
    });

    
    afterAll(async () => {
        server.close()
        await PostgressDataSource.destroy();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    it('should create a new post POST', async () => {
        await request(app).post('/auth/signup').send({
            email: 'test@test.com',
            nick: 'test',
            password: '123456'
        });

        const {token} =  (await request(app).post('/auth/signin').send({
            nickOrEmail: 'test@test.com',
            password: '123456'
        })).body;

        const response = await request(app).post('/posts')
        .set('Authorization', `Bearer ${token}`)
        .field('description', 'any_description')
        .attach('postImages', path.join(__dirname, 'testImage.jpg'));

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('postId');
        expect(response.body.postId).toBeTruthy();

    });

});