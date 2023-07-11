const { BoardModel } = require('../models/boards.model')
const { v4: uuidv4 } = require('uuid')

class BoardService {
    constructor() {
        this.boards = []
    }

    async getBoardsFrom({ username }) {
        return await BoardModel.find({ username: username })
    }

    async getBoardById({ id }) {
        return await BoardModel.findOne({ id: id })
    }

    async createBoard({ title, description, username }) {
        return await BoardModel.create({
            id: uuidv4(),
            title: title,
            description: description,
            username: username,
        })
    }

    async updateBoard({ id, title, description }) {
        return await BoardModel.updateOne({id: id}, {title: title, description: description, updatedAt: Date.now()})
    }

    async deleteBoard({ id }) {
        return await BoardModel.findOneAndRemove({id: id})
    }
}

module.exports = { BoardService }
