import React from 'react';
import {Link, useHistory} from "react-router-dom";
import {RightCircleFilled} from "@ant-design/icons";
import bem from "easy-bem";
import "react-multi-carousel/lib/styles.css";
import {useDispatch} from "react-redux";
import {addIdCinema} from "../../redux/infoCinemaSlice";
import {Spin} from "antd";

const CarouselImages = ({title, data, link}) => {
    const b = bem("scroll");
    const {push} = useHistory();
    const dispatch = useDispatch();
    const btnInfo = (id) => {
        push(`/infoCinema:${id}`)
        dispatch(addIdCinema({id: id}))
    }



    if (data.length) {
        return  <div className={b("container")}>
            <div className="text-font">
                <h2>
                    <Link to={link}>
                        <p className="text_pozt">{title}</p> <p className="mx"><RightCircleFilled /> </p>
                    </Link>
                </h2>
            </div>

            <div className="flex_carousel">
                        {data.map((item) => <div className={b("move")} key={item.url_id} onClick={() => btnInfo(item.url_id)}>
                            <img src={item.poster_link}/>
                        </div>)}
            </div>

        </div>
    }
    return  <div className="example">
        <Spin />
    </div>

    ;
};

export default CarouselImages;