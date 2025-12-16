import '../../../../css/Sidebar.scss'

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__title">Apmeklētie forumi</div>

      <nav className="sidebar__nav">
        <a className="sidebar__link" href="/mainpage">Forums 1</a>
        <a className="sidebar__link" href="/mainpage">Forums 2</a>
        <a className="sidebar__link" href="/mainpage">Forums 3</a>
        <a className="sidebar__link" href="/mainpage">Forums 4</a>
        <a className="sidebar__link" href="/mainpage">Forums 5</a>
      </nav>
    </div>
  );
}
