import Rows from "./rows"

export default class BookmarkSearch extends Rows {
  constructor(results, sort) {
    super(results, sort)
    this.name = 'bookmark-search'
    this.title = 'Liked in Kozmos'
  }

  shouldBeOpen(query) {
    return query && query.length > 1 && (query.indexOf('tag:') !== 0 || query.length < 5)
  }

  fail(error) {
    console.error(error)
  }

  update(query) {
    const oquery = query || this.results.props.query

    this.results.messages.send({ task: 'search-bookmarks', query }, resp => {
      if (oquery !== this.results.props.query.trim()) {
        return
      }

      if (resp.error) return this.fail(resp.error)

      this.add(resp.content.results.likes)
    })
  }
}