const { KanbanModel } = require('../models/kanban.model')

class KanbanService {
    constructor() {
        this.kanbans = []
    }

    async getAllKanbans() {
        this.kanbans = await KanbanModel.find({})
        return this.kanbans
    }

    async getAllKanbansOf(username) {
        this.kanbans = await KanbanModel.find(username)
    }

    async getKanbanById(kanbanId) {
        return await KanbanModel.findOne({ kanbanId: kanbanId }).then((kanban) => kanban)
    }

    async createKanban(kanban) {
        return await KanbanModel.create(kanban)
    }

    async updateKanban(kanbanId, columnOrder) {
        await KanbanModel.updateOne(kanbanId, {
            $set: {
                columnOrder: columnOrder,
                updatedAt: Date.now(),
            },
        })

        return await KanbanModel.findOne({ kanbanId })
    }

    async deleteKanbanBy(args) {
        return await KanbanModel.findOneAndRemove(args)
    }

    async deleteAllKanbans() {
        return await KanbanModel.deleteMany({})
    }
}

module.exports = {
    KanbanService,
}
