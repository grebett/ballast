import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { BookModel, BookSnapshot } from "../book/book"
import { BookApi } from "../../services/api/book-api"
import { withEnvironment } from "../extensions/with-environment"

export const BookStoreModel = types
  .model("BookStore")
  .props({
    books: types.optional(types.array(BookModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveBooks: (BookSnapshots: BookSnapshot[]) => {
      self.books.replace(BookSnapshots)
    },
  }))
  .actions((self) => ({
    getBooks: async () => {
      const bookApi = new BookApi(self.environment.api)
      const result = await bookApi.getBooks()

      if (result.kind === "ok") {
        self.saveBooks(result.books)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type BookStoreType = Instance<typeof BookStoreModel>
export interface BookStore extends BookStoreType {}
type BookStoreSnapshotType = SnapshotOut<typeof BookStoreModel>
export interface BookStoreSnapshot extends BookStoreSnapshotType {}
export const createBookStoreDefaultModel = () => types.optional(BookStoreModel, {})
