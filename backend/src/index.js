const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./User')

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/livecrud', {
  useNewUrlParser: true,
});

// Rotas
app.get('/users', async (req, res) => {
  const users = await User.find();

  return res.json(users);
})

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  return res.json(user);
})

app.post('/users', async (req, res) => {
  const user = await User.create(req.body);

  return res.json(user);
})

app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })

  return res.json(user);
})

app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  return res.json();
})

app.listen(3333);