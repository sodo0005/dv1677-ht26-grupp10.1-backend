import { db } from './db/database.mjs';
import { ObjectId } from 'mongodb';

const resources = {
    //Hämtar alla resources
    getAll: async function getAll() {
        return await db.collection("resources").find({}).toArray();
    },
    //Hämtar vald resource
    getOne: async function getOne(id) {
    return await db.collection("resources").findOne({
        _id: new ObjectId(id)
    }) || {};
    },
    //Lägger till en resource
    addOne: async function addOne(body) {
    const result = await db.collection("resources").insertOne({
        name: body.name,
        type: body.type,
        description: body.description,
        capacity: body.capacity || 1
    });
    return { lastID: result.insertedId };
    },
    //Tar bort resource
    deleteOne: async function deleteOne(id) {
    const result = await db.collection("resources").deleteOne({
        _id: new ObjectId(id)
    });
    return { changes: result.deletedCount };
    }
};


export default resources;