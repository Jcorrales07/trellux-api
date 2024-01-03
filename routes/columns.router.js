const router = require('express').Router()
const { ColumnService } = require('../services/columns.services')

const columnService = new ColumnService()

// create column
router.post('/', async (req, res) => {
    const { kanbanId, columnId, title, username, tasksIds } = req.body

    console.log('info desde el frontend column', {
        kanbanId,
        columnId,
        title,
        username,
        tasksIds
    })

    const column = { kanbanId, columnId, title, username, tasksIds }

    const columnCreated = await columnService.createColumn(column)

    console.log(columnCreated)

    if (!columnCreated) {
        res.status(500).json({
            success: false,
            message: 'Column not created',
        })
        return
    }

    res.json({
        success: true,
        message: 'Column created',
        columnCreated,
    })
})

router.post('/multiple', async (req, res) => {
    const columns = req.body

    console.log('info desde el frontend', columns)

    const columnsCreated = await columnService.createColumns(columns)

    if (!columnsCreated) {
        res.status(500).json({
            success: false,
            message: 'Column not created',
        })
        return
    }

    res.json({
        success: true,
        message: 'Column created',
        columns,
    })
})

// get all columns
router.get('/', async (req, res) => {
    res.json({ message: 'get all columns' })

    const columns = await columnService.getColumns()

    columns.length
        ? res.json(columns)
        : res.json({ message: 'The column collection is empty' })
})

// get columns of kanbanId
router.get('/:kanbanId', async (req, res) => {
    const { kanbanId } = req.params

    const column = await columnService.getColumnsWith({ kanbanId: kanbanId })

    column
        ? res.json({
              success: true,
              column,
          })
        : res.json({
              success: false,
              message: 'Columns not found',
          })
})

// get columns of username
router.get('/:username', async (req, res) => {
    const { username } = req.params

    const columns = await columnService.getColumnsFrom({ username })

    // console.log(columns)
    columns.length
        ? res.json({
              success: true,
              columns,
          })
        : res.json({ success: false, message: `${username} doesn't have columns` })
})

// get column by columnId
router.get('/:columnId', async (req, res) => {
    const { columnId } = req.params

    const column = await columnService.getColumnById({ columnId: columnId })

    column
        ? res.json({
              success: true,
              column,
          })
        : res.json({
              success: false,
              message: 'Column not found',
          })
})

// update column
router.put('/:columnId', async (req, res) => {
    const { columnId } = req.params
    const { title } = req.body

    const column = await columnService.updateColumn({
        columnId: columnId,
        title,
    })

    if (!column) {
        res.status(500).json({
            success: false,
            message: 'Column not updated',
        })
    }

    res.json({
        success: true,
        message: 'Column updated',
        column,
    })
})

// delete column
router.delete('/:columnId', async (req, res) => {
    const { columnId } = req.params

    const column = await columnService.deleteColumn({ columnId: columnId })

    if (!column) {
        res.status(500).json({
            success: false,
            message: 'Column not deleted',
        })
    }

    res.json({
        success: true,
        message: 'Column deleted',
        column,
    })
})

// delete all columns
router.delete('/', async (req, res) => {
    const column = await columnService.deleteAllColumns()

    res.json({
        success: true,
        message: 'All columns deleted',
        column,
    })
})

module.exports = router
