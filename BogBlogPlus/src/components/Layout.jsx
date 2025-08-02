import { Outlet, useMatches} from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout({title}) {
    const matches =useMatches();
    const currentTitle = matches
    .reverse() // start from the deepest match, if there is a match to the handle AND it's marked title make it the title else Bog Blog
    .find((match) => match.handle && match.handle.title)?.handle.title || "Bog Blog";
  return (
    <>
      <NavBar title ={currentTitle}/>
      <main>
        <Outlet />
      </main>
    </>
  );
}
