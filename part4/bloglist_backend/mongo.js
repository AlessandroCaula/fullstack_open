const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2]

const url = `mongodb+srv://alecaula:${password}@cluster0.ksork.mongodb.net/blogApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model("Blog", blogSchema)

const blog = new Blog({
  title: "Blog 1",
  author: "Author 1",
  utl: "url 1",
  likes: 33,
})

blog.save().then((result) => {
  console.log("blog saved!")
  mongoose.connection.close()
})