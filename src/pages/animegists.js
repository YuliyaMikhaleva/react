import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGists } from "../store/animegists";
import stylesPage from "./page.module.css";

export function Anime() {
  const { gistsPending, gists, gistsError } = useSelector((state) => state.anime); //Вытаскиваем данные из стейта
  const dispatch = useDispatch();
  useEffect(() => {
    if (!gists.length) {
      //если данных нет
      dispatch(getGists()); //вызов запроса
      console.log(gists);
    }
  }, [dispatch, gists]); //в зависимость обязателньо кидаем данные

  //теперь сделаем условие:
  if (gistsPending) {
    // если pending(загрузка), то вернем pending,
    return (
      <div>
        <div className={stylesPage.spinner}>
          <div className="spinner-border" role="status"></div>
        </div>
      </div>
    );
  }
  if (gistsError) {
    //если error, то вернем какую-то ошибку,
    return (
      <div>
        <h1>oooppss...</h1>
      </div>
    );
  }
  //иначе если всё ок, то вернем данные
  return (
    <div>
      {/*<button onClick={getGists}>Получить данные</button>*/}
      {Array.from({ length: 10 }).map((_, index) => (
        <button
          className={stylesPage.btnQuery}
          key={index}
          onClick={() => dispatch(getGists(index + 1))}
        >
          button {index}
        </button>
      ))}
      <div>
        {gists.map((gist, index) => (
          <p className={stylesPage.gistsBlock} key={index}>
            {gist.character}
          </p>
        ))}
      </div>
    </div>
  );
}
