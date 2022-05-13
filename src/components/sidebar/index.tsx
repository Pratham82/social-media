import { sidebarData } from "assets/data";
import Link from "next/link";
import { ISidebarItem } from "../../../types";

const Sidebar: React.FC = (): JSX.Element => {
  return (
    <div className="sm:flex lg:flex-1">
      {/* <div className="flex-1 sm:flex-1"> */}
      <aside className="ml-auto h-full">
        <nav className="flex h-full flex-col pr-10 md:pr-40">
          <ul className="fixed py-2 px-2">
            {sidebarData.map(({ id, title, link, icon }: ISidebarItem) => (
              // <ListItem id={id} key={id}>
              //   {sideBarIcons[i]}
              //   <span className="hidden px-4 md:block">{title}</span>
              // </ListItem>
              <Link href={link} key={id}>
                <li
                  className="flex translate-x-1 cursor-pointer rounded-full py-3 px-3 transition duration-500 hover:bg-gray-200 dark:hover:bg-gray-800"
                  role="presentation"
                >
                  {icon}
                  <span className="hidden px-4 md:block" title={title}>
                    {title}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
          {/* <div className="mt-auto hidden px-4 md:block">John Doe</div> */}
          <div className="sticky mt-auto px-4 md:block" />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
