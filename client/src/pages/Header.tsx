import ImportExport from "../components/ImportExport";
import "../css/Header.css";

interface HeaderProps {
  name: string;
  role: string;
}

export default function Header({ name, role }: HeaderProps) {
  return (
    <header className="headerContainer">
      <div className="headerLogo">
        <img
          className="headerLogoIcon"
          width="45"
          height="45"
          src="./icons/cell-icon.svg"
          alt="Логотип Ячейка.Ру"
          loading="lazy"
        />
        <h1 className="headerLogoName">Ячейка.ру</h1>
      </div>

      <nav className="headerNav">
        <a href="/help" className="headerNavContacts">
          Контакты
        </a>
        <span className="headerNavSeparator"></span>
        <a href="/" className="headerNavCabinet">
          Личный кабинет
        </a>
      </nav>

      <div className="headerExportImport">
        <div className="headerVariables">
          <span className="headerVariablesName">{name}</span>
          <span className="headerVariablesRole">{role}</span>
        </div>
      </div>
    </header>
  );
}
