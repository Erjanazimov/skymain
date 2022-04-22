import React, {useEffect} from 'react';
import "./_InfoCinema.css";
import {useDispatch, useSelector} from "react-redux";
import {fetchMoveInfo} from "../../redux/infoCinemaSlice";
import Loading from "../loading/Loading";

const InfoCinema = ({id, title, poster_link}) => {
    const dispatch = useDispatch();
    const stateMove = useSelector(state => state.infoCinema.info_cinema);


    useEffect(() => {
            dispatch(fetchMoveInfo(id))
    }, [])

    function removeDuplicates(originalArray, prop) {
        let newArray = [];
        let lookupObject  = {};

        for(let i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for(let i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    }

    let contentDuplicates = removeDuplicates(stateMove, "id");

    const findCinema = contentDuplicates.find(item => item.id === id);

    if (findCinema){
        return (
            <div className="fons_black">
                        <div className="infoCinema">
                            <div className="container_info">
                                <div className="flex_infoCinema">
                                    <div className="block">
                                        <img src={poster_link} alt={title}/>
                                    </div>
                                    <div className="block2">
                                        <h2>{title} ({findCinema.year_of_pub})</h2>
                                        <div className="text_info">
                                            <p> О фильме </p>
                                            <div className="text_post">
                                                <p className="inf">Год производства</p>
                                                <div>{findCinema.year_of_pub}</div>
                                            </div>
                                            <div className="text_post">
                                                <p className="inf">Страна</p>
                                                <div>{findCinema.about}</div>
                                            </div>
                                            <div className="text_post">
                                                <p className="inf">Время</p>
                                                <div>{findCinema.duration}</div>
                                            </div>
                                            <div className="text_post">
                                                <p className="inf">Возраст</p>
                                                <div className="age">{findCinema.age}</div>
                                            </div>

                                            <div className="text_post text-white">
                                                {findCinema.description}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
        )
    }

    return <Loading/>


};

export default InfoCinema;