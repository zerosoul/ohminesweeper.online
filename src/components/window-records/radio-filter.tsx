type Props = {
  filter: string;
  filters: string[];
  name: string;
  // eslint-disable-next-line no-unused-vars
  handleUpdate: (param: string) => void;
};

const RadioFilter = ({ handleUpdate, name, filter, filters }: Props) => {
  return (
    <div className="flex items-center gap-2 text-sm capitalize">
      <span className="text-right w-8 text-xs">{name}:</span>
      <ul className="flex gap-1 items-center py-1 font-semibold">
        {filters.map((_key) => {
          const id_key = `${name}_${_key}`;
          return (
            <li key={_key} className="flex cursor-pointer">
              <input
                className="cursor-pointer"
                id={id_key}
                name={id_key}
                type="radio"
                onChange={handleUpdate.bind(null, _key)}
                checked={filter == _key}
              />
              <label htmlFor={id_key}>{_key}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RadioFilter;
