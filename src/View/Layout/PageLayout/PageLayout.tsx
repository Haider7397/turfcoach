import { Header } from 'View/Common'
import { PropsWithChildren} from 'react'
import "View/Styles/layout.css"

interface IProps extends PropsWithChildren {
}

export const PageLayout = ({ children }: IProps) => {

  
  return (
    <>
      <main className='screen'>
        <Header />
        {children}
      </main>
    </>
  )
}