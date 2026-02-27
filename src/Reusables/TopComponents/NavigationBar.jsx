import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


function NavigationItem({addr, label}){
  const location = useLocation();
    return location.pathname == addr 
         ? <div/> 
         : (<Link className="tab" to={addr} >
              {label}
            </Link>)
  }
  export function NavigationBar() {
    return (<nav className="tabs" aria-label="Primary navigation">
            <NavigationItem addr="/glossary" label="Glossary"/>
            <NavigationItem addr="/cultural-map" label = "Cultural Map"/>
            <NavigationItem addr = "/story" label = "Story"/>
            <NavigationItem addr = "/Website" label = "Main"/>
          </nav>);
  }

