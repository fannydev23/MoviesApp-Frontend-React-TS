import { Provider } from "react-redux"
import { MoviesPage } from "./movies/pages/MoviesPage"
import { store } from "./store/store"

export const MoviesApp = () => {
    return (
        <Provider store={store}>
            <MoviesPage/>
        </Provider>

    )
}