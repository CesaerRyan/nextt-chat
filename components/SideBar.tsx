import NewChat from "./NewChat";

function SideBar() {
  return (
    <div className="flex p-2 flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat></NewChat>
        </div>

        <div>{/*model*/}</div>

        <div>{/*map through chats */}</div>
      </div>
    </div>
  );
}

export default SideBar;
