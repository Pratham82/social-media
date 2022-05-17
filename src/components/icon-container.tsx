import { IChildrenProps } from "../../types";

const IconContainer: React.FC<IChildrenProps> = ({
  children,
}: IChildrenProps): JSX.Element => (
  <div className="translate-x-1 scale-90 cursor-pointer rounded-full p-2  transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">
    {children}
  </div>
);

export default IconContainer;
