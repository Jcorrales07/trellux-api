const { BoardModel } = require('../models/boards.model')

class BoardService {
    constructor() {
        this.boards = []
    }

    async getBoards() {
        return await BoardModel.find({})
    }

    async getBoardsFrom({ username }) {
        return await BoardModel.find({ username: username })
    }

    async getBoardById({ id }) {
        return await BoardModel.findOne({ id: id })
    }

    async createBoard(board) {
        return await BoardModel.create(board)
    }

    async updateBoard({ id, title }) {
        await BoardModel.updateOne(
            { id: id },
            { $set: { title: title, updatedAt: Date.now() } }
        )
        return await BoardModel.findOne({ id: id })
    }

    async deleteBoard({ id }) {
        return await BoardModel.findOneAndRemove({ id: id })
    }

    async deleteAllBoards() {
        return await BoardModel.deleteMany({})
    }
}

module.exports = { BoardService }
