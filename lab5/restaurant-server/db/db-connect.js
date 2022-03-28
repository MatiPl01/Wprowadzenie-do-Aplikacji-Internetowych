const mongoose = require('mongoose')

const uri = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

mongoose.connect(uri).then(() => {
  console.log('Database was connected successfully')
}).catch(err => {
  console.error('Database connection error', err)
})
