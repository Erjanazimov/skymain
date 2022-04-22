import React, {useEffect, useRef} from "react";
import bem from "easy-bem";
import { Carousel } from "3d-react-carousal";
import { useDispatch, useSelector } from "react-redux";
import "react-multi-carousel/lib/styles.css";
import {endCinema, fetchCarousel} from "../../redux/carouselSlice";
import CarouselImages from "../../component/CarouselImages/CarouselImages";

const Rek = () => {
  const b = bem("scroll");
  const statePlay = useSelector((state) => state.carousel.cinemaRek);
  const dispatch = useDispatch();
  const stateImagesTop = useSelector((state) => state.carousel);

  useEffect(() => {
    dispatch(fetchCarousel());
  }, [stateImagesTop.moveCinema]);

  useEffect(() => {
    if (statePlay.length){
      dispatch(endCinema())
    }
  }, [])

  let slides = statePlay.map((item) => {
    return <RekItem data={item} />;
  });

  const callback = () => {
    const cinema = document.querySelectorAll("#cinema");
    cinema.forEach(item => {
      item.load()
    })
  }

  return (
    <div className={b()}>
      <div className={b("fons")}>
        {statePlay.length ? (
          <Carousel slides={slides} interval={1} onSlideChange={callback} />
        ) : null}
      </div>
      <div>
      <CarouselImages title="Фильмы с высоким рейтингом" data={stateImagesTop.moveCinema} link="/new"/>
      </div>
      <div>
        <CarouselImages title="Рекомендуем вам посмотреть" data={stateImagesTop.rekCinema} link="/rek"/>
      </div>
      <div>
        {/*<CarouselImages title="Фильмы с высоким рейтингом" />*/}
      </div>
    </div>
  );
};


const RekItem = ({ data }) => {
  const videoRef = useRef();
  let resDate = new Date(data.session_date);
  let mm = resDate.getMonth() + 1;
  let dd = resDate.getDate();
  let yy = resDate.getFullYear(); //dd-mm-yy
  let hh = resDate.getUTCHours();
  let min = resDate.getMinutes();
  let arr = [ 'янв', 'фев', 'март', 'апр', 'май', 'июнь', 'июль', 'авг', 'сен', 'ноя', 'дек', ];
  let myDateString = dd + ' ' + arr[Number(mm) - 1] + ". " + hh + ":" + min;
  const playHandler = () => {
    const time = document.querySelectorAll("#time");
    const cinema = document.querySelectorAll("#cinema");

    setTimeout(() => {
      videoRef.current.play();
      time.forEach(item => {
        if (+item.dataset.id === data.id) {
          item.classList.remove("d-block")
          item.classList.add("d-none")
        }
      })

      cinema.forEach(item => {
        if (+item.dataset.id !== data.id) {
          item.load()
        }
      })

    }, 3000)
  };





  const pauseHandler = () => {
    const time = document.querySelectorAll("#time");
    const cinema = document.querySelectorAll("#cinema");

    videoRef.current.pause();
    videoRef.current.load();

    cinema.forEach(item => {
      if (+item.dataset.id !== data.id) {
        item.load()
      }
    })

    time.forEach(item => {
      item.classList.remove("d-none")
      item.classList.add("d-block")
    })
  };

  const soundPlay = () => {
    const sound = document.querySelectorAll("#soundPlay");
    const soundNo = document.querySelectorAll("#soundNot");
    const cinema = document.querySelectorAll("#cinema");

    cinema.forEach(item => {
      if (+item.dataset.id === data.id){
        item.muted = false
      }
    })

    sound.forEach(item => {
      if (+item.dataset.id === data.id) {
        item.classList.remove("d-block")
        item.classList.add("d-none")
      }
    })

    cinema.forEach(item => {
      if (+item.dataset.id !== data.id) {
        item.load()
      }
    })

    soundNo.forEach(item => {
      if (+item.dataset.id === data.id) {
        item.classList.remove("d-none")
        item.classList.add("d-block")
      }
    })
  }

  const soundNot = () => {
    const sound = document.querySelectorAll("#soundPlay");
    const soundNo = document.querySelectorAll("#soundNot");
    const cinema = document.querySelectorAll("#cinema");

    cinema.forEach(item => {

      if (+item.dataset.id === data.id){
        item.muted = true
      }
    })
    sound.forEach(item => {
      if (+item.dataset.id === data.id) {
        item.classList.remove("d-none")
        item.classList.add("d-block")
      }
    })

    soundNo.forEach(item => {
      if (+item.dataset.id === data.id) {
        item.classList.remove("d-block")
        item.classList.add("d-none")
      }
    })
  }

  return (
      <div key={data.id} onMouseEnter={playHandler} onMouseLeave={pauseHandler}>
    <video
        id="cinema"
        data-id={data.id}
        ref={videoRef}
        width="100%"
        height="100%"
        poster={data.poster_url}
        controls={false}
        muted="muted"
        style={{
        background: "black",
        height: "510px",
        borderRadius: "20px"
      }}
    >
      <source src={data.trailer_url} type="video/mp4" />
    </video>
        <div className="title_text">
          <div>
          <div className="flex_text">
            <p className="title">{data.title}</p>
            <div data-id={data.id} id="time" className="time">
              <p>
                Длительность:
              {` ${data.duration.split(":")[0].slice(1)} ч. ${data.duration.split(":")[1]} мин `}
              </p>
              <p>
                Начало сеанса: {myDateString}
              </p>
            </div>
          </div>

          <div data-id={data.id} id="soundPlay" onClick={soundPlay} className="svg d-block">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor"
                 className="bi bi-volume-mute-fill" viewBox="0 0 16 16">
              <path
                  d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
            </svg></div>
            <div data-id={data.id} id="soundNot" onClick={soundNot} className="svg d-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor"
                   className="bi bi-volume-down-fill" viewBox="0 0 16 16">
                <path
                    d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12V4zm3.025 4a4.486 4.486 0 0 1-1.318 3.182L10 10.475A3.489 3.489 0 0 0 11.025 8 3.49 3.49 0 0 0 10 5.525l.707-.707A4.486 4.486 0 0 1 12.025 8z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Rek;
