const Event = require('../models/Event');
const User = require('../models/User');

module.exports = {
    async createEvent(req, res) {
        const {title, description, price, sport} = req.body;
        const {user_id} = req.headers;
        const {filename} = req.file;

        const user = await User.findById(user_id);

        if(!user) {
            return res.status(400).json({message: 'User does not exist'})
        }

        const event = await Event.create({
            title,
            description,
            price:parseInt(price),
            user:user_id,
            sport,
            thumbnail:filename
        })

        return res.json(event);
    },

    async delete(req, res) {
        const {eventId} = req.params;
        try{
            await Event.findByIdAndDelete(eventId)
            return res.status(204).send();
        }catch(error){
            return res.status(400).json({message: 'There are no Events available with this ID'})
        }
    }
}