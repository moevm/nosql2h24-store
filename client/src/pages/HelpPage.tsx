import React from 'react';
import '../css/HelpPage.css';
import { Link } from "react-router-dom";
import { ReactComponent as MailIcon } from '../css/mail-icon.svg';
import { ReactComponent as PhoneIcon } from '../css/phone2-icon.svg';
import { ReactComponent as BackIcon } from '../css/back-icon.svg';

export default function HelpPage() {
    return (
        <div className="help-page">

            <main className="main">
                <section className="contact-section">
                    <h1 className="heading">Служба поддержки</h1>
                    <p className="subheading">Мы всегда рады вопросам и фидбеку, поэтому предлагаем контакты для связи!</p>
                    <div className="contact-info">
                        <div className="contact-item">
                            <MailIcon className="mail-icon" />
                            <span>Email: yacheika.ru@company.co</span>
                        </div>
                        <div className="contact-item">
                            <PhoneIcon className="phone2-icon" />
                            <span>Phone: (123) 456-7890</span>
                        </div>
                    </div>
                </section>

                <section className="form-section">
                    <p>Оставьте свое сообщение, и оператор ответит вам в ближайшее время.</p>
                    <textarea placeholder="Оставьте свое сообщение здесь..." className="textarea"></textarea>
                    <button className="send-button">Отправить сообщение</button>
                </section>
            </main>

            <footer className="footer">
                <address>
                    Улица Торжковская 1Б, Санкт-Петербург, Россия<br />
                    © 2024 Ячейка.ру
                </address>
            </footer>

            <a href="/personalAccount" className="back-to-dashboard-button">
                <BackIcon className="back-icon" />
            </a>
        </div>
    );
}
