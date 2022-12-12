const sellers = require('../models/sellers.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const constants = require('../utils/constants')

const save = async (req, res, next) => {
    try {
        const data = req.body

        const hash = await bcrypt.hash(data.password, 10)
        data.password = hash
        console.log(data.password)

        const seller = new seller(data)

        const savedSeller = await seller.save()

        if (!savedSeller) {
            throw Error('seller could not be saved')
        }
        res.status(201).json({
            message: 'New seller created'
        })
    } catch (err) {
        next(err)
    }
}

const getAll = async (req, res, next) => {
    try {
        const sellers = await seller.find()
        for (let seller of sellers) {
            seller.password = undefined
        }
        res.json(sellers)
    } catch (err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id
        const seller = await sellers.findById(id)
        if (!sellers) {
            throw new Error(`seller with id ${id} not found`)
        }

        seller.password = undefined
        res.json(seller)
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body
        const seller = await seller.findById(id)
        if (!seller) {
            throw new Error(`seller with id ${id} not found`)
        }
        data.password = seller.password
        const newSeller = await seller.findByIdAndUpdate(id, data, { new: true })
        newSeller.password = undefined
        res.json(newSeller)
    } catch (err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    try {
        const id = req.params.id
        const seller = await seller.findById(id)
        if (!seller) {
            throw new Error(`seller with id ${id} not found`)
        }
        await seller.findByIdAndDelete(id)
        res.json({ message: `seller with id ${id} has deleted` })
    } catch (err) {
        next(err)
    }
}

const authenticate = async (req, res, next) => {
    try {
        const { sellername, password } = req.body

        if (!(email && password)) {
            throw new Error('email and password are required')
        }

        const seller = await seller.findOne({ email })

        if (seller && (await bcrypt.compare(password, seller.password))) {
            const token = jwt.sign({
                sub: seller._id,
                iss: constants.security.iss,
                email: seller.sellername,
                name: seller.name,
                profiles: seller.profiles
            }, constants.security.secret, {
                expiresIn: constants.security.expires
            })

            res.status(200).json(token)
        } else {
            throw new Error('sellername and password invalid')
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    save,
    getAll,
    getById,
    update,
    remove,
    authenticate
}