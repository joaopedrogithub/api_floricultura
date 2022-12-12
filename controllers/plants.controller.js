const plants = require('../models/plants.model')


const save = async (req, res, next) => {  
    try {
        const data = req.body
        const newplants = new plants(data)
        const savedplants = await newplants.save()
        if(!savedplants) {
            throw new Error('plants cold not be saved')
        }
        res.status(201).json({
            message: 'New plants added'
        })
        
    } catch(err) {
        next(err)
    }
}
plants

const getAll = async (req, res, next) => {
    try {
        const plants = await plants.find()
        res.status(200).json(plants)
    } catch(err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id
        const plants = await plants.findById(id)
        if(!book) {
            throw new Error(`plants with id ${id} not found`)
        }
        res.status(200).json(plants)
    } catch(err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body

        const plants = await plants.findById(id)
        if(!plants) {
            throw new Error(`plants with id ${id} not found`)
        }

        const newplants = await plants.findByIdAndUpdate(id, data, {new: true})
        res.status(200).json(newplants)
    } catch(err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    try {
        const id = req.params.id
        const plants = await plants.findById(id)
        if(!plants) {
            throw new Error(`plants with id ${id} not found`)
        }
        await plants.findByIdAndDelete(id)
        res.status(200).json({message: `plants with id ${id} has deleted`})
    } catch(err) {
        next(err)
    }
}

module.exports = {
    save,
    getAll,
    getById,
    update,
    remove
}

