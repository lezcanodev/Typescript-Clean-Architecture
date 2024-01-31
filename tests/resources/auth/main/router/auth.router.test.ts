import "dotenv/config";
process.env.DB_DATABASE = process.env.DB_DATABASE_TEST;
import PostgressDataSource from "@common/infrastructure/datasource/postgres";
import { serverExpress } from "@common/main/factory/express.factory";
import request from 'supertest';


const {app, server} = serverExpress({
    port: Number(process.env.port) || 3000
});  


const userTest = {
    email: 'email@test.com',
    nick: 'nick_test',
    password: '123456'
}

describe('Auth router',  () => {

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
    
    describe('/signup route ', () => {
        it('should create a new user', async () => {
            const response = await request(app).post('/auth/signup').send(userTest);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.id).toBeTruthy();
            expect(response.body.email).toBe(userTest.email);
            expect(response.body.nick).toBe(userTest.nick);
        });
    })
    describe('/signin route ', () => {
        it('should return 200 OK with email', async () => {
            const response = await request(app).post('/auth/signin').send({
                nickOrEmail: userTest.email,
                password: userTest.password
            });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            expect(response.body.token).toBeTruthy();
        });

        it('should return 200 OK with nick', async () => {
            const response = await request(app).post('/auth/signin').send({
                nickOrEmail: userTest.nick,
                password: userTest.password
            });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            expect(response.body.token).toBeTruthy();
        });
    })

});