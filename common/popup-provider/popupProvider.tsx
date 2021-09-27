import React, { createContext, ReactElement, useState } from 'react'
import { Dialog, DialogContent } from '@material-ui/core'

const AlertContext = createContext({ setData: (value: ReactElement) => {}, close: () => {} })
export default AlertContext

export const PopupProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false)

  const [alertPopup, setAlertPopupProps] = useState<ReactElement>(() => <></>)

  const setData = (value: ReactElement) => {
    setOpen(true)
    setAlertPopupProps(value)
  }

  const close = () => {
    setOpen(false)
  }

  const setDataFunction = {
    setData: setData,
    close: close,
  }

  return (
    <AlertContext.Provider value={setDataFunction}>
      {children}
      <Dialog
        className="popup-alert"
        PaperProps={{
          style: {
            maxWidth: '404px',
            padding: '65px',
            width: '100%',
            background: '#f1f2f4',
          },
        }}
        open={open}
      >
        <DialogContent>{alertPopup}</DialogContent>
      </Dialog>
    </AlertContext.Provider>
  )
}
