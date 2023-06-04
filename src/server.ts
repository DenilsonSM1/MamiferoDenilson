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
app.get('/dogs', async (request: FastifyRequest, reply: FastifyReply) => {
    const dogs = await prisma.dog.findMany();
    reply.send(dogs)
})

app.get('/dogs/search', async (request: FastifyRequest, reply: FastifyReply) => {
    const { query } = request.query as { query: string };
    try {
        const dogs = await prisma.dog.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                   
                ],
            },
        });
        reply.send(dogs);
    } catch (error) {
        console.error('Something went wrong:', error);
    }
});
app.put('/dogs/:name', async (request: FastifyRequest, reply: FastifyReply) => {
    const { name } = request.params as { name: string };
    const dogData = request.body as Prisma.dogUpdateInput;;

    try {
        const updatedDog = await prisma.dog.updateMany({
            where: { name: name },
            data: dogData, 
        });

        reply.send('dog updated!')
    } catch (error) {
        console.error('Something went wrong:', error);
    }
});
app.delete('/dogs/:name', async (request: FastifyRequest, reply: FastifyReply) => {
    const { name } = request.params as { name: string };

    try {
        const deletedDog = await prisma.dog.deleteMany({
            where: { name: name },
        });

        reply.send('dog deleted.')

    } catch (error) {
        console.error('Something went wrong:', error);
    }
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