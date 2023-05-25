import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import { Prisma, PrismaClient } from "@prisma/client";
import { dog } from "@prisma/client";
import cors from '@fastify/cors';
import { request } from 'http';

const prisma = new PrismaClient();
const app = Fastify();
app.register(cors, {
    origin: "*",
});

app.post('/create', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id, name, age, description, vaccinated } = request.body as dog;
    const dog = await prisma.dog.create({
        data: {
            id,
            name,
            age,
            description,
            vaccinated
        },
    });
    reply.send('dog created')
});







const start = async () => {
    try {
        await app.listen({ port: 3333 });
        console.log('Server listening at http://localhost:3333');
    } catch (error) {
        console.error('Something went wrong.');
        process.exit(1);
    }
};

start();