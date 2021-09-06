import debounce from "lodash.debounce"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGists, searchGistsByUserName } from "../store/gists"
import stylesPage from "./page.module.css";


export function Gist() {
    const ref = useRef()
    const { gistsPending, gists, gistsError } = useSelector(
        (state) => state.gists,
    )

    const [search, setSearch] = useState("")//состояние поиска

    const dispatch = useDispatch()

    //useMemo гарантирует, что функция дебаунса будет вызываться только 1 раз
    const searchGistDebounced = useMemo(() => {
        return debounce((query) => {
            //объявляем переменную, где мы проверяем, что запрос равен тому запросу, который находится в ref.current.
            const isCurrentQuery = query === ref.current
            //если true то мы обновляем состояние, мы прокидывааем эту переменную внутрь нашего thunk
            dispatch(searchGistsByUserName(query, isCurrentQuery))//вызываем запрос получения гистов по поиску с сервера по ссылке
        }, 1000)
    }, [dispatch])

    useEffect(() => {
        if (!gists.length) {//если массив не пустой
            dispatch(getGists())//вызываем запрос получения гистов по ссылке с сервера
        }
    }, [dispatch, gists])//в зависимость обязательно кидаем данные

    useEffect(() => {
        if (search) {//если поиск не пуст
            searchGistDebounced(search, dispatch)
        }

        ref.current = search //в свойство current записываем то, что попадает в поиск
    }, [search, dispatch, searchGistDebounced])//в зависимость обязательно кидаем значение инпута поиска

    if (gistsError) {
        return (
            <div>
                <h1>oooppss...</h1>
            </div>
        );
    }

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
            <hr />
            <div className={stylesPage.gistsBlock} >
                <h1>Search</h1>
                <input value={search} onChange={(e) => setSearch(e.target.value)} />
                <hr />
            </div>

            {gistsPending ? (
                <div>
                    <div className={stylesPage.spinner}>
                        <div className="spinner-border" role="status"></div>
                    </div>
                </div>
            ) : (
                <div>

                    <div>
                        {gists.map((gist, index) => (
                            <p className={stylesPage.gistsBlock} key={index}>
                                {gist.description}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}