import _ from 'lodash'

export default function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value()
}

export function handleSort(items, sortee) {
  return _.sortBy(items, sortee)
}
