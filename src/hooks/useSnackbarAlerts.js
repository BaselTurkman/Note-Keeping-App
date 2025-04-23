import { useSnackbar } from "../Context/snackbarProvider"

export function useSnackbarAlerts(){
    const {showSnackbar} = useSnackbar()

    const showSuccessSnackbar = (msg) => {
        showSnackbar(msg, "success")
    }

    const showInfoSnackbar = (msg) => {
        showSnackbar(msg, "info")
    }

    const showErrorSnackbar = (msg) => {
        showSnackbar(msg, "error")
    }

    return {showSuccessSnackbar, showInfoSnackbar, showErrorSnackbar}
}