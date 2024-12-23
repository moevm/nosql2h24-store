import "../css/HelpPage.css";

export default function HelpPage() {
  return (
    <div className="helpPageContainer">
      <div className="helpPageBody">
        <div className="helpPageForm">
          <h1 className="helpPageContactTitle">Служба поддержки</h1>
          <p className="helpPageContactDescription">
            Мы всегда рады вопросам и фидбеку, поэтому предлагаем контакты для
            связи!
          </p>
          <data className="formItem">
            <img
              className="dataImage"
              width="30"
              height="30"
              src="./icons/mail-icon.svg"
              alt="Email"
              loading="lazy"
            />
            <span className="dataTitle">Email: yacheika.ru@company.co</span>
          </data>

          <data className="formItem">
            <img
              className="dataImage"
              width="30"
              height="30"
              src="./icons/phone2-icon.svg"
              alt="Email"
              loading="lazy"
            />
            <span className="dataTitle">Phone: (123) 456-7890</span>
          </data>
        </div>

        {/* <div className="helpPageRequest">
          <p className="helpPageFormRequest">
            Оставьте свое сообщение, и оператор ответит вам в ближайшее время.
          </p>
          <textarea
            className="helpPageFormTextarea"
            placeholder="Оставьте свое сообщение здесь..."
          ></textarea>

          <button className="requestButton button">Отправить сообщение</button>
        </div> */}
      </div>
    </div>
  );
}
