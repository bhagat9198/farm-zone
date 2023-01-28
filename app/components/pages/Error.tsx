import { FaExclamationCircle } from 'react-icons/fa';

type ErrorPageType = {
  title?: string,
  children: JSX.Element
}

export const Error = (props: ErrorPageType) => {
  const { title, children } = props;
  return (
    <>
      <div className="">
        <div className="">
          <FaExclamationCircle />
        </div>
        <h1> Error!!!</h1>
        <h2>{title}</h2>
        {children}
      </div>
    </>
  )
}