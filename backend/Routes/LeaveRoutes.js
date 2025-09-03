const express = require('express');
const router = express.Router();
const {
    createLeave,
    getAllLeaves,
    updateLeaveStatus,
    deleteLeave
} = require('../Controllers/LeaveController');

// Create leave application
router.post('/', createLeave);

// Get all leaves with optional filtering
router.get('/', getAllLeaves);

// Update leave status (approve/reject)
router.put('/:id/status', updateLeaveStatus);

// Delete leave
router.delete('/:id', deleteLeave);

module.exports = router;