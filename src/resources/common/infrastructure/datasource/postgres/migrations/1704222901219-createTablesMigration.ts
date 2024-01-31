import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTablesMigration1704222901219 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // USERS TABLE
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users(
                id UUID NOT NULL,
                nick VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(50) UNIQUE NOT NULL,
                passwordHash VARCHAR(100) NOT NULL,
                description VARCHAR(255),
                photo VARCHAR(255),

                CONSTRAINT PK_USER_ID PRIMARY KEY(id)
            );
        `);

        
        // POST TABLE
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS posts(
                id UUID NOT NULL,
                userId UUID NOT NULL,
                numberLikes INTEGER DEFAULT 0,
                description VARCHAR(255),
                createdAt   TIMESTAMP NOT NULL, 
                modifiedAt  TIMESTAMP NOT NULL,
                
                CONSTRAINT PK_POST_ID PRIMARY KEY(id),
                CONSTRAINT FK_POST_USER FOREIGN KEY(userId) REFERENCES users(id)
            );
        `);

             
        
        // POST IMAGES TABLE
        await queryRunner.query(`
                CREATE SEQUENCE table_post_images_id_seq;
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS post_images(
                id SERIAL NOT NULL,
                postId UUID NOT NULL,
                url VARCHAR(100) NOT NULL,

                CONSTRAINT PK_POST_IMAGES_ID PRIMARY KEY(id),
                CONSTRAINT FK_POST_IMAGE FOREIGN KEY(postId) REFERENCES posts(id)
            );
        `);

        // TAG TABLE
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS tags(
                id SERIAL NOT NULL,
                name VARCHAR(50) NOT NULL,
                numberPosts INTEGER DEFAULT 0,

                CONSTRAINT PK_TAG_ID PRIMARY KEY(id)
            );
        `);

        //POST TAGS TABLE
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS post_tags(
                id SERIAL NOT NULL,
                postId UUID NOT NULL,
                tag INTEGER NOT NULL,

                CONSTRAINT PK_POST_TAGS_ID PRIMARY KEY(id),
                CONSTRAINT FK_POST_TAG FOREIGN KEY(postId) REFERENCES posts(id)
            );
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.query(`DROP TABLE IF EXISTS post_images`);
            await queryRunner.query(`DROP TABLE IF EXISTS post_tags`);
            await queryRunner.query(`DROP TABLE IF EXISTS tags`);
            await queryRunner.query(`DROP TABLE IF EXISTS posts`);
            await queryRunner.query(`DROP TABLE IF EXISTS users`);
    }

}
