import { Request, Response } from 'express';
import db from './../database/connection';

export default class ConnectionsController {
    async index(req: Request, res: Response) {
        // await db.raw('DELETE FROM connections');
        // await db.raw('DELETE FROM class_schedule');
        // await db.raw('DELETE FROM classes');
        // await db.raw('DELETE FROM users');
        // return res.status(200).send();

        const totalConnections = await db('connections').count('* as total');

        const { total } = totalConnections[0];

        return res.status(200).json({ total });
    }

    async create (req: Request, res: Response) {
        const { user_id } = req.body;

        await db('connections').insert({
            user_id
        });

        return res.status(201).send();
    }
}