import { useParams } from 'react-router-dom';
import { getEntryById } from '../utils/data';

export default function EntryListItem() {
  let { id } = useParams<'id'>();
  console.log('id', id);

  if (!id) {
    return <></>;
  }

  let item = getEntryById(id);
  console.log(item);

  if (!item) {
    return <></>;
  }

  let name = `${item.content} ${item.category} ${item.createdAt}`;

  return (
    <div className="h-screen px-4 pt-40">
      <div className="mx-auto max-w-7xl px-10">
        <div className="text-center">
          <h2>{name}</h2>
        </div>
      </div>
    </div>
  );
}
