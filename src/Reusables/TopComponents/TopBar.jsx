import "./topbar.css"
import { NavigationBar } from "./NavigationBar"

export function TopBar(){
 return  (<header className="topbar">
        <div className="topbar__inner">
          <div className="brand" aria-label="Project name">
            <span className="brand__mark" aria-hidden="true">
              P
            </span>
            <span className="brand__text">Project Paramount</span>
          </div>
           <NavigationBar/>
        </div>
      </header>)
      
}