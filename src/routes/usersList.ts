import { FastifyInstance, FastifyRequest } from "fastify"
import { prisma } from "../lib/prisma";
import { z } from "zod";

interface ParamsProps {
  id: string;
  search: string;
}

export async function userList(app: FastifyInstance) {
  app.post('/create', async (request, reply) => {

    const createUserSchema = z.object({
      firstName: z.string(),
      lastName: z.string(),
      phoneNumber: z.string()
    })

    const { firstName, lastName, phoneNumber } = createUserSchema.parse(request.body)
    
    try {
      const response = await prisma.user.create({
        data: {
          firstName,
          lastName,
          phoneNumber,
        }
      })
      return reply.status(201).send(response)
    } catch (error) {
      console.log(error)
    }
    

    
  })

  app.get('/show', async (request, reply) => {
    try {
      const response = await prisma.user.findMany({})

      return reply.send(response);
    } catch (error) {
      console.log(error)
    }
  })

  app.get('/search/:search', async (request: FastifyRequest<{ Params: ParamsProps}>, reply) => {
    const { search } = request.params;

    try {
      const response = await prisma.user.findMany({
        where: {
          lastName: {
            contains: String(search),   
          }
        }
      })
      return reply.send(response)
    } catch (error) {
      console.log(error)
    }
  })

  app.put('/update/:id', async (request: FastifyRequest<{ Params: ParamsProps}>, reply) => {

    const updateUserSchema = z.object({
      firstName: z.string(),
      lastName: z.string(),
      phoneNumber: z.string(),
    })

    const { id } = request.params;

    const { 
      firstName, 
      lastName, 
      phoneNumber 
    } = updateUserSchema.parse(request.body)

    try {
      const response = await prisma.user.update({
        where: {
          id,
        },
        data: {
          firstName,
          lastName,
          phoneNumber,
        }
      })
      return reply.send(response);
    } catch (error) {
      console.log(error)
    }
  })

  app.delete('/delete/:id', async (request: FastifyRequest<{ Params: ParamsProps}>, reply) => {
    const { id } = request.params;
    
    try {
      const response = await prisma.user.delete({
        where: {
          id,
        }
      })

      return reply.send(response);
    } catch (error) {
      console.log(error)
    }
  })

  app.get('/details/:id', async (request: FastifyRequest<{ Params: ParamsProps}>, reply) => {
    const { id } = request.params;

    try {
      const response = await prisma.user.findUnique({
        where: {
          id,
        }
      })
      return reply.send(response);
    } catch (error) {
      console.log(error)
    }
  })
}