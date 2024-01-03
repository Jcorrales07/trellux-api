const router = require('express').Router()
const { KanbanService } = require('../services/kanbans.services')

const service = new KanbanService()

// get all kanbans
router.get('/', async (req, res) => {
    const kanbans = await service.getAllKanbans()

    kanbans.length
        ? res.json(kanbans)
        : res.json({
              message: 'This collection is empty',
          })
})

// get kanban by id
router.get('/:kanbanId', async (req, res) => {
    const { kanbanId } = req.params

    const kanban = await service.getKanbanById(kanbanId)

    kanban
        ? res.json(kanban)
        : res.json({
              message: `Kanban with id: ${kanbanId} not found`,
          })
})

// create kanban
router.post('/', async (req, res) => {
    const { kanbanId, username, columnOrder } = req.body

    console.log(kanbanId, username, columnOrder)

    const kanban = {
        kanbanId: kanbanId,
        username: username,
        columnOrder: columnOrder,
    }

    const kanbanCreated = await service.createKanban(kanban)

    if (!kanbanCreated) {
        res.status(500).json({
            success: false,
            message: 'Kanban not created',
        })
        return
    }

    res.json({
        success: true,
        message: 'Kanban created',
        kanban,
    })
})

router.put('/:kanbanId', async (req, res) => {
    const { kanbanId } = req.params
    const { columnOrder } = req.body

    const kanban = await service.updateKanban(kanbanId, columnOrder)

    if (!kanban) {
        res.status(500).json({
            success: false,
            message: 'Kanban not updated',
        })
        return
    }

    res.json({
        success: true,
        message: 'Kanban updated',
        kanban,
    })
})

// delete kanban
router.delete('/:kanbanId', async (req, res) => {
    const { kanbanId } = req.params

    const kanban = await service.deleteKanbanBy({ id: kanbanId })

    if (!kanban) {
        res.status(500).json({
            success: false,
            message: 'Kanban not deleted',
        })
        return
    }

    res.json({
        success: true,
        message: 'Kanban deleted',
        kanban,
    })
})

// delete all boards
router.delete('/', async (req, res) => {
    
    const kanban = await service.deleteAllKanbans()

    res.json({
        success: true,
        message: 'All kanbans deleted',
        kanban
    })

})

module.exports = router