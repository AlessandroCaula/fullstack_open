import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = () => {
  // if (!props.show) {
  //   return null
  // }

  // Retrieve all the books
  const resultBooks = useQuery(ALL_BOOKS)

  if (resultBooks.loading) {
    return (
      <div>loading...</div>
    )
  }

  const books = resultBooks.data.allBooks

  console.log(resultBooks)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
