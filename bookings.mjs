import { ObjectId } from 'mongodb';
import { db } from './db/database.mjs';

const bookings = {
    //Hämtar bokningar
    getByResource: async function getByResource(resourceId) {
        return await db.collection("bookings").find({resource_id: new ObjectId(resourceId)
        }).sort({ start_time: 1 }).toArray(); 
    },
    //Lägger till en bokning
    addOne: async function addOne(body) {
        const result = await db.collection("bookings").insertOne({
            resource_id: new ObjectId(body.resource_id),
            user: body.user,
            start_time: body.start_time,
            end_time: body.end_time,
            status: "confirmed"
        });
        return { lastID: result.insertedId };
    },
    //Raderar en bokning
    deleteOne: async function deleteOne(id) {
    const result = await db.collection("bookings").deleteOne({
        _id: new ObjectId(id)
    });
    return { changes: result.changes };
    }
};

export default bookings;
