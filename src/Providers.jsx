import React from 'react'
import { SnackbarProvider } from './Context/snackbarProvider'
import { DialogProvider } from './Context/DialogProvider'
import { SearchProvider } from './Context/SearchProvider'

function Providers({children}) {
  return (
    <SnackbarProvider>
        <SearchProvider>
            <DialogProvider>
                {children}
            </DialogProvider>
        </SearchProvider>
    </SnackbarProvider>
  )
}

export default Providers
