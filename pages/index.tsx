import type { NextPage } from 'next';
type Props = string | undefined | null;

export interface NotificationsProps {
  id: number;
  content: string;
  props: Props;
}

export interface HeaderProps {
  id: number;
  name: string;
  notifications: NotificationsProps[];
}

const Home: NextPage = () => {
  let something: HeaderProps = {
    id: 1,
    name: 'ABC',
    notifications: [{ id: 101, content: 'yyy', props: null }],
  };
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* <SideBar/> */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/* <Header /> */}
          <main>
            <h1 className="text-3xl text-red-300 font-bold underline">
              Hello world!
            </h1>
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
