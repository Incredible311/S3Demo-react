import { ReactElement } from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/lib/integration/react"
import { createBrowserHistory } from "history"
import { Router } from "react-router-dom"
import LoadingScreen from "./components/LoadingScreen"
import { store, persistor } from "./redux/store"
import routes, { renderRoutes } from "./routes"

const history = createBrowserHistory()

function App(): ReactElement {
    return (
        <Provider store={store}>
            <PersistGate loading={<LoadingScreen />} persistor={persistor}>
                <Router history={history}>
                    {renderRoutes(routes)}
                </Router>
            </PersistGate>
        </Provider>
    )
}

export default App
