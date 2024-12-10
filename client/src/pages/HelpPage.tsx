import "../css/HelpPage.css";

export default function HelpPage() {
  return (
    <div className="helpPageContainer">
      <div className="helpPageBody">
        <h1 className="helpPageContactTitle">Служба поддержки</h1>
        <p className="helpPageContactDescription">
          Мы всегда рады вопросам и фидбеку, поэтому предлагаем контакты для
          связи!
        </p>

        <form className="helpPageForm">
          <label className="visually-hidden" htmlFor="email">
            Почта
          </label>
          <input
            className="dataInput"
            id="email"
            type="email"
            placeholder="Email: yacheika.ru@company.co"
          ></input>

          <label className="visually-hidden" htmlFor="phone">
            Телефон
          </label>
          <input
            className="dataInput"
            id="phone"
            type="phone"
            placeholder="Phone: (123) 456-7890"
          ></input>
        </form>

        <p className="helpPageFormRequest">
          Оставьте свое сообщение, и оператор ответит вам в ближайшее время.
        </p>
        <textarea
          className="helpPageFormTextarea"
          placeholder="Оставьте свое сообщение здесь..."
        ></textarea>

        <button className="requestButton button">Отправить сообщение</button>
      </div>
    </div>
  );
}
