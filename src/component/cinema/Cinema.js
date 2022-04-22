import React, {useEffect} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import {useDispatch} from "react-redux";
import {fetchMove, fetchRek} from "../../redux/carouselSlice";
import {Spin} from "antd";
import {addIdCinema} from "../../redux/infoCinemaSlice";
import {useHistory} from "react-router-dom";

let count = 1;
const Cinema = ({dataMove, title}) => {
    const dispatch = useDispatch();
    const {push} = useHistory();

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

    let contentDuplicates = removeDuplicates(dataMove, "url_id");

    const mapCinema = contentDuplicates.map((item, i) => {
       return <div onClick={() => btnInfo(item.url_id)} key={i}>
            <img src={item.poster_link} alt={item.id}/>
        </div>
    })

    const btnInfo = (id) => {
        push(`/infoCinema:${id}`)
        dispatch(addIdCinema({id: id}))
    }

    const fetchMoreTrending = () => {
        count++
        if (title === "Фильмы с высоким рейтингом") {
            setTimeout(() => {
                dispatch(fetchMove({id: count}))
            }, 1500)
        }

        if (title === "Рекомендуем вам посмотреть"){
            setTimeout(() => {
                dispatch(fetchRek({id: count}))
            }, 1500)
        }
    }


    return (
        <div className="container">
            <div className="blockCinema">
            <h1 className="text-white">{title}</h1>
                <InfiniteScroll
                    dataLength={contentDuplicates.length}
                    next={fetchMoreTrending}
                    hasMore={true}
                    loader={  <div className="example">
                        <Spin />
                    </div>}
                >
                        <div className="block_card_cinema">
                    {mapCinema}
                        </div>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default Cinema;
