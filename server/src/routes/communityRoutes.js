const express = require('express');
const router = express.Router();
const dbAdapter = require('../db/dbAdapter');

// 1. Get all community discussion topics and replies
router.get('/topics', async (req, res) => {
  try {
    const topics = await dbAdapter.getCommunityTopics();
    res.json({
      success: true,
      topics,
      databaseMode: dbAdapter.getMode(),
      total: topics.length
    });
  } catch (err) {
    console.error('Error fetching community topics:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to load community topics',
      message: err.message
    });
  }
});

// 2. Create a new discussion topic
router.post('/topics', async (req, res) => {
  try {
    const { title, category, categoryLabel, author, role, content, tags } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Content is required' });
    }
    if (!author || !author.trim()) {
      return res.status(400).json({ error: 'Author name is required' });
    }

    const newTopic = await dbAdapter.createCommunityTopic({
      title,
      category: category || 'print-design',
      categoryLabel: categoryLabel || 'Print & Design',
      author,
      role: role || 'Community Member',
      content,
      tags: Array.isArray(tags) ? tags : []
    });

    res.status(201).json({
      success: true,
      message: 'Discussion topic created successfully',
      topic: newTopic
    });
  } catch (err) {
    console.error('Error creating community topic:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to create discussion topic',
      message: err.message
    });
  }
});

// 3. Post a reply into a discussion topic
router.post('/topics/:id/replies', async (req, res) => {
  try {
    const topicId = req.params.id;
    const { author, role, text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Reply text is required' });
    }
    if (!author || !author.trim()) {
      return res.status(400).json({ error: 'Author name is required' });
    }

    const reply = await dbAdapter.addCommunityReply({
      topicId,
      author,
      role: role || 'Community Member',
      text
    });

    res.status(201).json({
      success: true,
      message: 'Reply posted successfully',
      reply
    });
  } catch (err) {
    console.error('Error posting community reply:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to post reply',
      message: err.message
    });
  }
});

// 4. Upvote a topic
router.post('/topics/:id/upvote', async (req, res) => {
  try {
    const topicId = req.params.id;
    const delta = typeof req.body.delta === 'number' ? req.body.delta : 1;
    const upvotes = await dbAdapter.upvoteCommunityTopic(topicId, delta);

    res.json({
      success: true,
      topicId,
      upvotes
    });
  } catch (err) {
    console.error('Error upvoting topic:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to upvote topic',
      message: err.message
    });
  }
});

// 5. Upvote a reply
router.post('/replies/:id/upvote', async (req, res) => {
  try {
    const replyId = req.params.id;
    const delta = typeof req.body.delta === 'number' ? req.body.delta : 1;
    const upvotes = await dbAdapter.upvoteCommunityReply(replyId, delta);

    res.json({
      success: true,
      replyId,
      upvotes
    });
  } catch (err) {
    console.error('Error upvoting reply:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to upvote reply',
      message: err.message
    });
  }
});

module.exports = router;
