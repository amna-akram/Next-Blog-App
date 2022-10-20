import { createContext, useState } from "react";
import { useRouter } from "next/router";

const ModalContext = createContext({
  isOpen: false,
  modalOpenHandler: () => {},
  modalCloseHandler: () => {},
});

export function ModalContextProvider(props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function modalOpenHandler() {
    setIsOpen(true);
  }

  function modalCloseHandler() {
    setIsOpen(false);
  }

  const context = {
    isOpen: isOpen,
    modalOpenHandler: modalOpenHandler,
    modalCloseHandler: modalCloseHandler,
  };

  return (
    <ModalContext.Provider value={context}>
      {props.children}
    </ModalContext.Provider>
  );
}

export default ModalContext;