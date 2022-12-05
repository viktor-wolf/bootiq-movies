import { FC } from "react";
import { IDetailLocal } from "../state/detailSlice";

type TDetailValue = string | string[]

type TDetailObject = { 
  key: string, 
  val: TDetailValue 
}

interface ITableRowProps {
  item: TDetailObject
}

interface IDataTableProps {
  data: IDetailLocal
}

const findAndSplice = (arr: TDetailObject[], search: string): TDetailObject => {
  const index = arr.findIndex(item => item.key === search);
  return arr.splice(index, 1)[0];
}

const Row: FC<ITableRowProps> = ({ item }) => {
  return (
    <tr className="table__row">
      <td className="table__cell table__cell--name">{`${item.key}:`}</td>
      <td className="table__cell table__cell--value">{item.val}</td>
    </tr>
  )
}

const ListRow: FC<ITableRowProps> = ({ item }) => {
  if (!Array.isArray(item.val)) return null;
  return (
    <tr className="table__row">
      <td className="table__cell table__cell--name">
        {`${item.key}:`}
      </td>
      <td className="table__cell table__cell--value">
        <ul className="table-list">
          {( item.val.map((li, i) => <li className="table-list__item" key={i}>{li}</li>) )}
        </ul>
      </td>
    </tr>
  )
}

const DataTable: FC<IDataTableProps> = ({ data }) => {
  const dataArray = Object.entries(data)
    .map(([ key, val ]: [string, TDetailValue]): TDetailObject => {
      return { key, val }
    });

  dataArray.sort((a, b) => {
    const aU = a.key.toUpperCase();
    const bU = b.key.toUpperCase();
    return (aU < bU) ? -1 : (aU > bU) ? 1 : 0;
  });

  findAndSplice(dataArray, 'Poster');
  findAndSplice(dataArray, 'Title');
  const imdbID = findAndSplice(dataArray, 'IMDB ID');
  const imdbRating = findAndSplice(dataArray, 'IMDB Rating');
  const imdbVotes = findAndSplice(dataArray, 'IMDB Votes');

  const finalArray = [ ...dataArray, imdbID, imdbRating, imdbVotes ];

  return (
    <table className="table">
      <tbody className="table__body">
        {(
          finalArray.map((item, i) => {
            if (Array.isArray(item.val)) {
              return <ListRow item={item} key={i} />
            }
            return <Row item={item} key={i} />
          })
        )}
      </tbody>
    </table>
  )
}

export default DataTable
