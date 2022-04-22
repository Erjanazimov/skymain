import React from 'react';
import {useSelector} from "react-redux";


const About = () => {
    const stateInfoPark = useSelector(state => state.infoCinema.infoPark);

    return (
        <div className="block_gid">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2926.2011038096666!2d74.60198531546567!3d42.82636561351809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb6060fd12677%3A0xc94556213dba6b02!2z0J_QsNGA0Log0L_QvtCx0LXQtNGL!5e0!3m2!1sru!2skg!4v1650527907810!5m2!1sru!2skg"
                width="100%"
                height="500"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
            />
            <div className="block_map">
                <div>
                    <div className="text_map">
                    <h4>Бишкек</h4>
                        <p>
                            {stateInfoPark.map(item => item.address)}
                        </p>
                    </div>
                    <div className="fons_map">
                    {stateInfoPark.map(item => {
                        return <div key={item.id} className="text_date">
                            <p><b>По всем вопросам:</b><span> {item.phone_number}</span></p>
                            <p><b>График работы:</b> <span> с 10:00 до 2:00</span></p>
                        </div>
                    })}
                    </div>
                </div>
            </div>

            <div className="container mt-4 mb-5">
                <h3 className="text-white">О компание</h3>
                <div className="text-description">
                {stateInfoPark.map(item => item.description)}
                </div>
            </div>
        </div>
    );
}




export default About;
