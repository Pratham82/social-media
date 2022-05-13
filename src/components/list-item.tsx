import { IListItemProps } from "../../types";

const ListItem: React.FC<IListItemProps> = ({
  children,
  id,
}: IListItemProps): JSX.Element => (
  <li
    className="flex translate-x-1 cursor-pointer rounded-full py-3 px-3 transition duration-500 hover:bg-gray-200 dark:hover:bg-gray-700"
    key={id}
  >
    {children}
  </li>
);

export default ListItem;
