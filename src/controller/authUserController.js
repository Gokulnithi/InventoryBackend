const express = require('express');

const userModel = require('../models/userModel');

const verify = async (req, res) => {
    try {
      const { id, role, base } = req.user;
  
      if (!id) {
        return res.status(401).json({ message: 'Invalid token payload' });
      }
  
      const user = await userModel.findById(id).select('-password');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        id: user._id,
        name: user.username,
        role,
        base
      });
    } catch (err) {
      console.error('Error verifying user:', err.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

module.exports = verify;
