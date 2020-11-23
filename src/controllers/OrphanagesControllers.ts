import {Request, Response} from 'express'

import {getRepository} from 'typeorm'

import Orphanage from '../models/Orphanage'

export default {

    async index(request:Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        })

        return response.json(orphanages)    
    },

    async show(request:Request, response: Response) {

        const {id} = request.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        })

        return response.json(orphanage)
    },

    async create(request: Request, response:Response) {
        console.log(request.files)
        const { 
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
           } =  request.body;

           const orphanagesRepository = getRepository(Orphanage);

           
           const requestImages = request.files as Express.Multer.File[];
           const images = requestImages.map(images => {
               return { path: images.filename}
           })


           const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
           }) 
            
        await orphanagesRepository.save(orphanage) 
        return response.status(201).json(orphanage)

    }
}