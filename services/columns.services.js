const { ColumnModel } = require('../models/columns.model')

class ColumnService {
    constructor() {
        this.columns = []
    }

    async getColumns() {
        return await ColumnModel.find({})
    }

    async getColumnsWith({ kanbanId }) {
        return await ColumnModel.find({ kanbanId: kanbanId })
    }

    async getColumnsFrom({ username }) {
        return await ColumnModel.find({ username: username })
    }

    async getColumnById({ id }) {
        return await ColumnModel.findOne({ id: id })
    }

    async createColumn(column) {
        return await ColumnModel.create(column)
    }

    async createColumns(columns) {
        return await ColumnModel.insertMany(columns)
    }

    async updateColumn({ id, title }) {
        await ColumnModel.updateOne(
            { id: id },
            { $set: { title: title, updatedAt: Date.now() } }
        )
        return await ColumnModel.findOne({ id: id })
    }

    async deleteColumn({ id }) {
        return await ColumnModel.findOneAndRemove({ id: id })
    }

    async deleteAllColumns() {
        return await ColumnModel.deleteMany({})
    }
}

module.exports = { ColumnService }
