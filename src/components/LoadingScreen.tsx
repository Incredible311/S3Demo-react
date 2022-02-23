import { ReactElement } from "react"
import { CircularProgress } from '@material-ui/core';

function LoadingScreen(): ReactElement {
    return (
        <div className="d-flex justify-content-center w-100 h-100">
            <CircularProgress />
        </div>
    )
}

export default LoadingScreen